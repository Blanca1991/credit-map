import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      selectList: [],
			shopList: [
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635',
               longitude: 121.402971,
               latitude: 31.175128,
           }
        },
        {
           shopName: '一点点',
           creditNo: '91310000MA1FL06Q8A',
           shopScoreLevel: '1', // 店铺评级
           operatingAddress: 'address',
           distance: '',
           shopPropagandaPhoto: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
           shopScore: '1000',
           totalNum: 0,
           totalPageNum: 1,
           detailDto: {
               shopIntroduction: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。',
               regShopName: '一点点哈',
               operatingAddress: 'address',
               businessType: '酒吧',
               shopPhone: '1391111test',
               shopScore: '1000',
               latitudeAndLongitude: '35.95535283,120.20242635'
           }
        },
			],

      // 商品详情 需要上一页传递过去的信息
      shopInfo: {},
      imgArr: []
    },
    getters: {

    },
    mutations: {
      GETSHOPLIST (state, data){
        // 获取店铺的列表
        this.state.shopList = this.state.shopListPink
      },
      GETSHOPINFO (state, data) {
        // 获取店铺的详细信息
        this.state.shopInfo = data
      },
      GETSELECTLIST (state, data) {
        // 获取 按照品类分类的下拉列表
        this.state.selectList = data
      },
      ADDIMGARR (state, data) {
        // 添加图片
        this.state.imgArr = this.state.imgArr.concat(data)
      },
      DELLIMGITEM (state, data) {
        // 删除图片
        this.state.imgArr.splice(data,1)
      },
    },
    actions: {

    }
})
