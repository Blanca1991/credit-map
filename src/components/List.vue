<template>
  <div class="list">
    <div class="flex borderLine" v-if="!!shopList" v-for="item in shopList" @click="goToShopInfo(item)">
      <div class="imgBox">
        <img :src="item.shopPropagandaPhoto" v-if="item.shopPropagandaPhoto" alt="">
      </div>
      <div class="flex1" >
        <div class="flex justifyBetween paddingL10 alignCenter">
          <div class="title font20 fontBold">
            {{ item.shopName }}
          </div>
          <div class="levelBox1 font10"  v-if="item.shopScoreLevel == 'A'
            || item.shopScoreLevel == 'B'">
            <div class="level1 textRight">
              <span>信用极好</span>
            </div>
          </div>
          <div class="levelBox2 font10"  v-if="item.shopScoreLevel == 'C'
            || item.shopScoreLevel == 'D'">
            <div class="level2 textRight">
              <span>信用一般</span>
            </div>
          </div>
          <div class="levelBox3 font10"  v-if="item.shopScoreLevel == 'E'">
            <div class="level3 textRight">
              <span>信用极差</span>
            </div>
          </div>
        </div>
        <div class="textLeft address font14">
          <span>{{ item.operatingAddress }}</span>
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
.list{background: #F9F9F9;padding:0 10px;
  .imgBox , .imgBox img{width:20vw;height: 20vw;}
  .level1{background: #42C6E0;border: #fff 1px solid;padding:4px 6px;}
  .levelBox1{padding: 2px;background: #42C6E0; color: #fff;}
  .level2{background: #EF7F59;border: #fff 1px solid;padding:4px 6px;}
  .levelBox2{padding: 2px;background: #EF7F59; color: #fff;}
  .level3{background: #E95158;border: #fff 1px solid;padding:4px 6px;}
  .levelBox3{padding: 2px;background: #E95158;color: #fff;}
  .address{padding-left: 10px;margin-top: 15px; }
  .borderLine{ border-bottom: 1px solid #fff;margin-bottom: 5px;}
}
</style>
