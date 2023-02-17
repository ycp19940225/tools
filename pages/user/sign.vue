<template>
	<view style="background-color: rgb(235, 102, 95);height: 100vh;position: absolute;width: 100%;">
		<view style="background-color: #FFFFFF;margin:1em;">
			<view style="display: flex;flex-direction: row;;justify-content: space-between;padding: 1em;">
				<view style="color: rgb(235, 102, 95);;">
					<text>已连续签到
						<text style="font-size: 1.5em;">{{signed_day}}</text>天
					</text>
				</view>
				<view class="signed">
					<text class="text-white" v-if="check_sign == false">今日已签到送积分</text>
					<text @click="getSinged" class="text-white" v-else>
						<text class="cuIcon-video"></text>
						签到送积分</text>
				</view>
			</view>
			<view style="border-bottom: 1px solid #DDDDDD;">
			</view>
			<view style="margin-top: 2em;padding-bottom: 3em;">
				<view class="flex_raw">
					<view class="week" v-for="(item,index) in weekData" :key="index">
						<view :class="item.checked ? 'week_score week_checked': 'week_score'">
							<text class="week_score_num " :class="item.checked ? 'week_text': ''">+{{item.score}}</text>
						</view>
						<view style="text-align: center;margin-top: 1em;">
							<text class="week_day">{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="background-color: #FFFFFF; margin:1em;">
			<view style="padding: 1em;" class="solids-bottom">
				<view style="display: flex;flex-direction: column;">
					<text class="text-black text-bold">我的任务</text>
					<text class="text-sm text-gray">完成以下任务可获得积分</text>
				</view>
			</view>
			<view class="history-section icon">
				<view>
					<list-cell icon="icon-share" iconColor="#9789f7" title="分享" :tips="'邀请好友+'+shareScore">
						<button type="default"></button>
					</list-cell>
					<button type="default" @click="getQrCode">立即分享</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="open ?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="'background-image: url(' + img +');height:80vh'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left text-red " style="text-size:2em;font-weight: bold;" @tap="hideModal">点我保存</view>
				</view>
			</view>
		</view>
		<ad unit-id="adunit-4871177e2e5c34cd"></ad>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell.vue';
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"; // 拷贝到components的,则引入.vue文件 (注意.vue后缀不能省)
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell,
			MescrollUni,
		},
		data() {
			return {
				weekData: [0, 1, 2, 3, 4, 5, 6],
				check_sign: true,
				signed_day: 0,
				shareScore: 0,
				videoAd: null,
				share: {
					title: '这里的水果都是免费的，赶紧来领取！',
					path: '/pages/index/index',
				},
				open: false,
				img: ''
			}
		},
		mounted() {
			// this.getPageData();
		},
		computed: {},
		onLoad() {
			// 在页面中定义插屏广告
			this.getPageData()
			this.getAd()
			this.getAdvideo()
		},
		onHide() {
			this.videoAd.destroy()
		},
		methods: {
			showModal() {
				this.open = true
			},
			hideModal(e) {
				let _this = this;
				this.open = false;
				uni.downloadFile({
				    url: _this.img,
				    success: (res) => {
				        if (res.statusCode === 200) {
							let img = res.tempFilePath;
				            uni.saveImageToPhotosAlbum({
				            	filePath: img,
				            	success() {
				            		uni.showToast({
				            			title: '保存成功！',
				            			icon: 'none'
				            		});
				            	},
				            	fail() {
				            		console.log('图片失败'+_this.img)
				            	},
				            	complete() {
				            		console.log(_this.img)
				            	}
				            });
				        }
				    }
				});
				
			},
			getQrCode() {
				let _this = this;
				_this.$tool.showLoading('海报生成中...');
				this.$http.post('/api/user/getQrCode').then(res => {
					var data = res.data.data
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						_this.img = data
						_this.showModal();
						_this.$tool.hideLoading();
					}
				}).catch(err => {
					console.log(err);
				})
			},
			getAdvideo() {
				let _this = this;
				// 在页面onLoad回调事件中创建激励视频广告实例
				if (wx.createRewardedVideoAd) {
					_this.videoAd = wx.createRewardedVideoAd({
						adUnitId: 'adunit-5391fcd7c167fe67'
					})
					_this.videoAd.onLoad(() => {

					})
					_this.videoAd.onError((err) => {

					})

					_this.videoAd.onClose(res => {
						if (!this.videoAd) return
						this.videoAd.offClose()
						// 用户点击了【关闭广告】按钮
						// 小于 2.1.0 的基础库版本，res 是一个 undefined
						if (res && res.isEnded || res === undefined) {
							// 正常播放结束，可以下发游戏奖励
							_this.singed();
						} else {
							// 播放中途退出，不下发游戏奖励
							console.log(_this.getPrizeRecordId)
							uni.showModal({
								title: '已放弃签到！'
							})
							return;
						}

					})
				}
			},
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
					setTimeout(function() {
						_this.screenAd.show().catch((err) => {
							console.error(err)
						})
					}, _this.getRandom(15000, 30000))
				}
			},
			getRandom(start, end, fixed = 0) {
				let differ = end - start
				let random = Math.random()
				return (start + differ * random).toFixed(fixed)
			},
			getSinged() {
				let _this = this;
				_this.$tool.showLoading('加载中...');
				this.videoAd.show().then(function() {
						// console.log('激励视频 广告显示')
						_this.$tool.hideLoading();
				})
			},
			singed() {
				let _this = this;
				_this.$tool.showLoading('签到中...');
				this.$http.post('/api/user/addSinged').then(res => {
					var data = res.data.data
					_this.$tool.hideLoading();
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						_this.signed_day = data.signed_day;
						_this.get_score = data.get_score;
						_this.show_day = data.show_day;
						_this.check_sign = false;
						this.$set(_this.weekData[_this.show_day], 'checked', true)
						console.log(_this.weekData)
						uni.showModal({
							content: '连续签到' + _this.signed_day + '天，获得' + _this.get_score + '积分',
						})
					}
				}).catch(err => {
					console.log(err);
				})
			},
			couponsList() {
				uni.navigateTo({
					url: '/pages/coupons/list'
				})
			},
			getCoupons() {
				uni.navigateTo({
					url: '/pages/coupons/get'
				})
			},
			//分享
			shareTo() {
				uni.showToast({
					'title': '请点击上方工具栏分享转发',
					'icon': 'none'
				})
			},
			tip() {
				this.$api.msg('暂未开通');
			},

			getPageData: function() {
				let _this = this;
				_this.$tool.showLoading('页面加载中...');
				this.$http.post('/api/user/getSingInfo').then(res => {
					var data = res.data.data
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						_this.weekData = data.weekData;
						_this.check_sign = data.check_sign;
						_this.signed_day = data.signed_day;
						_this.shareScore = data.shareScore;
						_this.$tool.hideLoading();
					}
				}).catch(err => {
					console.log(err);
				})
				_this.$http.post('/api/user/getUserOpenId').then(res => {
					var data = res.data.data
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						_this.share.path = _this.share.path + '?shareCode=' + data
					}
				}).catch(err => {})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.userInfo) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

		}
	}
</script>


<style lang="scss">
	.week_score {
		background-color: #DDDDDD;
		border: 1px solid #FFFFFF;
		border-radius: 50em;
		padding: 0.3em 0.3em;
	}

	.week_checked {
		background-color: rgb(235, 102, 95);
	}

	.signed {
		background-color: rgb(235, 102, 95);
		padding: 0.5em;
		border: 1px solid rgb(235, 102, 95);
		border-radius: 1em;
	}

	.week_score_num {
		font-size: 1em;
		color: #FFFFFF;
	}

	.flex_raw {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.week_day {
		font-size: 0.7em;
		color: rgb(150, 150, 150);
	}



	.week {
		display: flex;
		flex-direction: column;
	}

	.line {
		margin: 0 auto;
		/*width: 150rpx;
	height: 2rpx;*/
		background-color: #EB2B2B;
	}
</style>
