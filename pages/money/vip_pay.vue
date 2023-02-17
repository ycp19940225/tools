<template>
	<view class="app">
		<view class="price-box" style="display: flex;flex-direction: column;background-color: #fff;">
			<view class="price_box" style="text-align: center;">
				<view class="price_item" >
					<text class="text-price">98.00</text>
				</view>
			</view>
			
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
		</view>
		<text class="mix-btn text-green" @click="confirm"> 充值 ￥{{totalFee}}</text>
		<ad unit-id="adunit-f7e39f5c68e6d3fe" ad-type="video" ad-theme="white"></ad>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				payType: 1,
				cardList: [],
				card_id: 0,
				totalFee: 98.00,
				choose_number:1
			};
		},
		computed: {

		},
		onLoad(options) {
			let _this = this;
			_this.getPageData(options);
		},

		methods: {
			chooseNumber(value){
				this.choose_number = value
				this.calculateTotol()
			},
			getCardId(index){
				let _this = this; 
				_this.card_id = index;
				_this.calculateTotol()
			},
			calculateTotol(){
				let key = this.card_id;
				let card = this.totalFee;
				this.totalFee = (card*1*this.choose_number).toFixed(2);
			},
			checkPay(id) {
				var _this = this;
				let data = {
					'id': id
				};
				this.$http.post('/api/card/checkPay', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						if (data.paySuccess == true) {
							clearInterval(_this.timeId)
							uni.showToast({
								title: '充值成功！',
								icon: 'success'
							});
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/index/index'
								})
							}, 1000)
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			getPageData(data) {
				var _this = this;
				uni.showLoading({
					title:'加载中...',
				})
				this.$http.post('/api/card/getCardList', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.cardList = data;
						this.calculateTotol()
						uni.hideLoading()
					}
				}).catch(err => {
					console.log(err);
				})
				uni.hideLoading()
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: function() {
				var _this = this;
				if (_this.payType != 1) {
					uni.showToast({
						title: '暂不支持该种支付方式！',
						icon: 'none'
					});
					return false;
				}
				let card = _this.cardList[_this.card_id];
				// if (_this.cardList.length == 0) {
				// 	uni.showToast({
				// 		title: '暂无可选择储值卡！',
				// 		icon: 'none'
				// 	});
				// 	return false;
				// }
				let data = {
					'number': _this.choose_number
				}
				this.$http.post('/api/card/doPay', data).then(res => {
					if (res.data.code != 1 && res.data.code != 19) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					}else{
						var data = res.data.data
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: data.timeStamp,
							nonceStr: data.nonceStr,
							package: data.package,
							signType: data.signType,
							paySign: data.paySign,
							success: function(res) {
								_this.timeId = setInterval(function() {
									_this.checkPay(data.orderId);
								}, 500)
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				}).catch(err => {
					console.log(err);
				})

			},
		}
	}
</script>

<style lang='scss'>
	.price_box{
		display: flex;flex-direction: row;margin: 1em;width: 100%;flex-flow: row wrap;align-content: flex-start;
	}
	.active{
		background-color: #39b54a;
	}
	.price_item{
		border: 1px solid #dddddd;
		margin: 1em;
		flex: 0 0 25%;
		padding: 1em;
		font-weight: bold;
		text-align: center;
	}
	.order_box{
		margin-top: 10upx;
		background-color: #fff;
	}
	.order_detail{
		display: flex;
		flex-direction: column;
		padding: 1em;
	}
	.order_title{
		padding: 1em;
	}
	.coupon-detail {
		flex: 5;
		padding: 4px;
	}
	
	.coupon-money {
		flex: 2;
	}
	.coupons_box{
		display: flex;
		flex-direction: row;
	}
	.app {
		width: 100%;
	}


	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
