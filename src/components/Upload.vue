<template>
  <div class="upload">
    <div class="flex">
      <div class="imgItem" v-for="item in imgArr">
        <img :src="item" class="imgBox" alt="">
      </div>
      <div class="relative">
        <input type='file' name="file1" ref="file1" multiple accept="image/jpeg, image/png, image/jpg" @change="uploadImg($event)">
        <div class="loadImg"></div>
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
      imgArr: []
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      // imgArr: state => state.imgArr,
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
            var reader = new FileReader();//每循环一次都要重新new一个FileReader实例
            reader.readAsDataURL(tmpFile);
            reader.onload=function(e){
                console.log(e.target.result);
                // vm.imgArr[intI] = e.target.result
                vm.imgArr = Object.assign({},vm.imgArr, e.target.result)
                console.log(vm.imgArr);
            };
        }
    },

  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.upload{
  .imgItem, .loadImg{ border-radius: 3px;border: 1px dashed #eee;
    height: 60px;width: 60px;
    background: url(../images/Icon_add.png) no-repeat center ;
    background-size: 20%;
  }
  #file{position: absolute;height: 60px;width: 60px;opacity: 0;left: 0;}
}
</style>
