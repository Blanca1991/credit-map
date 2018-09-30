<template>
  <div class="shopDetial">
    <div class="padding10 content">
      <div class="flex justify-content titleTop flex" id="titlePosTop"
      :class="{'titleAbs': titlePosition,'titleRel': !titlePosition}"
      :style="{'top': titlePosTop+'px'}">
        <div class="textTitle font16 fontBold ">
          {{ shopInfo.shopName }}
        </div>
        <div class="levelBoxWarp" :class="{'levelBoxPadd': !titlePosition}">
          <span class="levelBox1 font10" v-if="shopInfo.shopScoreLevel == 'A' ">
            <span class="level textRight">
              <span >信用极好</span>
            </span>
          </span>
          <span class="levelBox2 font10" v-if="shopInfo.shopScoreLevel == 'B' ">
            <span class="level textRight">
              <span >信用较好</span>
            </span>
          </span>
          <span class="levelBox3 font10" v-if="shopInfo.shopScoreLevel == 'C'">
            <span class="level textRight">
              <span >信用一般</span>
            </span>
          </span>
          <span class="levelBox4 font10" v-if="shopInfo.shopScoreLevel == 'D'">
            <span class="level textRight">
              <span >信用较差</span>
            </span>
          </span>
          <span class="levelBox5 font10" v-if="shopInfo.shopScoreLevel == 'E'">
            <span class="level textRight">
              <span >信用极差</span>
            </span>
          </span>
        </div>
      </div>
      <div class="font14 textLeft titleInfo" v-if="shopInfo.detailDto && shopInfo.detailDto.shopIntroduction" :class="{'titleInfoPadd': !titlePosition}">
        {{ shopInfo.detailDto.shopIntroduction }}
      </div>
    </div>
    <div class="font14 infoText">
      <div class="" v-if="shopInfo && shopInfo.detailDto">
        <div class="flex borderLine justifyBetween">
          <div class="font16">注册名称</div>
          <div class="rightWord">{{ shopInfo.detailDto.regShopName}}</div>
        </div>
        <div class="flex borderLine justifyBetween">
          <div class="font16 textLeft">经营地址</div>
          <div class="rightWord flex alignCenter" @click="goToMap()">
            <div class="" :class="{'tel': titlePosition }">{{ shopInfo.detailDto.operatingAddress }}</div>
          </div>
        </div>
        <div class="flex borderLine justifyBetween">
          <div class="font16 textLeft">经营范围</div>
          <div class="rightWord">{{ shopInfo.detailDto.businessType }}</div>
        </div>
        <div class="flex borderLine justifyBetween">
          <div class="font16 textLeft">联系电话</div>
          <div class="rightWord tel" @click="callPhone(shopInfo.detailDto.shopPhone)">
            {{ shopInfo.detailDto.shopPhone }}
            <!-- <a href="tel:13764567708">15900000000</a> -->
          </div>
        </div>
        <div class="flex justifyBetween">
          <div class="font16 textLeft">信用分数</div>
          <div class="rightWord">{{ shopInfo.detailDto.shopScore }}</div>
        </div>
      </div>
    </div>
    <div class="buttonBox padding10" v-if="shopInfo && shopInfo.detailDto">
      <div class="buttonBoxIn" @click="goToAppraise">
        <div class="button">
          我要评价
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, Indicator, MessageBox} from 'mint-ui'
import {mapState} from 'vuex'

export default {
  name: 'ShopDis',
  data () {
    return {
      titlePosTop: '0',
      titlePosition: true,
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      shopInfo: state => state.shopInfo,
    })
  },
  mounted () {
    console.log(this.shopInfo);
    console.log(this.$route.path);
    if (this.$route.path == '/ShopInfo') {
      this.titlePosTop = -(document.getElementById('titlePosTop').offsetHeight+5)
      this.titlePosition = true
    } else {
      this.titlePosition = false
    }
  },
  methods: {
    callPhone (data) {
      let message = data;
      let title = '拨打电话';
      MessageBox.confirm(message, title).then(action => {
        let phoneNum = 'tel:'+data
        window.location.href = phoneNum;
        console.log('拨打电话');
      }).catch(() => {
        console.log('取消电话');
      });;
    },
    goToMap () {
      this.$router.push({name: 'BMap'})
      sessionStorage.setItem('shopInfoStorage', JSON.stringify(this.shopInfo))
    },
    goToAppraise () {
      console.log(222);
      this.$router.push({name: 'Appraise',params: {
        shopName: this.shopInfo.shopName,
        imgUrl: this.shopInfo.shopPropagandaPhoto}})
    }
  },
  props: [],
  components: {
    Header,
    Indicator,
    MessageBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.shopDetial{
  .content{box-shadow:0px 2px 3px #eee;position: relative;}
  .titleTop{width: 100%;left: 0;}
  .borderLine{border-bottom: 1px solid #eee;padding-top: 4px;}
  .padding10{padding: 10px;}
  .level{border: 1px solid;padding: 0 5px;}
  .levelBoxWarp{width: 81px;transform: scale(0.6);position: absolute;right: 0px;}
  .levelBoxPadd{right: -10px;}
  .levelBox1{padding: 2px;background: #61AD69;color: #fff;width: 80px;}
  .levelBox2{padding: 2px;background: #42C6E0;color: #fff;width: 80px;}
  .levelBox3{padding: 2px;background: #FEB617;color: #fff;width: 80px;}
  .levelBox4{padding: 2px;background: #EF7F59;color: #fff;width: 80px;}
  .levelBox5{padding: 2px;background: #DF434C;color: #fff;width: 80px;}
  .infoText{line-height: 38px;box-shadow:0px 2px 3px #eee;padding: 0 15px;
    margin-top: 10px;background: #fff;
    .rightWord{color: #666}
    .resetIcon{transform: rotateY(180deg);}
    .tel{color: #77BAEF;}
  }
  .justify-content{justify-content: space-between;}
  .buttonBox{
    .buttonBoxIn{background: #CEAC6D;color: #fff;padding:4px;}
    .button{padding: 6px;border: 1px solid #fff;}
  }
  .titleAbs{position: absolute;color: #fff;background: rgba(0,0,0,0.7);padding: 10px;
    overflow: hidden;}
  .titleRel{position: relative;color: #444;padding-top: 10px;}
  .textTitle{text-align: left;padding-left: 5px;width: 80%;}
  .titleInfo{padding-left: 5px;}
  .titleInfoPadd{padding-top: 15px;}
  .textLeft{color: #444;}
  .mint-msgbox-cancel{width: 49% !important;}
  a {text-decoraction: none; color: #fff;}
  .router-link-active {text-decoration: none; color: #fff}
}
</style>
