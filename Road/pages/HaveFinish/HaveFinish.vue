<template>
	<view style="display: flex;flex-direction: column;" >
		
		<view class="group" v-for="(item,index) in data" @click="con">
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
			<view style="font-size: 18px;color: aqua;margin-top: 10px;margin-bottom: 10px;display: flex;flex-direction: row;justify-content: center;align-items: center;">
				<image src="../../static/image/complete.png" style="width: 22px;" mode="widthFix"></image>
				<text style="margin-left: 7px;">已完成</text>
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
			// uni.clearStorageSync();
			this.data = uni.getStorageSync('AllTrack');
			this.data[1].road_name = '文化西路180号南侧180米左右'
		},
		methods: {
			con(){
				uni.navigateTo({
					url:'/pages/detail/detail'
				})
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
		min-height: 240px;
		margin-top: 10px;
		border-radius: 10px;
		align-items: center;
	}
</style>
