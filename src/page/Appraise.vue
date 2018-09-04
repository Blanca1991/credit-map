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
          <div class="upload">
            <div class="flex imgBoxWarp">
              <div class="relative" v-if="imgfile.length < 6">
                <input type='file' ref="file" id="file" multiple accept="image/jpeg, image/png, image/jpg" @change="uploadImg($event)">
                <div class="loadImg"></div>
              </div>
              <div class="imgItem" v-for="(item, index) in imgArr" @click="showDelImg(index)">
                <img :src="item" class="imgBox" alt="" >
                <div class="delImgMask" :class="{isActiveMask: isActiveMask && imgIndex == index}" >
                  <i class="delImg" @click="delImgFun(index)"></i>
                </div>
              </div>
            </div>
          </div>
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
import {Header, MessageBox, Toast, Indicator} from 'mint-ui'
import {mapState} from 'vuex'
import iconGread from '@/images/icon_gread.png'
import iconGreadActive from '@/images/icon_gread_active.png'
import iconOk from '@/images/icon_ok.png'
import iconOkActive from '@/images/icon_ok_active.png'
import iconBad from '@/images/icon_bad.png'
import iconBadActive from '@/images/icon_bad_active.png'
import http from '@/utils/http'
import api from '@/utils/api'


export default {
  name: 'Appraise',
  data () {
    return {
      files: '',
      imgfile: [],
      imgIndex: null,
      isActiveMask: false,
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
      isActive: '',
      commentContent: '', // 评价内容
      contactInformation: '', // 联系方式
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      shopInfo: state => state.shopInfo,
      imgArr: state => state.imgArr
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
        contactInformation: this.contactInformation
      }
      console.log(this.files);
      let formData = new FormData();
      for (let i = 0; i < this.files.length; i ++) {
        formData.append('file', this.files[i]);
      }
      for (let key in params) {
				formData.append(key, params[key]);
			}
      for(let x of formData){
       	console.log(x);
			}
      const res = await http.postFromdata(api.saveUserMsg + '?Time=' + Date.parse(Date()) , formData)
      if (res.status == 200) {
        Indicator.close();
        if (res.data.state == '1') {
          Toast({
            message: '评价成功',
            position: 'bottom',
            duration: 2000
          })
          this.isActive = ''
          this.commentContent = ''
          this.contactInformation = ''
          this.files = ''
          this.$store.commit('DELLALLIMGITEM')
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
    uploadImg (e) {
      let files = e.target.files || e.dataTransfer.files;
      this.files = files
      var size = files.size;
      let maxSize =files.length*3*1024*1024;
      if(size >= maxSize){
        alert('图片已经大小超过3M，请上传小于3M的图片!');
        return false;
      }
      let vm = this
      for(var intI=0;intI<files.length;intI++){
            var tmpFile = files[intI];
            vm.imgfile = vm.imgfile.concat(tmpFile);
            console.log(vm.imgfile);
            var reader = new FileReader();//每循环一次都要重新new一个FileReader实例
            reader.readAsDataURL(tmpFile);
            reader.onload=function(e){
                vm.$store.commit('ADDIMGARR', e.target.result)
            };
        }
    },
    showDelImg (data) {
      this.imgIndex = data
      this.isActiveMask = !this.isActiveMask;
    },
    delImgFun (data) {
      this.$store.commit('DELLIMGITEM', data)
      this.imgfile.splice(data,1)
      // console.log(this.imgfile);
      // console.log(this.imgArr);
    }
  },
  components:{
    Toast,
    MessageBox,
    Indicator
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
    .imgBox img{width:20vw;height: 20vw;margin-bottom: 8px;
    background: url(../images/icon_bg_noImg.png) no-repeat center;
    background-size: 140%;
    }
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
  .upload{
    .imgBoxWarp{overflow: auto;height: 110px;}
    .relative{position: relative;}
    .imgItem, .loadImg{ border-radius: 3px;border: 1px dashed #eee;
      height: 100px;width: 100px;
      background: url(../images/icon_add.png) no-repeat center ;
      background-size: 20%; position: relative;
      img{width: 100px;height: 100px; }
    }
    .delImgMask{background: rgba(0,0,0, 0.3); width: 100%;left: 0;
      height: 100px; top: 0;position: absolute; display: none;}
    .delImg{display: inline-block;height: 16px; width: 16px;
      background: url(../images/icon_del.png) no-repeat center ;
      position: absolute;top: 40px;background-size: 100%;
      position: absolute; right: 40px;}
    .isActiveMask{display: inline-block;}
    #file{position: absolute;height: 100px;width: 100px;
      opacity: 0;left: 0;z-index: 9;}
  }
}
</style>
