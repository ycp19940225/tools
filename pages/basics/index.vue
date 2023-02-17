<template>
	<view class="container">
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" :fixed="true" top="0" bottom="120">
			<view style="background-color: rgb(255,234,215);">
				<view style="background-image: url(https://wqwangwangwang.mynatapp.cc/upload/img/2.png);height: 65vh; background-size: 100% 100%;">
					<div>
						<view style="text-align: center;">
							<div style="">
								<image src="../../static/fruit/3.png" mode="" style="width: 15em;height: 8em;margin-top: 3em;"></image>
							</div>
							<div style="position: relative;">
								<text class="text_font">从枝头到舌尖的有机水果</text>
								<image src="../../static/fruit/4.png" mode="" style="width: 16em;height: 2em;margin-top: 1em;"></image>
							</div>
							<div style="text-align:center;display: flex;;flex-direction: row;justify-content: center;">
								<div style="margin: 1em;position: relative;">
									<text class="text_font2">现摘现发</text>
									<image src="../../static/fruit/5.png" mode="" style="width: 5em;height: 1.2rem;">
									</image>
								</div>
								<div style="margin: 1em;">
									<text class="text_font4">新鲜保障</text>
									<image src="../../static/fruit/5.png" mode="" style="width: 5em;height: 1.2rem;"></image>
								</div>
							</div>
							<div style="text-align:center;">
								<image src="../../static/fruit/1.png" mode="" style="width: 16em;height: 2rem;"></image>
							</div>
						</view>
					</div>
				</view>
			</view>
			<div class="activity">
				<view style="text-align: center;margin-bottom: 1em;">
					<div></div>
					<div>
						<text style="font-size: 2em;color: rgb(255, 114, 18);padding-top: 10em;">新品上架</text>
					</div>
				</view>
				<ad unit-id="adunit-c4638b402bff1819" ad-type="video" ad-theme="white"></ad>
				<view v-for="(item, key) in activityList" :key="key">
					<view class="content" @click="navigateToProduct(item.id)">
						<view style="height: 20vh;display: flex;flex-direction: row;align-items: center;">
							<view style="flex:1">
								<image :src="item.logo" alt="" lazy-load="true" style="width: 6em;height: 6em;"></image>
							</view>
							<view style="flex:4;padding: 1em;display: flex;flex-direction: column;justify-content: space-between;height: 18vh;">
								<view>
									<text>{{item.title}}</text>
								</view>
								<view style="display: flex;flex-direction: row;justify-content: space-between;">
									<!-- <text class="text-price text-orange">{{item.minPrice}}</text> -->
									<text class="text-price text-orange">{{item.need_score}}积分</text>
									<text style="background-color: #222222;color: #FFFFFF;border-radius: 1em;padding: 0.3em;">立即兑换</text>
								</view>
							</view>
						</view>
					</view>
					<!-- <view v-if="key%4 == 0">
						<ad unit-id="adunit-30807a95553731f8" ad-intervals="30"></ad>
					</view> -->
				</view>
				<view class="adContainer">
				  <ad unit-id="adunit-5d54fad67be2f6b7" ad-intervals="30"></ad>
				</view>
			</div>
		</mescroll-uni>
	</view>
