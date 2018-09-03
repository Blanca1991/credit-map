<template>
  <div class="appraise">
    <!-- <mt-header :title="this.$route.params.shopName">
      <router-link to="/ShopInfo" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <div class="top">
      <div class="imgBox">
        <img :src="this.$route.params.imgUrl" alt="">
      </div>
      <div class="textCenter fontBold font18">{{this.$route.params.shopName}}</div>
    </div>
    <div class="content">
      <div class="fontBold font16">总体评价</div>
      <div class="flex justifyCenter">
        <div class="iconItem" v-for="(item, index) in iconList"
          @click="checkAppraise(index)">
          <div class="">
            <i class="iconBg" v-if="isActive != item.isActive"
              :style="{backgroundImage: 'url('+item.icon+')'}"></i>
            <i class="iconBg" v-if="isActive == item.isActive"
              :style="{backgroundImage: 'url('+item.iconActive+')'}"></i>
          </div>
          <div class="font14 itemWord" :class="{activeColor: isActive == item.isActive }">
            {{ item.word }}
          </div>
        </div>
      </div>
      <div class="mt10">
        <div class="font12 textLeft">评价内容</div>
        <div class="">
          <textarea name="name" rows="5" v-model="commentContent" maxlength="100"
          placeholder="100字以内"></textarea>
        </div>
      </div>
      <div class="">
        <div class="font12 textLeft mt10">上传图片</div>
        <div class="upImgBox">
          <Upload/>
        </div>
        <div class="textRight ">
          <div class="font10"><span>最多6张</span></div>
        </div>
      </div>
      <div class="">
        <div class="font12 textLeft mt10">联系方式</div>
        <div class="">
          <textarea name="name" rows="5" maxlength="100" v-model="contactInformation"
          placeholder="您可输入手机号、座机、邮箱、我们会第一时间给您回复"></textarea>
        </div>
      </div>
    </div>
    <div class="buttonBoxWarp">
      <div class="buttonBox padding10">
        <div class="buttonBoxIn" @click="submitFun">
          <div class="button">我要评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, MessageBox, Toast} from 'mint-ui'
import {mapState} from 'vuex'
import iconGread from '@/images/icon_gread.png'
import iconGreadActive from '@/images/icon_gread_active.png'
import iconOk from '@/images/icon_ok.png'
import iconOkActive from '@/images/icon_ok_active.png'
import iconBad from '@/images/icon_bad.png'
import iconBadActive from '@/images/icon_bad_active.png'
import Upload from '@/components/Upload'
import http from '@/utils/http'
import api from '@/utils/api'


export default {
  name: 'Appraise',
  data () {
    return {
      iconList: [
        {
          icon: iconGread,
          iconActive: iconGreadActive,
          word: '好评',
          isActive: 1
        },
        {
          icon: iconOk,
          iconActive: iconOkActive,
          word: '一般',
          isActive: 2
        },
        {
          icon: iconBad,
          iconActive: iconBadActive,
          word: '差评',
          isActive: 3
        }
      ],
      isActive: null,
      commentContent: '', // 评价内容
      contactInformation: '', // 联系方式
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      imgArr: state => state.imgArr,
      shopInfo: state => state.shopInfo,
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init(){

    },
    checkAppraise (index) {
      this.isActive = index+1
    },
    submitFun: async function () {
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      let params = {
        regShopName: this.shopInfo.shopName,
        creditNo: this.shopInfo.creditNo,
        commentLevel: this.isActive,
        commentContent: this.commentContent,
        file: this.imgArr,
        contactInformation: this.contactInformation
      }
      const res = await http.post(api.saveUserMsg + '?Time=' + Date.parse(Date()) , params)
      if (res.status == 200) {
        Indicator.close();
        if (res.data.state == '1') {
          //
        } else {
          //
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
  },
  components:{
    Upload,
    Toast,
    MessageBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.appraise{
  height: 100vh; overflow: auto; background: #F9F9F9;
  .mt10{margin-top: 10px;}
  .mint-header{position: absolute;width: 100vw;}
  .top{
    padding-top: 60px;padding-bottom: 20px;
    .imgBox img{width:20vw;height: 20vw;margin-bottom: 8px;}
  }
  .content{
    background: #fff;width: 95vw;margin: 0 auto;padding: 10px;
    box-sizing: border-box; box-shadow: 0 5px 5px #eee;
    .iconItem{margin: 10px; }
    .activeColor{color: #ED6203;}
    .iconBg{display: inline-block;width: 50px;height: 50px;
      border-radius: 50%;background-size: 100%;}
    .itemWord{color: #666;}
    textarea{ background: #F9F9F9; border-radius: 3px;resize:none;
      border: 1px solid #eee;margin-top: 10px; outline:none;
      padding: 10px;width: 100%;  box-sizing: border-box;
    }
    .upImgBox{width: 100%;margin-top: 10px;
    }
    .textRight{height: 20px;position: relative;}
    .font10{position: absolute;right: -10px;}
  }
  .buttonBoxWarp{
    padding: 0 10px;margin-top: 10px;padding-bottom: 20px;
    .buttonBox{
      .buttonBoxIn{background: #CEAC6D;color: #fff;padding:4px;}
      .button{padding: 6px;border: 1px solid #fff;}
    }
  }

}
</style>
