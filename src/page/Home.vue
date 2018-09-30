<template>
  <div class="homeBox" >
    <div class="topBox">
      <form class="searchBox flex"  @submit.prevent action="#">
        <input type="search" v-model="searchWord" class="search"
        placeholder="请输入商户关键字搜索" @keyup="enterFun($event)">
        <i class="icon_close" v-if="searchWord != ''" @click="cleanInput"></i>
      </form>
      <span class="font12" @click="searchFun">搜索</span>
      <i class="search_icon"></i>
    </div>
    <div class="tabBox flex" >
      <div class="tab flex" @click="distanceFun()">
        <div>按距离</div>
        <div class="iconBox">
          <div class="icon_up iconJuUp"
          :class="{iconActive: disOrderActive}"></div>
          <div class="icon_down iconJuDown"
          :class="{iconActive: !disOrderActive}"></div>
        </div>
      </div>
      <div class="tab flex" @click="categoryFun()">
        <span>按品类</span>
        <div class="icon_down iconActive" :class="{icon_up: isSelect}"></div>
      </div>
      <div class="tab flex" @click="creditFun()">
        <div >按信用</div>
        <div class="iconBox">
          <div class="icon_up iconXinUp"
          :class="{iconActive: iconActive}"></div>
          <div class="icon_down iconXinDown"
          :class="{iconActive: !iconActive}"></div>
        </div>
      </div>
    </div>
    <div class="selectBox" :class="{selectBoxShow: isSelect}">
      <div class="font12 selectItem"
      v-for="item in categoryList"
      :class="{selectItemActive: selectItem == item.code}"
      @click="changeSelectItem(item)" >
        {{ item.title }}
      </div>
    </div>
    <div class="maskBox" v-if="isSelect" :class="{maskBoxShow: isSelect}"
    @click="isSelect = !isSelect"></div>
    <div class="contentBox" :style="{height: contentHight + 'px'}">
      <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :auto-fill="autoFill"
      :bottom-all-loaded="allLoaded" ref="loadmore"
      @top-status-change="handleTopChange">
        <List :shopList="shopList"/>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
    </div>
    <div class="errorBg" v-if="isErrorBg" :style="{height: contentHight + 'px'}">
      <img :src="errorBg" alt="">
      <div class="word">没有搜索到信息</div>
    </div>
  </div>
</template>

<script>
import List from '@/components/List'
import errorBg from '@/images/error_bg.png'
import { Indicator ,Header, Loadmore, Toast } from 'mint-ui'
import {MP} from '@/assets/map.js'
import {mapState} from 'vuex'
import http from '@/utils/http'
import api from '@/utils/api'

