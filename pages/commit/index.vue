<template>
	<view>
		<view class="top">
			<view class="bg-white padding-xs">
				<view class="cu-steps">
					<view class="cu-item" :class="index>basics?'':'text-base'" v-for="(item,index) in basicsList" :key="index">
						<text :class="'' + item.cuIcon"></text>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="order_content">
				<view class="title">
					参赛套餐
				</view>
				<view class="order_form">
					<form>
						<view class="cu-form-group" v-if="product.package.length > 0">
							<view class="title">选择套餐</view>
							<picker @change="pickerPackage" :value="0" range-key="name" :range="product.package">
								<view class="picker">
									{{product.package[pickerPackageRes.index].name}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">选择赛程</view>
							<picker @change="pickerGroup" :value="0" range-key="name" :range="product.group">
								<view class="picker">
									{{product.group[pickerGroupRes.index].name}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group check_box" v-if="product.goods.length > 0">
							<view class="title">可选服务</view>
							<view class="picker picker_check_box" @click="openPopup">
								<text v-if="product.attr_checked != undefined">(已选{{product.attr_checked}}项)</text>查看全部{{product.goods.length}}项
							</view>
						</view>
						<navigator url="/pages/address/address?source=1" class="address-section" v-if="product.goods.length > 0">
							<view v-if="addressData != undefined" class="order-content">
									<text class="yticon icon-shouhuodizhi"></text>
									<view class="cen">
										<view class="top">
											<text class="name">{{addressData.name}}</text>
											<text class="mobile">{{addressData.phone}}</text>
										</view>
										<text class="address">{{addressData.province}} {{addressData.city}} {{addressData.area}} {{addressData.address}}</text>
									</view>
									<text class="yticon icon-you"></text>
								<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
							</view>
							<view v-else class="cu-form-group">
								<view class="cu-form-group">
									<text class="yticon icon-shouhuodizhi"></text>
									<view class="title">暂无收货地址，去添加</view>
								</view>
								<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
							</view>
						</navigator>
						<!-- <view class="cu-form-group">
							<view class="activity_product">
								<view class="product_item" v-for="(item, key) in product.goods" :key="key" v-if="product.goods.length > 0">
									<view class="product_content">
										<view class="product_img">
											<img :src="item.logo" alt="" >
										</view>
										<view class="goods_title">
											{{item.title}}
										</view>
										<view class="goods_price_box">
											<view class="goods_price">
												<view class="s_pricecurr"><text>￥</text><text>{{item.price_selling}}</text></view>					            					
												<view class="s_price">{{item.price_market}}</view>
											</view>
											<view class="goods_check_box">
												<label>
													<checkbox :value="item.id" :checked="item.checked" @click="openPopup" /><text></text>
												</label>
											</view>
										</view>
									</view> 
								</view>
							</view>
						</view> -->
						<view class="cu-form-group align-start">
							<view class="title">备注</view>
							<textarea placeholder="如有特殊需求请备注" v-show="hide" :value="remark" @input="bindTextAreaBlur"></textarea>
						</view>
					</form>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="cu-bar bg-white tabbar border total_price_box">
				<view class="total_price">
					<view>总计: <text class="total_price_num">￥{{total_price}}</text></view>
				</view>
				<view class="total_price_detail">
					<view @click="openDetail">价格明细</view>
				</view>
				<view class="bg-red submit" @click="commit()">
				<!-- <form @submit="commit" report-submit='true'>
				</form> -->
				<button  class="bg-red no-border" >立即报名</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="top">
			<view v-for="(itemData,index) in productData" :key="index" :data-id="index" class="product_detail">
				<checkbox value="cb" @click="openItem(index)"/><text class="ck_text">{{ itemData.name }}</text>
				<view v-for="(attr,key) in itemData.item" :key="key" v-if="itemData.open">
					{{ attr.item_name }}
					<view  class="attr_item">
						<view v-for="(attrItem,k) in attr.item_value" :key="k" >
							<radio value="" name="attr" /><text class="ck_text">{{ attrItem }}{{ k }}</text>
						</view>
					</view>
				</view>
			</view>
			<button @click="closePopup" class="close">确定</button>
		</uni-popup>
		<uni-popup ref="detail" type="bottom">
			<view class="uni-popup_box">
				<view v-for="(item,index) in pickerDetail" :key="index" :data-id="index">
					<view class="detail_list">
						<view class="detail_list_title">{{ item.name }}</view>
						<view class="">
							￥: <text class="total_price_num">{{ item.price }}</text>
						</view>
					</view>
				</view>
				<view class="detail_list">
					<view class="detail_list_title">总计金额</view>
					<view class="">
						￥: <text class="total_price_num">{{total_price}}</text>
					</view>
				</view>
				<button @click="closePopup" class="close">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				addressData: {
					
				},
				product_id:'',
				isClicked: false,
				remark: '',
				total_price: 0,
				pickerDetail: [],
				pickerPackageRes: {
					index: 0
				},
				pickerGroupRes: {
					index: 0
				},
				product: {},
				hide: true,
				productData: [{
						"name": "VITARGO唯它高 能量胶 国家队专用 德国原产----",
						"item_open": false,
						"item": [{
							"item_name": "颜色",
							"item_value": {
								"21": "紫/玫红",
								"32": "黑/绿"
							}
						}, {
							"item_name": "尺码",
							"item_value": {
								"1": "S（35-38）",
								"3": "M（39-42）",
								"7": "L（43-46）"
							}
						}]
					},
					{
						"name": "VITARGO唯它高 能量胶 国家队专用 德国原产----",
						"item_open": false,
						"item": [{
							"item_name": "颜色",
							"item_value": {
								"21": "紫/玫红",
								"32": "黑/绿"
							}
						}, {
							"item_name": "尺码",
							"item_value": {
								"1": "S（35-38）",
								"3": "M（39-42）",
								"7": "L（43-46）"
							}
						}]
					}
				],
				picker: ['套餐一', '套餐二', '套餐三'],
				basicsList: [{
						cuIcon: 'cuIcon-radioboxfill',
						name: '报名组合'
					},
					{
						cuIcon: 'cuIcon-title',
						name: '支付订单'
					},
					{
						cuIcon: 'cuIcon-title',
						name: '完善资料'
					},
					{
						cuIcon: 'cuIcon-title',
						name: '报名成功'
					}
				],
				basics: 0,
				numList: [{
					name: '开始'
				}, {
					name: '等待'
				}, {
					name: '错误'
				}, {
					name: '完成'
				}, ],
				num: 0,
				scroll: 0
			};
		},
		mounted() {

		},
		onLoad(option) {
			console.log(option)
			// option = {product_id: "17"};
			let _this = this;
			this.product_id = option.product_id
			_this.getPageData(option);
		},
		onShow: function() {
		    console.log('App Show22')
			this.calculatePrice();
		},
		methods: {
			bindTextAreaBlur: function(e) {
				this.remark = e.detail.value;
			},
			//立即报名
			commit(e) {
				// console.log(e)
				var _this = this;
				uni.requestSubscribeMessage({
					tmplIds: ['-ib8s8PRjp81McgQ6WJ0EGtHJn-nJ7lZuByZZv9nI-A'],
					success(res) {
						_this.doCommit()
					},
					fail(err) {
						console.log(err)
						_this.doCommit();
					}
				})
			},
			doCommit(){
				var _this = this;
				let packagePicker = _this.product.package[_this.pickerPackageRes.index];
				let groupPicker = _this.product.group[_this.pickerGroupRes.index];
				//服务
				let goodsInfo = [],attr;
				var items = this.product.goods;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if((item.check== true || item.item_open == true) && item.price != undefined){
						attr = {
							[item.id]: item.checked_attr
						}
						goodsInfo.push(attr)
					}
				}
				let data = {
					'activity_id': _this.product.id,
					'group_id': groupPicker.id,
					'total_price': _this.total_price,
					'remark': _this.remark,
					'goods_info': goodsInfo,
					'member_address_id': _this.addressData.id
					// 'form_id':e.detail.formId != undefined ? e.detail.formId : ''
				};
				if (packagePicker != undefined && _this.product.package.length > 0) {
					data.package_id = packagePicker.id
				}
				
				if (_this.isClicked == true) {
					uni.showToast({
						title: '请不要重复提交！',
						icon: 'none'
					});
					return false;
				}
				_this.isClicked = true;
				_this.$http.post('/api/order/createOrder', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var orderId = res.data.data
						uni.showToast({
							title: res.data.info,
							icon: 'success'
						});
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/money/pay?orderId=' + orderId
							})
						}, 2000)
					}
				}).catch(err => {
					console.log(err);
				})
			},
			pickerPackage(e) {
				let pickerPackageId = e.target.value;
				this.pickerPackageRes.index = pickerPackageId
				this.calculatePrice();
			},
			pickerGroup(e) {
				let pickerGroupId = e.target.value;
				this.pickerGroupRes.index = pickerGroupId
				this.calculatePrice();
			},
			getPageData(data) {
				var _this = this
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$http.post('/api/order/confirm', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.product = data;
						_this.addressData = data.addressData;
						_this.calculatePrice();
						uni.hideLoading();
					}
				}).catch(err => {
					console.log(err);
				})
				uni.hideLoading();
			},
			openDetail() {
				let _this = this;
				let packagePicker;
				let groupPicker;
				packagePicker = _this.product.package[_this.pickerPackageRes.index];
				groupPicker = _this.product.group[_this.pickerGroupRes.index];
				_this.pickerDetail = [];
				if (_this.product.package != undefined && _this.product.package.length > 0) {
					_this.pickerDetail.push(packagePicker)
				}
				let attr;
				var items = this.product.goods;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if((item.check== true || item.item_open == true) && item.price != undefined){
						attr = {
							name: item.title,
							price: item.price
						}
						_this.pickerDetail.push(attr)
					}
				}
				_this.pickerDetail.push(groupPicker)
				_this.calculatePrice();
				this.$refs.detail.open();
				this.hide = false;
			},
			calculatePrice() {
				let _this = this;
				let packagePicker;
				let groupPicker;
				if (_this.product.package != undefined && _this.product.package.length > 0) {
					packagePicker = _this.product.package[_this.pickerPackageRes.index];
					groupPicker = _this.product.group[_this.pickerGroupRes.index];
					_this.total_price = (packagePicker.price * 1 + groupPicker.price * 1).toFixed(2);
				} else {
					groupPicker = _this.product.group[_this.pickerGroupRes.index];
					_this.total_price = (groupPicker.price * 1).toFixed(2);
				}
				//服务
				var items = this.product.goods,total_price = 0;
				if(items != undefined && items.length >0){
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i];
						if((item.check== true || item.item_open == true) && item.price != undefined){
							total_price += item.price*1;
						}
					}
					if(total_price > 0){
						let total = _this.total_price*1 + total_price*1
						_this.total_price = total.toFixed(2)
					}
				}
			},
			openItem(index) {
				let chcek = this.productData[index].open;
				this.$set(this.productData[index], 'open', chcek == true ? false : true);
				console.log(this.productData[index], index)
			},
			tabSelect() {
				console.log(1)
			},
			openPopup() {
				// this.$refs.popup.open()
				uni.navigateTo({
				    url: '/pages/commit/goods_attr?product_id=' + this.product_id
				});
			},
			closePopup() {
				this.hide = true;
				// this.$refs.popup.close()
				this.$refs.detail.close()
			},
			BasicsSteps() {
				this.basics = this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1
			},
			NumSteps() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
			},
			ScrollSteps() {
				this.scroll = this.scroll == 9 ? 0 : this.scroll + 1
			},
			picker_goods() {
				console.log(1)
			}
		}
	}
