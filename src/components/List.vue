<template>
  <div class="list">
    <div class="flex borderLine" v-if="!!shopList" v-for="item in shopList" @click="goToShopInfo(item)">
      <div class="imgBox">
        <img :src="item.shopPropagandaPhoto" v-if="item.shopPropagandaPhoto" alt="">
      </div>
      <div class="flex1" >
        <div class="paddingL10 alignCenter">
          <div class="title font14 fontBold">
            {{ item.shopName }}
          </div>
          <div class="levelBox1 font10"  v-if="item.shopScoreLevel == 'A'">
            <div class="level1 textRight">
              <span>信用极好</span>
            </div>
          </div>
	        <div class="levelBox2 font10"  v-if="item.shopScoreLevel == 'B'">
            <div class="level2 textRight">
              <span>信用较好</span>
            </div>
          </div>
          <div class="levelBox3 font10"  v-if="item.shopScoreLevel == 'C' ">
            <div class="level3 textRight">
              <span>信用一般</span>
            </div>
          </div>
	        <div class="levelBox4 font10"  v-if="item.shopScoreLevel == 'D'">
            <div class="level4 textRight">
              <span>信用较差</span>
            </div>
          </div>
          <div class="levelBox5 font10"  v-if="item.shopScoreLevel == 'E'">
            <div class="level5 textRight">
              <span>信用极差</span>
            </div>
          </div>
        </div>
        <div class="textLeft address font12">
          <span>地址：{{ item.operatingAddress }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      title: '商铺列表',
    }
  },
  mounted () {

  },
  methods: {
    goToShopInfo (data) {
      this.$store.commit('GETSHOPINFO',data )
      this.$router.push({name: 'ShopInfo'})
      localStorage.setItem('back', true)
    }
  },
  props: ['shopList']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list{background: #F9F9F9;padding:0 10px;padding-top: 10px;
  .imgBox , .imgBox img{width:24vw;height: 20vw;
    background: url(../images/icon_bg_noImg.png) no-repeat center;
    background-size: 100%;}
    .flex1{margin-left: 3px;}
    .title{text-align: left;display: -webkit-box;
      -webkit-box-orient: vertical; -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .alignCenter{position: relative;}
    .level1{background: #61AD69;border: #fff 1px solid;padding:4px 6px;}
    .levelBox1{padding: 2px;background: #61AD69; color: #fff;width: 80px;
      position: absolute;left: -6px;bottom: -36px;}
    .level2{background: #43C6E0;border: #fff 1px solid;padding:4px 6px;}
    .levelBox2{padding: 2px;background: #43C6E0; color: #fff;width: 80px;
      position: absolute;left: -6px;bottom: -36px;}
    .level3{background: #FEB617;border: #fff 1px solid;padding:4px 6px;}
    .levelBox3{padding: 2px;background: #FEB617;color: #fff;width: 80px;
      position: absolute;left: -6px;bottom: -36px;}
    .level4{background: #EF7F59;border: #fff 1px solid;padding:4px 6px;}
    .levelBox4{padding: 2px;background: #EF7F59; color: #fff;width: 80px;
      position: absolute;left: -6px;bottom: -36px;}
    .level5{background: #DF434C;border: #fff 1px solid;padding:4px 6px;}
    .levelBox5{padding: 2px;background: #DF434C; color: #fff;width: 80px;
      position: absolute;left: -6px;bottom: -36px;}
    .address{padding-left: 10px;margin-top: 36px; display: -webkit-box;
      -webkit-box-orient: vertical; -webkit-line-clamp: 1;
      overflow: hidden;}
    .borderLine{ border-bottom: 1px solid #fff;    margin-bottom: 10px;
    padding-bottom: 10px;}

}
</style>