export default {
  name: 'Home',
  data () {
    return {
      isLock: true,
      isLoadingShow: true,
      params: {
        regShopName: '',
        shopName: '',
        longitudeAndLatitude: '',
        businessType: '',
        orderType: '', // asc：低到高 desc：高到低
        disOrder: 'asc', // asc：近到远   desc：远到近
        pageNum: 1,
        pageSize: 10
      },
      disOrderActive: true,
      errorBg: errorBg,
      isErrorBg: false,
      //
      topStatus: '',
      isMore: false,
      totalPage: null, // 总页数
      autoFill: false, // 若为真，loadmore 会自动检测并撑满其容器
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      //
      contentHight: 0,
      searchWord: '',
      iconActive: true, // 信用 由低到高和由高到低 true为由高到低
      isSelect: false, // 品类下拉显示与否
      selectItem: '', // 品类中 选中的某一项
      categoryList: [
        {
          code: 1,
          title: '未选择'
        },
        {
          code: 2,
          title: '餐饮'
        },
        {
          code: 3,
          title: '酒店'
        },
        {
          code: 4,
          title: '酒吧'
        },
        {
          code: 5,
          title: '咖啡'
        },
        {
          code: 6,
          title: '茶饮'
        },
        {
          code: 7,
          title: '服饰'
        },
        {
          code: 8,
          title: '花店'
        },
        {
          code: 9,
          title: '小饰品'
        },
        {
          code: 10,
          title: '书吧'
        },
        {
          code: 11,
          title: '工艺品'
        },
        {
          code: 12,
          title: '艺术馆'
        },
        {
          code: 13,
          title: '化妆品'
        },
        {
          code: 14,
          title: '零售店'
        },
        {
          code: 15,
          title: '其他'
        }
      ]
    }
  },
  created () {

  },
  computed: {
    ...mapState({
      // 获取数据
      shopList: state => state.shopList,
    })
  },
  mounted () {
    this.contentHight = document.documentElement.clientHeight - 92
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(function(){
        this.addressDetail()
      })
      window.onunload = function () {
        localStorage.clear()
      }
    },
    loadTop() {
      // 下滑 更新数据
      this.isLoadingShow = true
      this.params = {
        regShopName: '',
        shopName: '',
        longitudeAndLatitude: '',
        businessType: '',
        orderType: '', // asc：低到高 desc：高到低
        disOrder: 'asc', // asc：近到远   desc：远到近
        pageNum: 1,
        pageSize: 10
      }
      this.isMore = false
      this.fetchShopList()
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    loadBottom() {
      // 上滑 加载更多数据
      this.isLoadingShow = false
      let vm = this;
      setTimeout(()=>{
        if (vm.totalPage - vm.params.pageNum  > 0) {
          vm.params.pageNum ++;
          vm.isMore = true
          vm.fetchShopList()
        } else {
          vm.allLoaded = true;
        }
        vm.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      }, 1500)
    },
    distanceFun () {
      // 按距离排序
      this.isLoadingShow = true
      this.disOrderActive = !this.disOrderActive
      let disOrder = this.disOrderActive?'asc':'desc'
      this.params = {
        regShopName: '',
        shopName: '',
        longitudeAndLatitude: sessionStorage.getItem('longitudeAndLatitude'),
        businessType: '',
        orderType: '', // asc：低到高 desc：高到低
        disOrder: disOrder, // asc：近到远   desc：远到近
        pageNum: 1,
        pageSize: 10
      },
      this.fetchShopList()
    },
    categoryFun () {
      // 按品类排序
      this.isSelect = !this.isSelect
    },
    creditFun () {
      // 按信用等级排序
      this.isLoadingShow = true
      this.iconActive = !this.iconActive
      let orderType = this.iconActive ? 'asc' : 'desc'
      this.params = {
        regShopName: '',
        shopName: '',
        longitudeAndLatitude: sessionStorage.getItem('longitudeAndLatitude'),
        businessType: '',
        orderType: orderType, // asc：低到高 desc：高到低 信用评级
        disOrder: 'asc', // asc：近到远   desc：远到近
        pageNum: 1,
        pageSize: 10
      },
      this.isMore = false
      this.fetchShopList()
    },
    changeSelectItem (data) {
      this.isLoadingShow = true
      this.selectItem = data.code
      let word = ''
      console.log(data);
      if (data.code == 1) {
        word = ''
      } else {
        word = data.title
      }
      this.params = {
        regShopName: '',
        shopName: '',
        longitudeAndLatitude: sessionStorage.getItem('longitudeAndLatitude'),
        businessType: word,
        orderType: '', // asc：低到高 desc：高到低
        disOrder: 'asc', // asc：近到远   desc：远到近
        pageNum: 1,
        pageSize: 10
      },
      this.isMore = false
      this.isSelect = false
      this.fetchShopList()
    },
    enterFun (data) {
      // 事件绑定 -- 回车键事件
      this.isLoadingShow = true
      if (data.keyCode == 13) {
        this.params = {
          regShopName: '',
          shopName: this.searchWord,
          longitudeAndLatitude: sessionStorage.getItem('longitudeAndLatitude'),
          businessType: '',
          orderType: '', // asc：低到高 desc：高到低
          disOrder: 'asc', // asc：近到远   desc：远到近
          pageNum: 1,
          pageSize: 10
        },
        this.isMore = false
        if (this.isLock) {
          this.fetchShopList()
        } else {
          return
        }
      }
    },
    searchFun () {
      this.params = {
        regShopName: this.searchWord,
        shopName: '',
        longitudeAndLatitude: sessionStorage.getItem('longitudeAndLatitude'),
        businessType: '',
        orderType: '', // asc：低到高 desc：高到低
        disOrder: 'asc', // asc：近到远   desc：远到近
        pageNum: 1,
        pageSize: 10
      },
      this.isMore = false
      this.fetchShopList()
    },
    cleanInput () {
      this.searchWord = ''
      this.params.regShopName = ''
    },

    fetchShopList: async function () {
      this.isLock = false
      if (this.isLoadingShow) {
        Indicator.open({
          spinnerType: 'fading-circle'
        });
      }
      const res = await http.post(api.shopList + '?Time=' + Date.parse(Date()) , this.params)
      console.log(res);
      if (res.status == 200) {
        this.isLock = true
        this.isLoadingShow = false
        Indicator.close();
        if (res.data && res.data.data && res.data.data.pageDto) {
          this.isErrorBg = false
          if (this.isMore == false) {
            // console.log(res.data.data.pageDto);
            this.$store.commit('GETSHOPLIST', res.data.data.pageDto)
          } else {
            this.$store.commit('CONCATSHOPLIST', res.data.data.pageDto)
          }
          this.totalPage = res.data.pageInfo.totalPage
          console.log('this.totalPage',this.totalPage);
          if (this.totalPage && this.totalPage == 1) {
            this.allLoaded = true;
          } else if (this.totalPage && this.totalPage > 1) {
            this.allLoaded = false;
          }
        } else {
          Toast({
            message: '未搜索到相关店铺，请试试其他店铺',
            position: 'bottom',
            duration: 2000
          });
          this.allLoaded = true; // 禁止上滑的行为
          this.isErrorBg = true
        }
      } else {
        this.isLock = true
        Indicator.close();
        this.isErrorBg = true
        Toast({
          message: '网络故障，请稍后再试',
          position: 'bottom',
          duration: 2000
        });
      }
    },
    addressDetail () {
      //获取地理位置
      var vm = this;
        //全局的this在方法中不能使用，需要重新定义一下
      var geolocation = new BMap.Geolocation();
      var gc = new BMap.Geocoder();
      console.log(gc);
      geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量
        if(this.getStatus() == BMAP_STATUS_SUCCESS)
          {  //通过Geolocation类的getStatus()可以判断是否成功定位。
            var pt = r.point;
            gc.getLocation(pt, function(rs){
              console.log(rs);
              localStorage.setItem("myAddress", JSON.stringify(rs.point))
              vm.params.longitudeAndLatitude = rs.point.lng + ',' + rs.point.lat
              sessionStorage.setItem('longitudeAndLatitude', vm.params.longitudeAndLatitude)
              vm.fetchShopList ()
            });
          } else {
          switch( this.getStatus() )
            {
              case 2:
                Toast({
                  message: '位置结果未知 获取位置失败',
                  position: 'bottom',
                  duration: 2000
                });
                break;
              case 6:
                Toast({
                  message: '当前 没有权限 获取位置失败',
                  position: 'bottom',
                  duration: 2000
                });
                break;
              case 8:
                Toast({
                  message: '请求超时 获取位置失败',
                  position: 'bottom',
                  duration: 2000
                });
                break;
              default:
                Toast({
                  message: '获取位置失败',
                  position: 'bottom',
                  duration: 2000
                });
            }
          }
      },
      // H5 定位接口中的参数  表示是否允许使用高精度
      {enableHighAccuracy: true})
    },
    handleTopChange (status) {
      this.topStatus = status;
    },
  },
  components: {
    Indicator,
    Header,
    Loadmore,
    List
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.homeBox{
  .topBox{position: relative;padding-top: 5px;
    width: 100vw;background: #EFEFF4;
    .searchBox{position: relative;
      width: 80%;margin: 0 auto; overflow: hidden;
      .search{line-height: 28px; text-align: left;width: 110%;margin: 10px auto;
        border: none; padding-left: 24px;border-radius: 2px;}
    }
    .search_icon{display: inline-block;height: 20px;width: 20px;
      position: absolute;background: url(../images/icon_search.png) center no-repeat;
      background-size: 80%;left: 11%;top: 20px;opacity: 0.3;
    }
    input[type="search"]{-webkit-appearance:none;}
    input[type=search] {
      -webkit-appearance: textfield;
      -webkit-box-sizing: content-box;
      font-family: inherit;
      font-size: 12px;
      line-height: 28px;
      }
      input::-webkit-search-decoration,
      input::-webkit-search-cancel-button {
      display: none;
      }
    .icon_close{display: inline-block;height: 20px;width: 20px;
    position: absolute;background: url(../images/close.png) center no-repeat;
    background-size: 80%; right: 1vw; top: 15px;opacity: 0.5}
    .font12{font-size: 12px; width: 35px;   position: absolute;
    right: 2px; top: 22px;}
  }
  .tabBox{background: #EFEFF4;width: 100vw;justify-content: space-around;
    .tab{font-size: 14px;color: #555;line-height: 36px;position: relative;
      width: 33.33%;justify-content: center;align-items: center;}
    .tab span{ padding: 0 10px;}
  }
  .selectBox{
    position: absolute;width: 100vw;background: #fff;z-index: 2;
      text-align: left;  box-sizing: border-box;height: 0px;
      overflow: auto;transition: all 0.3s;
      .selectItem{padding-left: 20px ;line-height: 42px;
        border-bottom: 1px solid #efefef; padding-top: 2px;}
      .selectItemActive{color: #DDA02E;background: #F9F9F9;transition: all 0.3s;}
  }
  .selectBoxShow{height: 224px; transition: all 0.3s;box-shadow: 0 0 5px #fff }
  .maskBox{position: absolute;width: 100vw;height: 100vh;
    z-index: 1;background: rgba(0,0,0,0);transition: all 0.5s;}
  .maskBoxShow{background: rgba(0,0,0,0.3);transition: all 0.5s;}
  .contentBox{
    overflow: auto; background: #F9F9F9;
  }
  .icon_up{width: 12px;height: 12px;opacity: 0.6;
     background: url(../images/icon_down.png) center no-repeat; background-size: 90%;
     transform: rotateX(180deg);
     transition: all 0.3s;}
  .icon_down{width: 12px;height: 12px;opacity: 0.6;
     background: url(../images/icon_down.png) center no-repeat; background-size: 90%;
     transition: all 0.3s;}
  .iconBox{margin-left: 5px}
  .iconXinUp{position: absolute; top: 8px;}
  .iconXinDown{position: absolute; top: 16px;}
  .iconJuUp{position: absolute; top: 8px;}
  .iconJuDown{position: absolute; top: 16px;}
  .iconActive{opacity: 1;}
  .errorBg{ position: absolute; top: 0; background: #fff; width: 100vw;
  top: 91px;}
  .errorBg img{width: 40%;margin: 180px auto;margin-bottom: 10px;}
  .errorBg .word{color: #ccc;font-size: 14px;}
}
</style>
