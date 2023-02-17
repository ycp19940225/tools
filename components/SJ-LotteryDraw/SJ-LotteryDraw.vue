<template>
	<view class="lottery_container">
		<view class="grid_wrap">
			<view class="lottery_wrap">
				<ul class="lottery_grid">
					<li v-for="(item, index) in grid_info_arr" :class="{ active: current_index == index }" :key="index"
					  :data-index="index">
						<image class="grid_img" mode='aspectFit' :src="item.logo" alt="">
							{{item.name}}
					</li>
					<li @click="luck_draw" data-on="draw">
						抽奖
					</li>
				</ul>
			</view>
			
		</view>
		<!-- 抽奖完成弹出的窗口 -->
		<!-- <view class="lottery_finish_wrap">
			
		</view> -->
	</view>

</template>

<script>
	import LotteryDraw from './SJ-LotteryDraw.js';
	let grid_info = [{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "手机"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "零食包"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "口红"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "谢谢参与"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "压缩饼干"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "水杯"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "QQ糖"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "耳机"
		},
		{
			logo: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			text: "谢谢参与"
		},
	];
	export default {
		data() {
			return {
				current_index: -1,
				isDoing:false
			};
		},
		props: {
			grid_info_arr: {
				type: Array,
				default: function() {
					return grid_info
				}
			},
		},
		onLoad() {
		},

		methods: {
			luck_draw(event) {
				let index = event.currentTarget.dataset.on;
				let that = this;
				let _this = this;
				console.log(that.isDoing)
				// if(that.isDoing == true){
				// 	return false;
				// }
				// that.isDoing = true;
				console.log(that.isDoing,1111)
				if (index == 'draw') {
					// 点击抽奖之后知道获奖位置，修改父组件中lottery_draw_param的值
					this.$emit('get_winingIndex', function(res){
						console.log(res);
						let lottery_draw_param = res;
						console.log(lottery_draw_param)
						let win = new LotteryDraw({
								domData: that.grid_info_arr,
								...lottery_draw_param
							},
							function(index, count) {
								that.current_index = index;
								console.log()
								if (lottery_draw_param.winingIndex == index && lottery_draw_param.totalCount == count) {
									that.$emit('luck_draw_finish', that.grid_info_arr[index])
									// that.isDoing = false;
									_this.$tool.hideLoading();
								}
							}
						);
					});
					
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	@import './SJ-LotteryDraw.scss';
</style>
