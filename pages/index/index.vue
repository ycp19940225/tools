<template>
	<view>
		<basics v-if="PageCur=='basics'"></basics>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'basics'
			}
		},
		onShareAppMessage(res) {
		    return {
		      title: '高加索国际',
		      path: '/pages/index/index'
		    }
		},
		methods: {
			NavChange: function(e) {
				console.log(e.currentTarget.dataset.cur)
				this.PageCur = e.currentTarget.dataset.cur
			},
		}
	}
</script>

<style>

</style>