</template>
<script>
	//搜索
	import swiper from '@/components/colorui/components/swiper.vue';
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"; // 拷贝到components的,则引入.vue文件 (注意.vue后缀不能省)
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"

	export default {
		components: {
			swiper,
			MescrollUni,
			uniCountdown
		},
		data() {
			return {
				PageCur: 'home',
				activityList: [],
				swiperList: {},
				navList: {},
				// 下拉刷新的常用配置
				downOption: {
					use: false, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 3 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据...'
					}
				},
				bannerList: {}
			}
		},
		mounted() {
			// 在页面中定义插屏广告
			this.getAd()
		},
		methods: {
			getAd() {
				let _this = this;
				// 在页面中定义插屏广告
				let interstitialAd = null
			
				// 在页面onLoad回调事件中创建插屏广告实例
				if (wx.createInterstitialAd) {
					_this.screenAd = wx.createInterstitialAd({
						adUnitId: 'adunit-56e68361b2b5333d'
					})
					_this.screenAd.onLoad(() => {})
					_this.screenAd.onError((err) => {})
					// _this.screenAd.onClose(() => {})
				}
				// 在适合的场景显示插屏广告
				if (_this.screenAd) {
					setTimeout(function(){
						_this.screenAd.show().catch((err) => {
							console.error(err)
						})
					}, _this.getRandom(15000, 30000))
				}
			},
			getRandom(start, end, fixed=0) {
			            let differ = end - start
			            let random = Math.random()
			            return (start + differ * random).toFixed(fixed)
			},
			navTo(url) {
				uni.navigateTo({
					"url": url
				})
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key].pic = '/static/common/errorImage.jpg';
			},
			getData() {
				console.log(2)
			},
			navToSelect() {
				uni.navigateTo({
					url: `/pages/search/select`
				})
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/category/category`
				})
			},
			search: function(e) {
				//在起始页面跳转到test.vue页面并传递参数
				uni.navigateTo({
					url: '/pages/search/index'
				});
			},
			//跳转到活动详情
			navigateToProduct: function(id) {
				uni.navigateTo({
					url: '/pages/product/product?id= ' + id,
					// url: `/pages/product/index?id=${id}`
				})
			},
			//获取活动
			getActivity: function(mescroll) {

			},
			//获取页面数据
			getPageData: function() {
				var _this = this;
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				// 第1种: 请求具体接口
				this.getPageData()
				mescroll.endSuccess()
			},
			upCallback(mescroll) {
				// this.getActivity(mescroll)
				var _this = this;
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.$http.post('/api/goods/getList?pageNum=' + pageNum + '&pageSize=' + pageSize).then(res => {
					// 接口返回的当前页数据列表 (数组)
					console.log(res)
					let data = res.data.data
					let curPageData = data.list;
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = data.pageSize;
					// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
					let totalSize = data.totalSize;
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = true; 

					// //设置列表数据
					if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.activityList = this.activityList.concat(curPageData); //追加新数据

					// 成功隐藏下拉加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					mescroll.endByPage(curPageData.length, totalPage);
				}).catch(err => {
					console.log(err);
					// 失败隐藏下拉加载状态
					mescroll.endErr()
				})
			}
		},
	}
</script>

<style>
	.text-price::before {
		content: "";
		font-size: 80%;
		margin-right: 4upx;
	}
	.text_font3 {
		color: #FFFFFF;
		position: absolute;
		z-index: 2;
		left: 43%;
	}

	.text_font4 {
		color: #FFFFFF;
		position: absolute;
		z-index: 2;
		left: 56%;
	}

	.text_font2 {
		color: #FFFFFF;
		position: absolute;
		z-index: 2;
		left: 13%;
	}

	.text_font {
		color: rgb(255, 114, 18);
		position: absolute;
		margin-top: 1.2em;
		z-index: 2;
		left: 32%;
	}

	.input_search_box {
		height: 2em;
		background-color: #f2f2f2;
		margin: 6px 6px;
	}

	.search_box {
		height: 2em;
		text-align: center;
		background-color: white;
		border-radius: 0.5em;
		width: 94%;
		margin: 0 auto;
		padding-top: 3px;
	}

	.serach_text {
		color: #888888;
		font-size: 1.1em;
		margin-left: 8px;
	}

	.base_nav {
		display: flex;
		flex: 1;
		flex-direction: row;
		padding: 0 auto;
		/* height: 31vh; */
		background: white;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0.5em 0.5em 0.5em 0.5em;
	}

	.nav_pic_2 {
		flex: 1;
		/* height: 6em; */
		/* min-height: 6em; */
		max-width: 50%;
		padding: 0.4em 0.4em 0.4em 0.4em;
		/* justify-content: space-between; */
	}

	.nav_pic {
		height: 6em;
		/* min-height: 6em; */
		/* max-width: 45%; */

	}

	.banner_pic {
		display: flex;
		margin: 8px 4px 4px 4px;
		flex-direction: column;
	}

	.banner_image {
		flex: 1;
		height: 10vh;
		width: 100%;
		padding: 0 auto;
	}

	.activity {
		background: rgb(255, 234, 215);
		box-shadow: h-shadow v-shadow blur spread color inset;
		margin-bottom: 0;
	}

	.doings_img image {
		height: 20vh;
		width: 100%;
	}

	.content {
		padding: 8px 8px;
		margin: 8px 8px;
		background-color: #FFFFFF;
	}

	.title text {
		font-size: 1rem;
		color: #333333;
		line-height: 1.8rem;
		padding-top: 1.1rem;
		font-weight: bold;
		padding-left: 1em;
	}

	.doings_date {
		position: absolute;
		/* width: 100%; */
		/* height: 100%; */
		/* z-index: 1000; */
		margin-top: 16vh;
		position: absolute;
		/* right: 2.5em; */
		z-index: 1000;
		color: #FFFFFF;
	}

	.doings_date text {
		color: white;
	}

	.doings_location {
		margin-top: 16vh;
		position: absolute;
		right: 2.5em;
		z-index: 1000;
		color: #FFFFFF;
	}


	.doings_location text:nth-child(2) {
		height: 1rem;
		vertical-align: middle;
		font-weight: bold;
	}

	.time {
		display: flex;
		justify-content: space-between;
		margin: 4px 8px;
		/* padding: 4px 8px; */
	}

	.price {
		right: 0;
		color: #007AFF;
	}

	.price text:nth-child(1) {
		font-size: 2em;
	}

	.doing_time text {
		height: 2em;
		display: table-cell;
		vertical-align: middle;
	}

	/* .doing_time text:nth-child(even){
		padding: 0rem 0.3rem;
		background: #333333;
		border-radius: 3px;
		color: #FFFFFF;
		margin: 0 0.1rem;
		margin-top: 0;
	} */
</style>
