<template>
	<view class="app">
		<view class="price-box">
			<text>所需积分</text>
			<text class="price">{{totalFee}}</text>
		</view>
		<view class="order_box">
			<view class="order_title">
				<text class="text-black text-bold">订单信息</text>
			</view>
			<view class="order_detail">
				<view>
					<text class="text-grey">商品名称:</text><text class=" text-df padding">{{orderInfo.list[0].goods_title}}</text>
				</view>
				<view>
					<text class="text-grey">数量:</text><text class=" text-df padding">{{orderInfo.list[0].number_goods}}</text>
				</view>
				<view>
					<text class="text-grey">订单编号:</text><text class=" text-df padding">{{orderInfo.order_no}}</text>
				</view>
				
				<view>
					<text class="text-grey">商品规格:</text><text class=" text-df padding">{{orderInfo.list[0].goods_spec}}</text>
				</view>
			</view>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @tap="showModal" data-target="Modal" v-if="orderInfo.couponsList && orderInfo.couponsList.length > 0">
				<text class="icon cuIcon-ticket text-orange"></text>
				<view class="con">
					<text class="tit">优惠券</text>
					<text> {{selectTitle}}</text>
				</view>
				<view class="radio">
					<text class="icon cuIcon-right text-orange"></text>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">选择优惠券</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl text-left">
						<view v-for="(item,key) in orderInfo.couponsList" :key="key">
							<view class="type-item" @click="selectCoupons(key)">
								<view class="con">
									<text class="tit">{{item.name}}</text>
									<text>优惠金额 ¥ {{item.reduced_price}}</text>
								</view>
								<label class="radio">
									<radio value="" color="#fa436a" :checked='coupons_id == key' />
									</radio>
								</label>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">积分兑换</text>
					<text>可用积分{{orderInfo.back_score}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<!-- <view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view> -->
			<!-- <view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥0</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
		</view>

		<text class="mix-btn text-green" @click="confirm"> 确认兑换</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {},
				timeId: '',
				modalName: null,
				coupons_id: -1,
				totalFee:0,
				selectTitle:'点击选择优惠券'
			};
		},
		computed: {

		},
		onLoad(options) {
			console.log(options)
			// options = {
			// 	orderId: "4"
			// }
			let _this = this;
			_this.getPageData(options);
		},

		methods: {
			calculateTotol(key){
				if(key != -1){
					let coupons = this.orderInfo.couponsList[key];
					this.totalFee = (this.orderInfo.price_total - coupons.reduced_price).toFixed(2);
					this.selectTitle = '选择:' + coupons.name + '  优惠金额:￥' + coupons.reduced_price
				}else{
					this.totalFee = (this.orderInfo.price_total * 1).toFixed(2)
					this.selectTitle = '请选择优惠券'
				}
			},
			selectCoupons(key){
				if(this.coupons_id == key){
					this.coupons_id = -1
				}else{
					this.coupons_id = key;
				}
				this.calculateTotol(this.coupons_id)
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			checkPay(id) {
				var _this = this;
				let data = {
					'id': id
				};
				this.$http.post('/store/api.member.order/checkPay', data).then(res => {
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
								title: '兑换成功！',
								icon: 'success'
							});
							//-ib8s8PRjp81McgQ6WJ0EGtHJn-nJ7lZuByZZv9nI-A

							setTimeout(function() {
								uni.redirectTo({
									url: '/pages/order/goods_order?state=' + 2
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
				this.$http.post('/store/api.member.order/get', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.orderInfo = data;
						_this.totalFee = _this.orderInfo.price_total;
						uni.hideLoading()
						if(_this.orderInfo.couponsList != undefined && _this.orderInfo.couponsList.length != 0){
							let couponsList = _this.orderInfo.couponsList;
							_this.coupons_id = _this.get_object_first_attribute(couponsList);
							_this.calculateTotol(_this.coupons_id);
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			get_object_first_attribute(data){
			    for (var key in data)
			        return key;
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
				if(_this.orderInfo.back_score < _this.totalFee){
					uni.showToast({
						title: '余额不足！',
						icon: 'none'
					});
					return false;
				}
				let data = {
					'order_id': _this.orderInfo.id
				}
				if(_this.coupons_id > -1){
					data.couponsRecordId = _this.orderInfo.couponsList[_this.coupons_id].id;
					data.reduced_price = _this.orderInfo.couponsList[_this.coupons_id].reduced_price;
				}
				this.$http.post('/store/api.member.order/doPay', data).then(res => {
					console.log(res.data.code == 19)
					if (res.data.code != 1 && res.data.code != 19) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else if(res.data.code == 19){ //0元
						//订单支付成功
						_this.timeId = setInterval(function() {
							_this.checkPay(_this.orderInfo.id);
						}, 500)
					}else{
						var data = res.data.data
						_this.timeId = setInterval(function() {
							_this.checkPay(_this.orderInfo.id);
						}, 500)
					}
				}).catch(err => {
					console.log(err);
				})

			},
		}
	}
</script>

<style lang='scss'>
	.order_box{
		margin-top: 10upx;
		background-color: #fff;
		padding: 30upx;
	}
	.order_detail{
		display: flex;
		flex-direction: column;
		padding: 1em;
	}
	.order_title{
		padding: 1em;
		border-bottom: 1px solid #DDDDDD;
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

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			/* &:before {
				content: '￥';
				font-size: 40upx;
			} */
		}
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
