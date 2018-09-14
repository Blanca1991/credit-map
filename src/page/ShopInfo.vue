<template>
  <div class="shopInfo" >
    <!-- <mt-header title="商铺详情">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <div class="top">
      <div class="imgBox" >
        <img :src="shopInfo.shopPropagandaPhoto" alt="">
      </div>
    </div>
    <div class="">
      <ShopDis />
    </div>
  </div>
</template>

<script>
import {Header, Indicator, MessageBox, Toast} from 'mint-ui'
import {mapState} from 'vuex'
import ShopDis from '@/components/ShopDis'
import http from '@/utils/http'
import api from '@/utils/api'

export default {
  name: 'ShopInfo',
  data () {
    return {
      searchWord: '',
      longitudeAndLatitude: '',
      businessType: '',
      orderType: '',
      disOrder: 'dasc',
      pageNum: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      shopInfo: state => state.shopInfo,
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      this.searchWord =this.getUrlParmas('searchWord')
      console.log(this.searchWord);
      if (this.searchWord) {
        this.fetchShopList()
      }
    },
    fetchShopList: async function () {
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      let params = {
        regShopName: this.searchWord,
        shopName: '', //
        longitudeAndLatitude: this.longitudeAndLatitude,//
        businessType: this.businessType,
        orderType: this.orderType,
        disOrder: this.disOrder,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      const res = await http.post(api.shopList + '?Time=' + Date.parse(Date()) , params)
      if (res.status == 200) {
        Indicator.close();
        if (res.data.state == '1') {
          console.log(this.isMore);
          if (this.isMore == false) {
            // console.log(res.data.data.pageDto);
            if (res.data.data && res.data.data.pageDto) {
              this.$store.commit('GETSHOPLIST', res.data.data.pageDto)
              this.$store.commit('GETSHOPINFO', res.data.data.pageDto[0])
            }
          } else {
            if (res.data.data && res.data.data.pageDto) {
              this.$store.commit('GETSHOPLIST', res.data.data.pageDto)
              this.$store.commit('GETSHOPINFO', res.data.data.pageDto[0])
            }
          }
          console.log(res.data.pageInfo.totalPage);
          this.totalPage = res.data.pageInfo.totalPage
          console.log('this.totalPage', this.totalPage);
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
    getUrlParmas (name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var indexNum = window.location.hash.indexOf('?');
      var searchStr = window.location.hash.substring(indexNum);
      var r = searchStr.substr(1).match(reg);
      if (r!=null) {
        return unescape(r[2])
      } else {
        console.log(null);
      }
    },
  },
  components: {
    Header,
    Indicator,
    ShopDis,
    Toast
  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.shopInfo{
  height: 100vh; overflow: auto; background: #F9F9F9;
  .mint-header{position: absolute;width: 100vw;}
  .top{
    background: #fff;.imgBox{min-height: 200px;
      background: url(../images/icon_bg_noImg.png) no-repeat center;}
    img{width: 100vw;height: auto;}
  }
}
</style>
