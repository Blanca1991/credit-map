<template>
  <div class="homeBox" >
      <div class="">
        <div class="top">
          <!-- <mt-header title="商铺列表">
            <router-link to="/" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
          </mt-header> -->
          <div class="searchBox">
            <input type="search" name="" value="" placeholder="请输入商户关键字搜索">
          </div>
          <div class="flex font14 justifyAround tabList">
            <div class="flex alignCenter" v-for="(item, index) in tabList"
              @click="changeTab(item, index)">
              <div class="padding10"> {{ item.title }} </div>
              <div class="" v-if="index != 0" @click="selectBoxShow(item)">
                <div class="iconDown"
                :class="{iconDownUp: isIconDownUp && item == isIconDownUpItem}"></div>
              </div>
            </div>
          </div>
          <div class="selectBox" v-if="isIconDownUp">
            <div class="font12 selectItem" :class="{selectItemActive: selectItem == item.code}" @click="changeSelectItem(item)"
              v-for="item in selectList">{{ item.title }}
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
      isIconDownUp: false, // 下拉选项是否显示  false隐藏 true显示
      isIconDownUpItem: null,
      selectItem: null, //
      levelList: [
        {
          code: 1,
          title: '好评'
        },
        {
          code: 2,
          title: '一版'
        },
        {
          code: 3,
          title: '差评'
        },
      ],
      categoryList: [
        {
          code: 1,
          title: '品类1'
        },
        {
          code: 2,
          title: '品类2'
        },
        {
          code: 3,
          title: '品类3'
        },
        {
          code: 4,
          title: '品类4'
        },
        {
          code: 5,
          title: '品类5'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 获取数据
      shopList: state => state.shopList,
      selectList: state => state.selectList,
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      // Indicator.open();
      // Indicator.close();
      this.contentHight = document.documentElement.clientHeight - 78
    },
    changeTab (data, index) {
      console.log(data);
      this.isIconDownUpItem = data
      if(index == 0) {
        this.isIconDownUp = false
        return
      } else if (index == 1) {
        this.$store.commit('GETSHOPLIST','')
        this.$store.commit('GETSELECTLIST',this.categoryList)
      } else if (index == 2){
        this.$store.commit('GETSELECTLIST',this.levelList)
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
      // this.allLoaded = true;
      this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
    },
    handleTopChange (status) {
        this.topStatus = status;
    },
    changeSelectItem (data) {
      this.selectItem = data.code
    },
    selectBoxShow (data) {
      this.isIconDownUpItem = data
      this.isIconDownUp = !this.isIconDownUp
      console.log(this.isIconDownUpItem, this.isIconDownUp);
    }
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
  .selectBox{position: absolute;width: 100vw;background: #fff;z-index: 2;
    text-align: left; padding-left: 20px ; box-sizing: border-box;
    .selectItem{line-height: 42px;border-bottom: 1px solid #efefef; padding-top: 2px;}
    .selectItemActive{color: #DDA02E;}
  }
  .padding10{padding:0 10px;}
  .iconDown{display: inline-block;width: 12px;height: 12px;
     background: url(../images/icon_down.png); background-size: 100%;
     margin-left: 5px;margin-right: 5px;margin-top: 10px;transition: all 0.3s;
  }
  .iconDownUp{transform: rotateX(180deg);transition: all 0.3s;}
}
</style>
