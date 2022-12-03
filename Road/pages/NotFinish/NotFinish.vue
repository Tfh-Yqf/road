<template>
	<view style="display: flex;flex-direction: column;">
		
		<view class="group" v-for="(item,index) in data">
			<view style="display: flex;flex-direction: row;align-items: center;">
				<view style="width: 100px;margin-left: 10px;height: 100px;">
					<image :src="item.image[0].url" mode="aspectFill" style="width: 100px;height: 100px;"></image>
				</view>
				<view style="margin-top: 10px;display: flex;flex-direction: column;font-size: 14px;margin-left: 10px;">
					<text>标题：{{item.title}}</text>
					<text>纬度：{{item.location.latitude}} </text>
					<text>经度：{{item.location.longitude}}</text>
					<text>道路名：{{item.road_name}}</text>
				</view>
			</view>
			<view style="width: 98%;height: 100px;margin-left: 1%;">
				<map style="width: 100%;height: 100px;"
				 :latitude="item.location.latitude" 
				 :longitude="item.location.longitude" 
				 :markers="item.covers"
				 ></map>
			</view>
			<view style="font-size: 18px;color: red;margin-top: 10px;margin-bottom: 10px;display: flex;flex-direction: row;justify-content: center;align-items: center;">
				<image src="../../static/image/fail.png" style="width: 22px;" mode="widthFix"></image>
				<text style="margin-left: 7px;">未完成</text>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;margin-right: 0px;align-items: center;height: 50px;justify-content: center;">
				
				<button @click="jumpindex()" type="primary" size="mini">去完成</button>
				<!-- <text>去完成</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[]
			}
		},
		mounted() {
			this.data = uni.getStorageSync('AllTrack');
			this.data[0].title='任务3';
			this.data[1].title='任务4';
			
		},
		methods: {
			jumpindex(){
				uni.navigateTo({
					url:'/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background-color: #efefef;
	}
	
	.group{
		width: 90%;
		margin-left: 5%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		min-height: 270px;
		margin-top: 10px;
		border-radius: 10px;
		align-items: center;
	}
</style>
