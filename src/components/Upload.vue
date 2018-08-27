<template>
  <div class="upload">
    <div class="flex imgBoxWarp">
      <div class="relative" v-if="imgfile.length < 6">
        <input type='file' name="file" id="file" multiple accept="image/jpeg, image/png, image/jpg" @change="uploadImg($event)">
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
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Upload',
  data () {
    return {
      imgfile: [],
      imgIndex: null,
      isActiveMask: false
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      imgArr: state => state.imgArr,
    })
  },
  mounted () {

  },
  methods: {
    uploadImg (e) {
      let files = e.target.files || e.dataTransfer.files;
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
                console.log(e.target.result);
                vm.$store.commit('ADDIMGARR', e.target.result)
                // vm.imgArr[intI] = e.target.result
                console.log(vm.imgArr);
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
      console.log(this.imgfile);
      console.log(this.imgArr);
    }
  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
</style>
