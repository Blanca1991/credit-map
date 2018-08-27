<template>
  <div class="Bmap">
    <div class="searchBox">
      <input type="search" placeholder="请输入商户关键字搜索"
      >
    </div>
    <div id="allmap" :style="{height: mapHeight}"></div>
    <div class="opacity" v-if="isShow" :style="{height: mapHeight}" @click="closeShopDis"></div>
    <div class="shopdisMask" id="shopdisMask" v-if="isShow">
      <ShopDis />
    </div>
  </div>
</template>

<script>
import ShopDis from '@/components/ShopDis'
import {mapState} from 'vuex'

export default {
  name: 'BMap',
  data () {
    return {
      isShow: true,
      mapHeightShow: '',
      mapHeight: '', // 百度地图的
      los: 31.173277 , // 经度
      dim: 121.160724, // 纬度
      point: [121.160724, 31.173277]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      shopInfo: state => state.shopInfo,
    })
  },
  mounted () {
    this.init();
    this.$nextTick(function () {
        var vm = this
        // 创建Map实例
        var map = new BMap.Map("allmap");
        // 初始化地图,设置中心点坐标，
        var point = new BMap.Point(this.dim,this.los);
        map.centerAndZoom(point, 17);
        map.enableScrollWheelZoom();
        var marker = new BMap.Marker(point);  // 创建标注
	      map.addOverlay(marker);   // 将标注添加到地图中
        marker.addEventListener("click",attribute);
        function attribute(){
          vm.mapHeight = vm.mapHeightShow
          setTimeout(function(){
            vm.isShow = true
          }, 10)
      	}
    })
  },
  methods: {
    init(){
      this.getMapHeight()
    },
    getMapHeight () {
      let height = document.getElementById('shopdisMask').offsetHeight
      let windowHeight = document.documentElement.clientHeight
      this.mapHeight = windowHeight - height + 'px'
      this.mapHeightShow = this.mapHeight
    },
    closeShopDis () {
      this.mapHeight = '100vh';
      let vm = this
      setTimeout(function(){
        vm.isShow = false
      }, 100)
    }
  },
  components:{
    ShopDis,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Bmap{
  height: 100vh; overflow: hidden;
  .searchBox{
    text-align: left;position: fixed; top: 0 ;margin-top: 20px;
    transform: translateX(-50%); left: 50%;
     z-index: 9;width: 95vw;border-radius: 50px;overflow: hidden;
    input{line-height: 28px; text-align: left;width: 105%;margin: 0 auto;
      border: none; padding-left: 20px;}
  }
  #allmap{width: 100vw; transition: all 0.5s;}
  .shopdisMask{

  }
  .opacity{position: absolute;width: 100vw;background: rgba(0,0,0, 0.3);top: 0;}
}
</style>
