<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt" style="padding: 0.2em;">
			<view class="uni-list">
				<checkbox-group style="margin-left: 1em;" @change="openItem">
					<label class="check_box" v-for="(itemData,index) in productData" :key="index" :data-id="index">
						<view style="display: flex;flex-direction: row;justify-content: space-between;">
							<view style="display: flex;flex-direction: row;text-align: center;align-items: center;">
								<checkbox :value="itemData.id" :checked="itemData.checked" style="transform:scale(0.9)" />
								<view style="padding-left: 0.5em;">{{itemData.name}}</view>
							</view>
							<view style="margin-right: 1em;">
								<text style="color: #FC8726;" class="text-price" v-if="itemData.price">{{itemData.price}}</text>
							</view>
						</view>
						<view v-for="(attr,key) in itemData.item" :key="key" v-if="itemData.item_open">
							<view style="margin-top: 1em;">{{ attr.item_name }}</view>
							<view class="attr_item" style="margin-left: 3em;">
								<radio-group @change="radioChange" :id="itemData.id" :data-key="key">
									<label class="uni-list-cell uni-list-cell-pd" v-for="(attrItem, k) in attr.item_value" :key="k">
										<view style="display: flex;flex-direction: row;text-align: center;align-items: center;">
											<radio :value="attr.item_name + '::' +attrItem" :checked="k === current" style="transform:scale(0.9)" />
											<view style="margin-left: 1em;">{{attrItem}}</view>
										</view>
									</label>
								</radio-group>
							</view>
						</view>
					</label>
				</checkbox-group>
				<button @click="closePopup" class="close" style="bottom: 0;position: fixed;
    height: 3rem;
    line-height: 3rem;
    font-size: 16px;
    color: #ffffff;
    background: #4674C1;
    width: 100%;
	left: 0;
    text-align: center;">确定</button>
			</view>
		</view>
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
				res: {},
				productData: [{
						"name": "VITARGO唯它高国家队专用 德国原产",
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
						"name": "VITARGO唯它高",
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

			};
		},
		mounted() {

		},
		onLoad(option) {
			// console.log(option)
			// option = {
			// 	product_id: "17"
			// };
			let _this = this;
			_this.getPageData(option);
		},
		methods: {
			radioChange: function(evt) {
				let value = evt.target.value,
					id = evt.currentTarget.id,
					key = evt.currentTarget.dataset.key;
				let data = this.productData,
					item;
				for (let i = 0; i < data.length; i++) {
					item = data[i];
					if (item.id == id) {
						this.$set(item.item[key], 'checked', value)
						break;
					}
				}
				console.log(item)
				//计算属性价格
				this.calculate_price();
			},
			calculate_price() {
				let data = this.productData,
					itemData, checked_attr = [],
					checked_string, item, price;
				for (let i = 0; i < data.length; i++) {
					item = data[i];
					checked_attr = [];
					if (item.item_open == true && item.checked == true) {
						itemData = item.item;
						for (let j = 0; j < itemData.length; j++) {
							if (itemData[j].checked != undefined) {
								checked_attr.push(itemData[j].checked)
							}
						}
						if (checked_attr != undefined && checked_attr.length > 0) {
							checked_string = checked_attr.join(';;')
							if (checked_string in item.list) {
								price = item.list[checked_string];
								this.$set(item, 'price', price.price_selling)
								this.$set(item, 'checked_attr', checked_string)
							}
						}
					}
				}
			},
			getPageData(data) {
				var _this = this
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.$http.post('/api/Activity/getGoodsAttr', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.productData = data;
						uni.hideLoading();
					}
				}).catch(err => {
					console.log(err);
				})
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
				_this.pickerDetail.push(groupPicker)
				// _this.calculatePrice();
				this.$refs.detail.open();
				this.hide = false;
			},
			openItem(e) {
				var items = this.productData,
					values = e.detail.value;
				console.log(values)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id + '')) {
						this.$set(item, 'checked', true)
						this.$set(item, 'item_open', true)
					} else {
						this.$set(item, 'checked', false)
						this.$set(item, 'item_open', false)
					}
				}
				//计算属性价格
				this.calculate_price();
				// let chcek = this.productData[index].item_open;
				// this.$set(this.productData[index], 'item_open', chcek == true ? false : true);
				// console.log(this.productData[index], index)
			},
			tabSelect() {
				console.log(1)
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				//判断是否有选择了产品 未选择属性的
				var items = this.productData,totle_price = 0, count = 0;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if((item.check== true || item.item_open == true) && item.price == undefined){
						console.log(item)
						uni.showToast({
							title: '请选择' + item.name +'的属性！',
							icon: 'none'
						})
						return false;
					}
					if((item.check== true || item.item_open == true) && item.price != undefined){
						count++;
					}
				}
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.product.goods = items; //修改上一页data里面的
				if(count > 0){
					prevPage.$vm.product.attr_checked = count;
				}
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1,
					function(){
						prevPage.calculatePrice();
					}
				});
			}
		}
	}
</script>

<style>
	.check_box {
		padding: 1em;
		margin: 1em;
	}

	.product_detail {
		display: flex;
		padding: 4px 8px;
		background-color: #fff;
	}

	.attr_item {
		display: flex;
		flex-direction: row;
	}
</style>
