<template>
  <div class="Bmap">
    <form class="searchBox" @submit.prevent action="#">
      <input type="search" v-model="searchWord"
      @keyup="enterFun($event)"
      class="search" placeholder="请输入商户关键字搜索" >
      <i class="icon_close" @click="cleanInput" v-if="searchWord !=''"></i>
    </form>
    <div id="allmap" :style="{height: mapHeight}"></div>
    <div class="opacity" v-if="isShow" :style="{height: mapHeight}" @click="closeShopDis"></div>
    <div class="shopdisBox"  v-if="isShow" :class="{'shopdisMask': isShow}">
      <ShopDis />
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/utils/api'
import ShopDis from '@/components/ShopDis'
import { Indicator, Toast } from 'mint-ui'
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
      los: 31.316429, // 纬度
      dim: 120.641234, // 经度
      pointListNew: [],
      params: {
        regShopName: '',
        shopName: '',
        longitudeAndLatitude: sessionStorage.getItem('longitudeAndLatitude'),
        businessType: '',
        orderType: '', // asc：低到高 desc：高到低
        disOrder: 'asc', // asc：近到远   desc：远到近
        pageNum: '',
        pageSize: ''
      }
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
    // this.$nextTick(this.mapFun())
    // this.mapFun()
  },
  methods: {
    init(){
      if (sessionStorage.getItem('shopInfoStorage')) {
        this.pointListNew.push(JSON.parse(sessionStorage.getItem('shopInfoStorage')))
        this.isShow = true
        let windowHeight = document.documentElement.clientHeight
        this.mapHeight = windowHeight - 320 + 'px'
        this.los = this.pointListNew[0].latitude
        this.dim = this.pointListNew[0].longitude
        this.mapFun()
      } else {
        this.isShow = false
        this.fetchShopList()
      }
      // this.fetchShopList()
      this.getMapHeight()
    },
    mapFun () {
        var vm = this
        // 创建Map实例
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(this.dim+0.00001, this.los+0.0007); // 地图中心
        var marker = new BMap.Marker(point);
        // map.addOverlay(marker);
        map.centerAndZoom(point, 25); // 地图缩放比例
        map.enableScrollWheelZoom(true);
        map.enableDoubleClickZoom(true);
        map.enableDragging(true); // 拖拽

        // 添加 坐标点
        function addMarker(point, i){
          if (vm.pointListNew[i].shopScoreLevel == 'A' ) {
            var myIcon = new BMap.Icon('http://dev.fosuntech.cn/lfpingjiangweb/static/pjPhoto/imgs/levelA.png',
            new BMap.Size(24, 24));
            // icon_map_1
          } else if (vm.pointListNew[i].shopScoreLevel == 'B') {
            var myIcon = new BMap.Icon('http://dev.fosuntech.cn/lfpingjiangweb/static/pjPhoto/imgs/levelB.png',
            new BMap.Size(24, 24));
          } else if (vm.pointListNew[i].shopScoreLevel == 'C') {
            var myIcon = new BMap.Icon('http://dev.fosuntech.cn/lfpingjiangweb/static/pjPhoto/imgs/levelC.png',
            new BMap.Size(24, 24));
            // icon_map_1
          } else if (vm.pointListNew[i].shopScoreLevel == 'D') {
            var myIcon = new BMap.Icon('http://dev.fosuntech.cn/lfpingjiangweb/static/pjPhoto/imgs/levelD.png',
            new BMap.Size(24, 24));
          } else if (vm.pointListNew[i].shopScoreLevel == 'E' ) {
            var myIcon = new BMap.Icon('http://dev.fosuntech.cn/lfpingjiangweb/static/pjPhoto/imgs/levelE.png',
            new BMap.Size(24, 24));
            // icon_map_1
          }
      	  var marker = new BMap.Marker(point, {icon:myIcon});
      	  map.addOverlay(marker);
          marker.addEventListener('click', showInfo);
          function showInfo(){
            vm.$store.commit('GETSHOPINFO', vm.pointListNew[i])
            vm.mapHeight = vm.mapHeightShow
            let windowHeight = document.documentElement.clientHeight
            vm.isShow = true
            vm.mapHeight = windowHeight - 320 + 'px'
            // setTimeout(function(){
            //   vm.isShow = true
            //   vm.mapHeight = windowHeight - 320 + 'px'
            // }, 500)
        	}
      	}
        // 遍历pointListNew
        for (var i = 0; i < this.pointListNew.length; i ++) {
      		var point = new BMap.Point(this.pointListNew[i].longitude, this.pointListNew[i].latitude);
          // console.log(point);
      		addMarker(point, i);
      	}

        // 定位
        // var geolocationControl = new BMap.GeolocationControl();
        // geolocationControl.addEventListener("locationSuccess", function(e){
        //   // 定位成功事件
        //   console.log('定位成功事件', e);
        //   map.centerAndZoom(point, 18); // 地图缩放比例
        //   this.dim = e.point.lat// e.point.lat // 纬度
        //   this.los = e.point.lng// e.point.lng // 经度
        // });
        // geolocationControl.addEventListener("locationError",function(e){
        //   // 定位失败事件
        //   console.log('定位失败事件', e);
        // });
        // map.addControl(geolocationControl);
    },
    getMapHeight () {
      if (sessionStorage.getItem('shopInfoStorage')) {
        let windowHeight = document.documentElement.clientHeight
        this.mapHeight = windowHeight - 320 + 'px'
      } else {
        this.mapHeight = '100vh'
      }
      this.mapHeightShow = this.mapHeight
    },
    closeShopDis () {
      this.mapHeight = '100vh';
      let vm = this
      vm.isShow = false
      // setTimeout(function(){
      //   vm.isShow = false
      // }, 100)
    },
    cleanInput () {
      this.searchWord = ''
    },
    fetchShopList: async function () {
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      const res = await http.post(api.shopList + '?Time=' + Date.parse(Date()) , this.params)
      console.log(res);
      if (res.status == 200) {
        Indicator.close();
        if (res.data && res.data.data && res.data.data.pageDto) {
          this.isErrorBg = false
          this.pointListNew = res.data.data.pageDto
          this.mapFun()
        } else {
          this.isErrorBg = true
          Toast({
            message: '未搜索到相关店铺，请试试其他店铺',
            position: 'center',
            duration: 2000
          });
        }
      } else {
        Indicator.close();
        this.isErrorBg = true
        Toast({
          message: '网络故障，请稍后再试',
          position: 'center',
          duration: 2000
        });
      }
    },
    enterFun (data) {
      // 事件绑定 -- 回车键事件
      if (data.keyCode == 13) {
        this.params = {
          regShopName: '',
          shopName: this.searchWord,
          longitudeAndLatitude: sessionStorage.getItem('longitudeAndLatitude'),
          businessType: '',
          orderType: '', // asc：低到高 desc：高到低
          disOrder: 'asc', // asc：近到远   desc：远到近
          pageNum: '',
          pageSize: ''
        },
        this.fetchShopList()
      }
    },
  },
  components:{
    ShopDis,
    Indicator,
    Toast
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
      border: none; padding-left: 20px;height: 30px;}
    .icon_close{display: inline-block;height: 20px;width: 20px;
    position: absolute;background: url(../images/close.png) center no-repeat;
    background-size: 80%;right: 5vw;top: 5px;opacity: 0.5}
  }
  #allmap{width: 100vw; transition: all 0.5s;}
  .shopdisBox{height: 0px;overflow: hidden;transition: all 0.5s;}
  .shopdisMask{
    height: 320px; overflow: auto;transition: all 0.5s;
  }
  .opacity{position: absolute;width: 100vw;background: rgba(0,0,0, 0);top: 0;}
}
</style>
