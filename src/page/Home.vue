<template>
  <div class="homeBox" >
      <div class="">
        <div class="top">
          <mt-header title="商铺列表">
            <router-link to="/" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
          </mt-header>
          <div class="searchBox">
            <input type="text" name="" value="" placeholder="请输入商户关键字搜索">
          </div>
          <div class="flex font14 justifyAround tabList">
            <div class="" v-for="(item, index) in tabList" @click="changeTab(index)">{{ item.title }}</div>
            <div class="selectBox">
              <div class="">
                <div class="">1</div>
                <div class="">2</div>
                <div class="">3</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content" :style="{height: contentHight + 'px'}">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange">
            <List :shopList="shopList"/>
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
              <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
          </mt-loadmore>
        </div>
      </div>
  </div>
</template>

<script>
import { Indicator ,Header,Loadmore} from 'mint-ui'
import {mapState} from 'vuex'
import List from '@/components/List'

export default {
  name: 'Home',
  data () {
    return {
      message: 'hello!',
      tabList: [
        {
          title: '按距离'
        },
        {
          title: '按品类'
        },
        {
          title: '按信用'
        },
      ],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      topStatus: '',
      contentHight: 0,
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      shopList: state => state.shopList,
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      // Indicator.open();
      // Indicator.close();
      this.contentHight = document.documentElement.clientHeight - 118
    },
    changeTab (data) {
      console.log(data);
      if(data == 0) {

      } else if (data == 1) {
        this.$store.commit('GETSHOPLIST','')
      } else if (data == 2){

      }
    },
    loadTop() {
      // 下滑 更新数据
      console.log('1551');
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位

    },
    loadBottom() {
      // 上滑 加载更多数据
      console.log('222');
      this.$store.commit('GETALL','')
      // this.allLoaded = true;
      this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
    },
    handleTopChange (status) {
        this.topStatus = status;
    },

  },
  components: {
    Indicator,
    Header,
    List,
    Loadmore
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.homeBox{
  .top{}
  .mint-header{background: #2E2C2F !important}
  .searchBox{
    padding:10px;background: #EFEFF4;text-align: center;margin: 0 auto;
    input{line-height: 28px; text-align: left;width: 95%;
      border: none; border-radius: 50px;padding-left: 20px;}
  }
  .tabList{ line-height: 28px; background: #EFEFF4;}
  .content{overflow: auto;}
}
</style>
