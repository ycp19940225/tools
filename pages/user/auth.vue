<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view>
				<view class='header'>
					<image src='../../static/common/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInformation: {
					'headimg': '',
					'nickname': ''
				}
			}
		},
		methods: {
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
								// prevPage.setData({
								// 	'userInformation': {
								// 		'headimg': infoRes.userInfo.avatarUrl,
								// 		'nickname': infoRes.userInfo.nickName;
								// 	}
								// })
								// that.userInformation.headimg = infoRes.userInfo.avatarUrl;
								// that.userInformation.nickname = infoRes.userInfo.nickName;
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
						uni.showToast({
							title: '授权成功！',
							icon: 'none'
						});
						uni.navigateBack();
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
			}
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