</script>
<style lang="scss">
	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;
	
		.order-content {
			display: flex;
			align-items: center;
		}
	
		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}
	
		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}
	
		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}
	
		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}
	
		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}
	
		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}
	.uni-popup_box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
		padding: 4px 8px;
	}

	.close {
		margin-top: 1em;
		width: 30%;
	}

	.product_detail {
		display: flex;
		padding: 4px 8px;
		background-color: #fff;
	}

	.total_price_num {
		font-size: 1.2em;
		font-weight: bold;
		color: #FF7400;
	}

	.detail_list_title {
		font-size: 1.2em;
		font-weight: bold;
	}

	.detail_list {
		display: flex;
		justify-content: space-between;
		margin: 4px 8px;
	}

	.total_price_detail {
		display: flex;
		width: 30%;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
	}

	.total_price {
		display: flex;
		width: 30%;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
	}

	.submit {
		width: 40%;
	}

	.total_price_box {
		display: flex;
		justify-content: space-between;
	}

	.order_content {
		height: 300%;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.goods_price_box {
		display: flex;
		justify-content: space-between;
	}

	.s_price {
		font-size: 0.8rem;
		color: #CCCCCC;
		text-decoration: line-through;
		margin-left: 0.2rem;
	}

	.s_pricecurr text:nth-child(2) {
		color: #eb2b2b;
		font-weight: bold;
		font-size: 1.1rem;
	}

	.s_pricecurr text:nth-child(1) {
		color: #eb2b2b;
		font-weight: bold;
	}

	.goods_price {
		display: flex;
		padding: 4px 8px;
		flex-direction: row;
		align-items: center;
	}

	.goods_title {
		padding: 4px 12px;
	}

	.product_img image {
		width: 100%;
		height: 12em;
	}

	.goods_title {
		padding: 4px 12px;
	}

	.product_img image {
		width: 100%;
		height: 12em;
	}

	.product_content {
		background-color: white;
		margin: 1px 2px;
	}

	.product_item {
		width: 50%;
		/* height: 15vh; */
		/* background-color: white;	 */
	}

	.activity_product {
		display: flex;
		flex-direction: row;
		padding: 2px 4px;
		width: 100%;
		flex-wrap: wrap;
	}

	.attr_item {
		display: flex;
		flex-direction: row;
	}

	.picker_check_box {
		padding-right: 45rpx;
	}

	.check_box::after {
		font-family: cuIcon;
		display: block;
		content: "\E6A3";
		position: absolute;
		font-size: 34rpx;
		color: #8799a3;
		line-height: 100rpx;
		width: 60rpx;
		text-align: center;
		/* top: 0;
		bottom: 0; */
		right: 15rpx;
		margin: auto;
	}

	.cu-form-group .title {
		margin-left: 0;
	}

	.title {
		margin: 8px 16px;
		padding-left: 0.5em;
	}

	.cu-item {
		font-size: 0.9em;
	}

	.text-base {
		color: #4674C1;
	}
</style>
