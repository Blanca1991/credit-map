<template>
  <div class="homeBox" >
      <div class="">
        <div class="top">
          <!-- <mt-header title="商铺列表">
            <router-link to="/" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
          </mt-header> -->
          <div class="searchBox">
            <input type="search" v-model="searchWord" class="search"
            placeholder="请输入商户关键字搜索" @keyup="enterFun($event)">
            <i class="icon_close" @click="cleanInput"></i>
          </div>
          <div class="flex font14 justifyAround tabList">
            <div class="flex alignCenter" v-for="(item, index) in tabList"
              @click="changeTab(item, index)">
              <div class="padding10"> {{ item.title }} </div>
              <div class="" v-if="index != 0" @click="selectBoxShow(item)">
                <div class="iconDown"
                :class="{iconDownUp: isIconDownUp && item == isIconDownUpItem}"></div>
              </div>
            </div>
          </div>
          <div class="selectBox" v-if="isIconDownUp">
            <div class="font12 selectItem" :class="{selectItemActive: selectItem == item.code}" @click="changeSelectItem(item)"
              v-for="item in selectList">{{ item.title }}
            </div>
          </div>
        </div>
        <div class="content" :style="{height: contentHight + 'px'}">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="autoFill" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange">
            <List :shopList="shopList"/>
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
              <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
          </mt-loadmore>
        </div>
      </div>
  </div>
</template>

<script>
import { Indicator ,Header, Loadmore, Toast } from 'mint-ui'
import {mapState} from 'vuex'
import List from '@/components/List'
import {MP} from '@/assets/map.js'
import http from '@/utils/http'
import api from '@/utils/api'

