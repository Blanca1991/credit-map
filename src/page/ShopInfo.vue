<template>
  <div class="shopInfo" >
    <mt-header title="商铺详情">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="top">
      <div class="imgBox">
        <img :src="shopInfo.imgUrl" alt="">
      </div>
      <div class="padding10 content">
        <div class="flex alignCenter">
          <div class="textLeft font22">
            {{ shopInfo.shopName }}
          </div>
          <div class="paddingL10 ">
            <div class="levelBox font10">
              <div class="level textRight">
                <span v-if="shopInfo.shopLevel == '1'">信用极好</span>
                <span v-if="shopInfo.shopLevel == '2'">信用一般</span>
                <span v-if="shopInfo.shopLevel == '3'">信用较差</span>
              </div>
            </div>
          </div>
        </div>
        <div class="textLeft font14">
          {{ shopInfo.shopDetail}}
        </div>
      </div>
    </div>
    <div class="font14 infoText">
      <div class="">
        <div class="flex borderLine justifyBetween">
          <div class="">注册名称</div>
          <div class="rightWord">小郑的小店</div>
        </div>
        <div class="flex borderLine justifyBetween">
          <div class="">经营地址</div>
          <div class="rightWord flex alignCenter">
            <div class="">徐家汇上台路</div>
            <div class="resetIcon">
              <i class=" mintui mintui-back"></i>
            </div>
          </div>
        </div>
        <div class="flex borderLine justifyBetween">
          <div class="">经营范围</div>
          <div class="rightWord">日消品</div>
        </div>
        <div class="flex borderLine justifyBetween">
          <div class="">联系电话</div>
          <div class="rightWord tel" @click="callPhone(15900000000)">
            15900000000
            <!-- <a href="tel:13764567708">15900000000</a> -->
          </div>
        </div>
        <div class="flex justifyBetween">
          <div class="">信用分数</div>
          <div class="rightWord">800</div>
        </div>
      </div>
    </div>
    <div class="buttonBox padding10">
      <div class="buttonBoxIn">
        <div class="button">
          <router-link
            :to="{ name: 'Appraise',
            params: {
              shopName: shopInfo.shopName,
              imgUrl: shopInfo.imgUrl} }">
            我要评价
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {Header, Indicator, MessageBox} from 'mint-ui'
import {mapState} from 'vuex'

export default {
  name: 'Home',
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
    callPhone (data) {
      let message = data;
      let title = '拨打电话';
      MessageBox.confirm(message, title).then(action => {
        window.location.href = "tel:10086";
      }).catch(() => {
        console.log(444);
      });;
    }
  },
  components: {
    Header,
    Indicator
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.shopInfo{
  height: 100vh; overflow: auto; background: #F9F9F9;
  .mint-header{position: absolute;width: 100vw;}
  .top{
    margin-top: 20px;
    background: #fff;
    .imgBox{}
    .content{box-shadow:0px 2px 3px #eee;}
    img{width: 100vw;height: auto;}
  }
  .borderLine{border-bottom: 1px solid #eee;padding-top: 4px;}
  .padding10{padding: 10px;}
  .level{border: 1px solid;padding: 0 5px;}
  .levelBox{padding: 2px;background: #42C6E0;color: #fff;}
  .infoText{line-height: 38px;box-shadow:0px 2px 3px #eee;padding: 0 15px;
    margin-top: 10px;background: #fff;
    .rightWord{color: #666}
    .resetIcon{transform: rotateY(180deg);}
    .tel{color: #77BAEF;}
  }
  .buttonBox{
    .buttonBoxIn{background: #CEAC6D;color: #fff;padding:4px;}
    .button{padding: 6px;border: 1px solid #fff;}
  }
  .mint-msgbox-cancel{width: 49% !important;}
  a {text-decoraction: none; color: #fff;}
  .router-link-active {text-decoration: none; color: #fff}
}
</style>
