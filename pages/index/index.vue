<template>
	<view>
		<draw v-if="PageCur=='draw'"  v-on:videoShow="videoShow" ref="draw"></draw>
		<member v-if="PageCur=='member'"></member>
		<basics v-if="PageCur=='basics'"></basics>
		<user v-if="PageCur=='user'"></user>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="draw">
				<uni-view class="cu-item">
					<uni-text class="lg text-red2 cuIcon-redpacket"><span></span></uni-text>
				</uni-view>
				<view :class="PageCur=='draw'?'text-red2':'text-gray'" style="font-weight: bold;">每日抽奖</view>
			</view>
			<view class="action" @click="NavChange" data-cur="user">
				
				<uni-view class="cu-item">
					<uni-text class="lg text-red2 cuIcon-home"><span></span></uni-text>
				</uni-view>
				<view :class="PageCur=='user'?'text-red2':'text-gray'" style="font-weight: bold;">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'draw',
				videoAd:null,
				isGetAdTime:false
			}
		},
		// onShareAppMessage(res) {
		//     return {
		//       title: '玖和鲜果每日抽奖',
		//       path: '/pages/draw/index' 
		//     }
		// },
		onLoad() {
			this.getAdvideo();
		},
		methods: {
			getAdvideo() {
				let _this = this;
				// 在页面onLoad回调事件中创建激励视频广告实例
				if (wx.createRewardedVideoAd) {
					_this.videoAd = wx.createRewardedVideoAd({
						adUnitId: 'adunit-ce5f2a457dc8d60e'
					})
					_this.videoAd.onLoad(() => {
			            console.log('视频加载完成')
					})
					_this.videoAd.onError((err) => {
						console.log(err)
						_this.isGetAdTime = false;
					})
			
					_this.videoAd.onClose(res => {
						// 用户点击了【关闭广告】按钮
						console.log('close video')
						if(!_this.videoAd) return
						// _this.videoAd.offClose()
						console.log('拉起视频' + _this.isGetAdTime)
						
						// 小于 2.1.0 的基础库版本，res 是一个 undefined
						if (res && res.isEnded || res === undefined) {
							// 正常播放结束，可以下发游戏奖励
							console.log('看完视频' + _this.isGetAdTime)
							if (_this.isGetAdTime == false) {
								_this.$refs.draw.getPrize();
							} else {
								_this.$refs.draw.addDrawTime();
							}
						} else {
							// 播放中途退出，不下发游戏奖励
							uni.showModal({
								title: '奖品已放弃领取！'
							})
							
						}
						// if (!_this.videoAd) return
					})
				}
			},
			videoShow:function(isGetAdTime){
				let _this = this;
				_this.isGetAdTime = isGetAdTime;
				console.log(isGetAdTime)
				_this.videoAd.show().then(function() {
					console.log('激励视频 广告显示22'+':22' + _this.isGetAdTime)
					_this.$tool.hideLoading();
				})
			},
			NavChange: function(e) {
				console.log(e.currentTarget.dataset.cur)
				this.PageCur = e.currentTarget.dataset.cur
			},
		}
	}
</script>

<style>
	.text-red2{
		/* color: rgb(255, 93, 0); */
	}
</style>
