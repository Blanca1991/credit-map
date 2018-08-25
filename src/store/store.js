import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      selectList: [],
			shopList: [
				{
					shopName: '碧桂园',
					shopAddress: '徐家汇上和可路tqwt',
					shopLevel: 1,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
          shopDetail: 'mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据，废话不说上代码。'
				},
        {
					shopName: '碧桂园2',
					shopAddress: '徐家汇上和可路tqwet',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '碧桂园3',
					shopAddress: '徐家汇上和可路tgq',
					shopLevel: 3,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '4',
					shopAddress: '徐家汇上和可路tqwt',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '5',
					shopAddress: '徐家汇上和可路tqwet',
					shopLevel: 1,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '6',
					shopAddress: '徐家汇上和可路tgq',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '7',
					shopAddress: '徐家汇上和可路tqwt',
					shopLevel: 1,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '8',
					shopAddress: '徐家汇上和可路tqwet',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '9',
					shopAddress: '徐家汇上和可路tgq',
					shopLevel: 3,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '10',
					shopAddress: '徐家汇上和可路tgq',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				}
			],

      shopListPink: [
				{
					shopName: '1',
					shopAddress: '徐家汇上和可路tqwt',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '2',
					shopAddress: '徐家汇上和可路tqwt',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '3',
					shopAddress: '徐家汇上和可路tqwt',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				}
			],
      shopListAll: [
				{
					shopName: '碧桂园11',
					shopAddress: '徐家汇上和可路tqwt',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '碧桂园12',
					shopAddress: '徐家汇上和可路tqwet',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '13',
					shopAddress: '徐家汇上和可路tgq',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '14',
					shopAddress: '徐家汇上和可路tqwet',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '15',
					shopAddress: '徐家汇上和可路tgq',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '16',
					shopAddress: '徐家汇上和可路tqwet',
					shopLevel: 1,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				},
        {
					shopName: '17',
					shopAddress: '徐家汇上和可路tgq',
					shopLevel: 2,
					imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535034547051&di=d5b10c1d1ef71b3570cbbbcabd510e18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fadaf2edda3cc7cd90df1ede83401213fb80e9127.jpg',
				}
			],
      // 商品详情 需要上一页传递过去的信息
      shopInfo: {},
    },
    getters: {

    },
    mutations: {
      GETSHOPLIST (state, data){
        this.state.shopList = this.state.shopListPink
      },
      GETALL (state, data){
        this.state.shopList = this.state.shopList.concat(this.state.shopListAll)
      },
      GETSHOPINFO (state, data) {
        this.state.shopInfo = data
      },
      GETSELECTLIST (state, data) {
        this.state.selectList = data
      }
    },
    actions: {

    }
})
