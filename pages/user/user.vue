<template>
	<view class="container">
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" :fixed="true" top="0" bottom="120">
			<view class="user-section">
				<view class="card-bg" ></view>
				<view class="user-info-box">
					<view class="portrait-box">
						<image class="portrait" :src="userInformation.headimg || '/static/goods/missing-face.png'"></image>
					</view>
					<view class="info-box" style="display: flex;flex-direction: column;">
						<text class="username">{{userInformation.nickname || '游客'}}</text>
						<view style="display: flex;flex-direction: row;">
							<text class="num" style="margin-left: 0.8em;">
								<text>我的积分
								<text class="yticon icon-score" style="margin: 0.5em;background-color: #ffdc10;"></text>
								{{userInformation.score - userInformation.used_score}}
								</text>
							</text>
							<view  @click="navTo('/pages/member/index')" style="margin-left: 1em;">积分明细</view>
						</view>
					</view>
				</view>
				<view class="vip-card-box">
					<image class="card-bg" src="/static/goods/vip-card-bg.png" mode=""></image>
					<view class="b-btn">
						<text @click="navTo('/pages/money/vip_pay')" v-if="userInformation.vip_level == 0">立即开通会员</text>
						<text  v-if="userInformation.vip_level == 1">会员有效期至{{userInformation.vip_date}}</text>
					</view>
					<view class="tit">
						<text class="yticon icon-iLinkapp-"></text>
						plus会员
					</view>
					<text class="e-m">玖和鲜果 Union</text>
					<text class="e-b">尊贵权益</text>
				</view>
			</view>
			<view class="cover-container" :style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			 @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
				<image class="arc" src="/static/arc.png"></image>
				<view class="tj-sction">
					<!-- <view class="tj-item">
					<text class="num">128.8</text>
					<text>余额</text>
				</view> -->
					
				</view>
				<!-- 订单 -->
				<view class="order-section">
					<view class="order-item" @click="navTo('/pages/order/goods_order?state=0')" hover-class="common-hover" :hover-stay-time="50">
						<text class="yticon icon-shouye"></text>
						<text>全部订单</text>
					</view>
					<!-- <view class="order-item" @click="navTo('/pages/order/goods_order?state=1')" hover-class="common-hover" :hover-stay-time="50">
						<text class="yticon icon-daifukuan"></text>
						<text>待兑换</text>
					</view> -->
					<view class="order-item" @click="navTo('/pages/order/goods_order?state=1')" hover-class="common-hover" :hover-stay-time="50">
						<text class="yticon icon-yishouhuo"></text>
						<text>待发货<text style="color: red;" v-if="userInformation.count > 0">({{userInformation.count}})</text></text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/goods_order?state=2')" hover-class="common-hover" :hover-stay-time="50">
						<text class="yticon icon-shouhoutuikuan"></text>
						<text>已发货<text style="color: red;" v-if="userInformation.count2 > 0">({{userInformation.count2}})</text></text>
					</view>
				</view>
				<!-- 浏览历史 -->
				<view class="history-section icon">
					<!-- <view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view> -->
				<!-- 	<view @click="navTo('/pages/member/info')">
						<list-cell icon="yticon icon-iLinkapp-" iconColor="rgb(69, 124, 203)" title="会员积分与等级"></list-cell>
					</view> -->
					<view @click="navTo('/pages/address/address')">
						<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理"></list-cell>
					</view>
					<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				</view>
				<button open-type="contact" class="bg-red" style="width: 80%;margin-top: 2em;">联系客服</button>
			</view>
			<ad unit-id="adunit-832abe8efa8e50f7" ad-intervals="30"></ad>
		</mescroll-uni>
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
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInformation: {
					'headimg': '',
					'nickname': ''
				},
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: false, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 3 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据...'
					}
				}
			}
		},
		mounted() {
			this.getPageData();
			this.getAd();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			getAd() {
				let _this = this;
				// 在页面中定义插屏广告
				let interstitialAd = null
			
				// 在页面onLoad回调事件中创建插屏广告实例
				if (wx.createInterstitialAd) {
					_this.screenAd = wx.createInterstitialAd({
						adUnitId: 'adunit-d7c1f207fcff3ab6'
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
			couponsList(){
				uni.navigateTo({
					url:'/pages/coupons/list'
				})
			},
			getCoupons(){
				uni.navigateTo({
					url:'/pages/coupons/get'
				})
			},
			//分享
			shareTo() {
				uni.showToast({
					'title':'请点击上方工具栏分享转发',
					'icon': 'none'
				})
			},
			tip() {
				this.$api.msg('暂未开通');
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				// 第1种: 请求具体接口
				this.getPageData()
				mescroll.endSuccess()
			},
			editInfo() {
				uni.navigateTo({
					// url: '/pages/user/personal'
				})
			},
			getPageData: function() {
				let _this = this;
				this.$http.post('/api/user/index').then(res => {
					var data = res.data.data
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						if (data['headimg'] != '' || data['nickname'] != '') {
							_this.userInformation = data;
						} else {
							// _this.wxGetUserInfo();
							uni.navigateTo({
								url: '/pages/user/auth'
							})
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			wxGetUserInfo: function() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes);
								that.userInformation.headimg = infoRes.userInfo.avatarUrl;
								that.userInformation.nickname = infoRes.userInfo.nickName;
								that.saveUserInfo(infoRes.userInfo);
							}
						});
					}
				});
			},
			saveUserInfo: function(userInfo) {
				this.$http.post('/api/user/saveBase', userInfo).then(res => {
					var data = res.data.data
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						console.log(res)
					}
				}).catch(err => {
					console.log(err);
				})
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

			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		}
	}
</script>
<style lang='scss'>
	.container {
		margin-bottom: 10em;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;
		background-image: linear-gradient(45deg, #e54d42, #e54d42);
		color: #ffffff;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
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

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 24upx;
			width: 300upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
</style>
