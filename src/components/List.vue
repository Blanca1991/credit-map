<template>
  <div class="list">
    <div class="flex borderLine" v-for="item in shopList" @click="goToShopInfo(item)">
      <div class="imgBox">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg" alt="">
      </div>
      <div class="flex1" >
        <div class="flex justifyBetween paddingL10 alignCenter">
          <div class="title font20 fontBold">
            {{ item.shopName }}
          </div>
          <div class="levelBox1 font10"  v-if="item.shopLevel == '1'">
            <div class="level1 textRight">
              <span>信用极好</span>
            </div>
          </div>
          <div class="levelBox2 font10"  v-if="item.shopLevel == '2'">
            <div class="level2 textRight">
              <span>信用一般</span>
            </div>
          </div>
          <div class="levelBox3 font10"  v-if="item.shopLevel == '3'">
            <div class="level3 textRight">
              <span>信用极差</span>
            </div>
          </div>
        </div>
        <div class="textLeft address font14">
          <span>{{ item.shopAddress }}</span>
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
    }
  },
  props: ['shopList']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list{background: #F9F9F9;padding:10px;
  .imgBox img{width:20vw;height: 20vw;}
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
