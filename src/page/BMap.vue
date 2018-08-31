<template>
  <div class="Bmap">
    <div class="searchBox">
      <input type="search" v-model="searchWord" class="search" placeholder="请输入商户关键字搜索"
      >
      <i class="icon_close" @click="cleanInput"></i>
    </div>
    <div id="allmap" :style="{height: mapHeight}"></div>
    <div class="opacity" v-if="isShow" :style="{height: mapHeight}" @click="closeShopDis"></div>
    <div class="shopdisMask" id="shopdisMask" v-if="isShow">
      <ShopDis />
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import ShopDis from '@/components/ShopDis'
import {mapState} from 'vuex'
// import mapBg1 from '@/images/icon_map_1.png'

export default {
  name: 'BMap',
  data () {
    return {
      isShow: true,
      mapHeightShow: '',
      searchWord: '',
      mapHeight: '', // 百度地图的
      los: 31.173277 , // 经度
      dim: 121.382029, // 纬度
      pointListNew: [
        {
         shopName: '一点点1',
         creditNo: '91310000MA1FL06Q8A',
         shopScoreLevel: 'C', // 店铺评级
         operatingAddress: 'address',
         distance: '',
         shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
         shopScore: '1000',
         totalNum: 0,
         totalPageNum: 1,
         detailDto: {
             shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
             regShopName: '一点点哈',
             operatingAddress: 'address',
             businessType: '酒吧',
             shopPhone: '1391111test',
             shopScore: '1000',
             latitudeAndLongitude: '35.95535283,120.20242635',
             longitude: 121.402971,
             latitude: 31.175128,
         }
      },
      {
         shopName: '一点点2',
         creditNo: '91310000MA1FL06Q8A',
         shopScoreLevel: 'A', // 店铺评级
         operatingAddress: 'address',
         distance: '',
         shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
         shopScore: '1000',
         totalNum: 0,
         totalPageNum: 1,
         detailDto: {
             shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
             regShopName: '一点点哈',
             operatingAddress: 'address',
             businessType: '酒吧',
             shopPhone: '1391111test',
             shopScore: '1000',
             latitudeAndLongitude: '35.95535283,120.20242635',
             longitude: 121.372019,
             latitude: 31.175128,
         }
      },
      {
         shopName: '一点点3',
         creditNo: '91310000MA1FL06Q8A',
         shopScoreLevel: 'B', // 店铺评级
         operatingAddress: 'address',
         distance: '',
         shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
         shopScore: '1000',
         totalNum: 0,
         totalPageNum: 1,
         detailDto: {
             shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
             regShopName: '一点点哈',
             operatingAddress: 'address',
             businessType: '酒吧',
             shopPhone: '1391111test',
             shopScore: '1000',
             latitudeAndLongitude: '35.95535283,120.20242635',
             longitude: 121.412971,
             latitude: 31.175128,
         }
        }
      ]
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
        var point = new BMap.Point(this.dim, this.los); // 地图中心
        var marker = new BMap.Marker(point);
        // map.addOverlay(marker);
        map.centerAndZoom(point, 14); // 地图缩放比例
        map.enableScrollWheelZoom(true);
        map.enableDoubleClickZoom(true);
        map.enableDragging(true); // 拖拽

        // 添加 坐标点
        function addMarker(point, i){
          if (vm.pointListNew[i].shopScoreLevel == 'A' || vm.pointListNew[i].shopScoreLevel == 'B') {
            var myIcon = new BMap.Icon('http://api.map.baidu.com/img/markers.png', new BMap.Size(23, 25), {
                offset: new BMap.Size(32, 32), // 指定定位位置
                imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
            });
            // icon_map_1
          }
          if (vm.pointListNew[i].shopScoreLevel == 'C' || vm.pointListNew[i].shopScoreLevel == 'D' ) {
            var myIcon = new BMap.Icon('http://api.map.baidu.com/img/markers.png', new BMap.Size(23, 25), {
                offset: new BMap.Size(32, 32), // 指定定位位置
                imageOffset: new BMap.Size(0, 0 - 12 * 25) // 设置图片偏移
            });
            // icon_map_1
          }
      	  var marker = new BMap.Marker(point, {icon:myIcon});
      	  map.addOverlay(marker);
          marker.addEventListener('click', showInfo);
          function showInfo(){
            vm.$store.commit('GETSHOPINFO', vm.pointListNew[i])
            vm.mapHeight = vm.mapHeightShow
            setTimeout(function(){
              vm.isShow = true
            }, 500)
        	}
      	}
        // 遍历pointListNew
        for (var i = 0; i < this.pointListNew.length; i ++) {
      		var point = new BMap.Point(this.pointListNew[i].detailDto.longitude, this.pointListNew[i].detailDto.latitude);
          // console.log(point);
      		addMarker(point, i);
      	}


        // 定位
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
          // 定位成功事件
          console.log('定位成功事件', e);
          map.centerAndZoom(point, 18); // 地图缩放比例
          this.dim = e.point.lat// e.point.lat // 纬度
          this.los = e.point.lng// e.point.lng // 经度
        });
        geolocationControl.addEventListener("locationError",function(e){
          // 定位失败事件
          console.log('定位失败事件', e);
        });
        map.addControl(geolocationControl);
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
    },
    cleanInput () {
      this.searchWord = ''
    },
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
    .icon_close{display: inline-block;height: 20px;width: 20px;
    position: absolute;background: url(../images/close.png) center no-repeat;
    background-size: 80%;right: 5vw;top: 6px;opacity: 0.5}
  }
  #allmap{width: 100vw; transition: all 0.5s;}
  .shopdisMask{

  }
  .opacity{position: absolute;width: 100vw;background: rgba(0,0,0, 0.3);top: 0;}
}
</style>
