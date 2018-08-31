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
import {Header, Indicator, MessageBox} from 'mint-ui'
import {mapState} from 'vuex'
import ShopDis from '@/components/ShopDis'

export default {
  name: 'ShopInfo',
  data () {
    return {

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

    },
  },
  components: {
    Header,
    Indicator,
    ShopDis
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
