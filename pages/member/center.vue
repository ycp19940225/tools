<template>
	<view style="background-color: rgb(235, 102, 95);">
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" :fixed="true" top="0" bottom="120">
			<view style="background-color: rgb(235, 102, 95);padding: 1em;">
				<view style="background-size: 100% 100%;">
					<div >
						<view style="text-align: center;">
						<!-- 	<div style="">
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
							</div> -->
							<div style="text-align:center;">
								<image src="../../static/common/f2.png" mode="" style="width: 100%;height: 10em;margin-top: 1em;"></image>
							</div>
						</view>
					</div>
				</view>
			</view>
<!-- 			<view class="bg-gradual-blue">
				<view style="display: flex;">
			
					<view style="text-align: right;flex:1;padding: 2em;margin-bottom: 1em;">
						<text style="border-radius: 1em;border: #DDDDDD 1px solid;padding: 0.5em;" @click="navTo('/pages/member/info')">
							会员权益
						</text>
					</view>
				</view>
				<view style="">
					<view class="cu-bar btn-group">
						<button class="cu-btn bg-green shadow-blur round lg" @click="navTo('/pages/money/vip_pay')" v-if="vip.vip_level == 0">立即开通会员</button>
						<text class="cu-btn bg-green shadow-blur round lg"  v-if="vip.vip_level == 1">会员有效期至{{vip.vip_date}}</text>
					</view>
				</view>
			</view> -->
			
			<view class="activity">
				<view style="text-align: center;padding-bottom: 1em;background-color: rgb(235, 102, 95);">
					<div></div>
					<div>
						<text style="font-size: 2em;color: color:#ffffff;padding-top: 10em;">会员礼品专区</text>
					</div>
				</view>
				<view class="cu-form-group" v-for="(item,index) in record" :key="index">
					<!-- <view class="title">{{item.order_sn}}</view> -->
					<view class="content" >
						<view style="height: 20vh;display: flex;flex-direction: row;align-items: center;">
							<view style="flex:1">
								<image :src="item.logo" alt="" lazy-load="true" style="width: 6em;height: 6em;"></image>
							</view>
							<view style="flex:4;padding: 1em;display: flex;flex-direction: column;justify-content: space-between;height: 18vh;">
								<view>
									<text>{{item.title}}</text>
								</view>
								<view style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;">
									<!-- <text class="text-price text-orange">{{item.minPrice}}</text> -->
									<view>
										<text style="background-color: red;color: #FFFFFF;border-radius: 1em;padding: 0.3em;" v-if="item.has == false && item.vip == true" @click="navTo2(index)">马上领取</text>
										<text style="background-color: #DDDDDD;color: #FFFFFF;border-radius: 1em;padding: 0.3em;" v-if="item.has == true">已领取</text>
										<text style="background-color: #DDDDDD;color: #FFFFFF;border-radius: 1em;padding: 0.3em;" v-if="vip.vip_level == 0">请先开通会员领取</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<ad unit-id="adunit-832abe8efa8e50f7" ad-intervals="30"></ad>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		httpUrl
	} from '@/js_sdk/tools/tool.js'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				show_title: '',
				balance: '0.00',
				record: [],
				userInfo: {},
				vip:{},
				userInformation:{},
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
						size: 9 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无特权商品...'
					}
				},
				bannerList: {}
			};
		},
		onLoad(option) {
			console.log(option)
			let _this = this;
			// 在页面中定义插屏广告
			_this.getPageData(option);
			_this.getAd();
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
					url: url
				})
			},
			navTo2(index){
				let option = {}
				option.goods_id = this.record[index].id;
				console.log(this.record[index].id)
				uni.redirectTo({
					url: `/pages/order/createOrder2?data=` + JSON.stringify(option)
				});
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
				_this.$http.post('/api/user/getVipInfo?pageNum=' + pageNum + '&pageSize=' + pageSize).then(res => {
					// 接口返回的当前页数据列表 (数组)
					let data = res.data.data
					let curPageData = data.list;
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = data.pageSize;
					// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
					let totalSize = data.totalSize;
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = true; 

					// //设置列表数据
					if (mescroll.num == 1) _this.dataList = []; //如果是第一页需手动置空列表
					_this.record = _this.record.concat(curPageData); //追加新数据
					//vip
					_this.vip = data.vip;
					// _this.userInformation = data.user;

					// 成功隐藏下拉加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					mescroll.endByPage(curPageData.length, totalPage);
				}).catch(err => {
					console.log(err);
					// 失败隐藏下拉加载状态
					mescroll.endErr()
				})
			},
			getPageData() {
				var _this = this;
				let data = {
					'coupons_code': _this.code
				};
				uni.showLoading({
					title: "加载中..."
				})
				_this.$http.post('/api/user/getVipInfo', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.userInfo = data.userInfo
						_this.record = data.record;
					}
					uni.hideLoading();
				}).catch(err => {
					console.log(err);
				})
				uni.hideLoading();
			},
			//立即报名
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				let _this = this;
				_this.key = e.detail.current;
				_this.getChecked()
			},
			getChecked() {
				let _this = this;
				//会员等级显示
				_this.show_title = _this.levelData[_this.key].show_title
				//会员等级
				let key = _this.swiperList[_this.key].id
				let currentCard = _this.array[key].pri_id;
				let priAllData = _this.priAllData,
					pri_id;
				for (let i = 0; i < priAllData.length; i++) {
					pri_id = priAllData[i].id;
					for (let j = 0; j < currentCard.length; j++) {
						if (currentCard[j] == pri_id) {
							priAllData[i].checked = true;
							break;
						} else {
							priAllData[i].checked = false;
						}
					}
				}
				_this.priAllData = priAllData;
			}
		},
	}
</script>

<style lang='scss'>
	.activity {
		background: rgb(255, 234, 215);
		box-shadow: h-shadow v-shadow blur spread color inset;
		margin-bottom: 0;
	}
	.text_font {
		color: rgb(255, 114, 18);
		position: absolute;
		margin-top: 1.2em;
		z-index: 2;
		left: 32%;
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
.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

</style>
