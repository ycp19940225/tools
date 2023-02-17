<template>
	<view>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" :fixed="true">
			<view class="cu-bar bg-white " style="margin: 0.5em;">
				<view class="action" style="display:flex;flex-direction:row;justify-content:space-around;width:100%">
					<view>
						<text class="cuIcon-title text-green"></text> 当前积分： <text class="text-red">{{userInfo.current_score}}</text>
					</view>
					<view>
						<text class="cuIcon-title text-green"></text> 已邀请人数： <text class="text-red">{{userInfo.share_count}}</text>
					</view>
				</view>
			</view>
			<view style="margin: 0.5em;">
				<view style="background-color: #ddd;padding: 1em;">
					变更记录
				</view>
				<view class="cu-form-group">
					<!-- <view class="title">编号</view> -->
					<view class="title">方式</view>
					<view class="title">时间</view>
					<view class="title">积分</view>
				</view>
				<view class="cu-form-group" v-for="(item,index) in record" :key="index">
					<!-- <view class="title">{{item.order_sn}}</view> -->
					<view class="title">{{item.ruleTitle}}</view>
					<view class="title">{{item.create_time}}</view>
					<view class="title">{{item.score}}<text v-if="item.multiple > 1">({{item.multiple}}倍)</text></view>
				</view>
			</view>
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
				// 下拉刷新的常用配置
				downOption: {
					use: false, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 9 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据...'
					}
				},
				bannerList: {}
			};
		},
		onLoad(option) {
			console.log(option)
			let _this = this;
			_this.getPageData(option);
		},
		methods: {
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
				_this.$http.post('/api/score/getData2?pageNum=' + pageNum + '&pageSize=' + pageSize).then(res => {
					// 接口返回的当前页数据列表 (数组)
					let data = res.data.data
					let curPageData = data.record;
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = data.pageSize;
					// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
					let totalSize = data.totalSize;
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = true; 

					// //设置列表数据
					if (mescroll.num == 1) _this.dataList = []; //如果是第一页需手动置空列表
					_this.record = _this.record.concat(curPageData); //追加新数据

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
				_this.$http.post('/api/score/getData2', data).then(res => {
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
			
		},
	}
</script>

<style>

</style>