export default {
  name: 'Home',
  data () {
    return {
      searchWord: '', // 商铺名
      longitudeAndLatitude: '', // 经纬度
      businessType: '', // 经营业态
      orderType: '',  // 店铺评分类型
      disOrder: 'dasc',// 距离由近到远
      pageNum: 1,
      pageSize: '10',
      isMore: false,
      totalPage: null, // 总页数
      autoFill: false, // 若为真，loadmore 会自动检测并撑满其容器
      tabList: [
        {
          title: '按距离'
        },
        {
          title: '按品类'
        },
        {
          title: '按信用'
        },
      ],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      topStatus: '',
      contentHight: 0,
      isIconDownUp: false, // 下拉选项是否显示  false隐藏 true显示
      isIconDownUpItem: null,
      selectItem: null, //
      levelList: [
        {
          code: 1,
          title: '好评'
        },
        {
          code: 2,
          title: '一般'
        },
        {
          code: 3,
          title: '差评'
        },
      ],
      categoryList: [
        {
          code: 1,
          title: '品类1'
        },
        {
          code: 2,
          title: '品类2'
        },
        {
          code: 3,
          title: '品类3'
        },
        {
          code: 4,
          title: '品类4'
        },
        {
          code: 5,
          title: '品类5'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      shopList: state => state.shopList,
      selectList: state => state.selectList,
    })
  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      this.contentHight = document.documentElement.clientHeight - 92
      this.$nextTick(function(){
        this.addressDetail()
      })
      window.onunload = function () {
        localStorage.clear()
      }
    },
    changeTab (data, index) {
      // 切换tab
      console.log(data);
      this.isIconDownUpItem = data
      if(index == 0) {
        this.isIconDownUp = false
        return
      } else if (index == 1) {
        this.$store.commit('GETSELECTLIST',this.categoryList)
      } else if (index == 2){
        this.$store.commit('GETSELECTLIST',this.levelList)
      }
    },
    loadTop() {
      // 下滑 更新数据
      console.log('更新数据');
      this.init()
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    loadBottom() {
      // 上滑 加载更多数据
      let vm = this;
      setTimeout(()=>{
        if (vm.totalPage - vm.pageNum  > 0) {
          vm.pageNum ++;
          vm.isMore = true
          vm.fetchShopList()
        } else {
          vm.allLoaded = true;
        }
        vm.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      }, 1500)
    },
    handleTopChange (status) {
      this.topStatus = status;
    },
    changeSelectItem (data) {
      // this.orderType = data
      this.selectItem = data.code
      this.init()
    },
    selectBoxShow (data) {
      this.selectItem = null
      this.isIconDownUpItem = data
      this.isIconDownUp = !this.isIconDownUp
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
              vm.longitudeAndLatitude = rs.point.lng + ',' + rs.point.lat
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
    cleanInput () {
      this.searchWord = ''
    },
    fetchShopList: async function () {
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      let params = {
        shopName: this.searchWord, //
        longitudeAndLatitude: this.longitudeAndLatitude,//
        businessType: this.businessType,
        orderType: this.orderType,
        disOrder: this.disOrder,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      const res = await http.post(api.shopList + '?Time=' + Date.parse(Date()) , params)
      console.log(res);
      if (res.status == 200) {
        Indicator.close();
        if (res.data.state == '1') {
          console.log(this.isMore);
          if (this.isMore == false) {
            // console.log(res.data.data.pageDto);
            this.$store.commit('GETSHOPLIST', res.data.data.pageDto)
          } else {
            this.$store.commit('CONCATSHOPLIST', res.data.data.pageDto)
          }
          this.totalPage = res.data.pageInfo.totalPage
          console.log('this.totalPage', this.totalPage);
          if (this.totalPage && this.totalPage == 1) {
            this.allLoaded = true;
          } else if (this.totalPage && this.totalPage > 1) {
            this.allLoaded = false;
          }
        } else {
          Indicator.close();
          this.allLoaded = true; // 禁止上滑的行为
          Toast({
            message: '网络故障，请稍后再试',
            position: 'bottom',
            duration: 2000
          });
        }
      } else {
        Indicator.close();
        Toast({
          message: '网络故障，请稍后再试',
          position: 'bottom',
          duration: 2000
        });
      }
    },
    enterFun (event) {
      // 事件绑定 -- 回车键事件
      if (event.keyCode === 13) {
        this.fetchShopList()
      }
    },
  },
  components: {
    Indicator,
    Header,
    List,
    Loadmore
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.homeBox{
  .top{background: #EFEFF4;padding-top: 20px;}
  .mint-header{background: #2E2C2F !important}
  .searchBox{
    text-align: left;margin:0 auto; margin-bottom: 10px;
    transform: translateX(0);width: 95vw;border-radius: 50px;overflow: hidden;
    input{line-height: 28px; text-align: left;width: 105%;margin: 0 auto;
      border: none; padding-left: 20px;}
    .icon_search{
      display: inline-block;height: 20px;width: 20px;
      position: absolute;background: url(../images/icon_search.png) center no-repeat;
      background-size: 80%;right: 5vw;top: 6px;opacity: 0.5;
    }
    .icon_close{display: inline-block;height: 20px;width: 20px;
    position: absolute;background: url(../images/close.png) center no-repeat;
    background-size: 80%;right: 5vw;top: 6px;opacity: 0.5}
  }
  .tabList{ line-height: 28px; background: #EFEFF4;}
  .content{overflow: auto;}
  .selectBox{position: absolute;width: 100vw;background: #fff;z-index: 2;
    text-align: left; padding-left: 20px ; box-sizing: border-box;
    .selectItem{line-height: 42px;border-bottom: 1px solid #efefef; padding-top: 2px;}
    .selectItemActive{color: #DDA02E;}
  }
  .padding10{padding:0 10px;}
  .iconDown{display: inline-block;width: 12px;height: 12px;
     background: url(../images/icon_down.png); background-size: 100%;
     margin-left: 5px;margin-right: 5px;margin-top: 10px;transition: all 0.3s;
  }
  .iconDownUp{transform: rotateX(180deg);transition: all 0.3s;}
}
</style>
