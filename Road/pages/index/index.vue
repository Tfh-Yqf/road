<template>
	<view class="content">
		<view :style="{height:height-70+'px'}" style="width: 100%;z-index: 800;">
			<map style="width: 100%;height: 100%;" 
				 :show-compass="true" 
				 :show-location="true" 
				 :latitude="location.latitude" 
				 :longitude="location.longitude" 
				 :markers="covers">
			</map>
		</view>
		<view class="bottom" style="">

			<text @click="yiwancheng()">已完成</text>
			
			<text @click="choose_image()">上传</text>
			
<!-- 			<view @click="choose_image()" style="display: flex;flex-direction: column;justify-content: center;align-items: center;font-size: 14px;width: 50px;height: 50px;border: 1px solid #ff85f5;border-radius: 50%;">
				<image src="../../static/camera.png" mode="widthFix" style="width: 40px;"></image>
			</view> -->
			
			<text @click="weiwancheng()">未完成</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				location:{
					latitude:37.5317243509391,
					longitude:122.06001152012632
				},
				covers:[{}],
				location_interval:null,
				image:[]
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().screenHeight;
			
			this.getloc();
			
			this.load_task();
			this.load_track();
			
		},
		methods: {
			load_task(){
				
			},
			load_track(){
				if(uni.getStorageSync('AllTrack')!=false){
					
					var temp = uni.getStorageSync('AllTrack');
					for(var i=0;i<temp.length;i++){
						var temp_cover = {
							latitude:temp[i].location.latitude,
							longitude:temp[i].location.longitude,
							iconPath: '/static/dui.png'
						}
						this.covers.push(temp_cover);
					}
				}
			},
			weiwancheng(){
				uni.navigateTo({
					url:'/pages/NotFinish/NotFinish'
				})
			},
			yiwancheng(){
				uni.navigateTo({
					url:'/pages/HaveFinish/HaveFinish'
				})
			},
			choose_image(){
				uni.navigateTo({
					url:'/pages/upload/upload'
				})
			},
			getloc(){
				var that = this;
				this.location_interval = setInterval(()=>{
					uni.getLocation({
						type:'gcj02',
						success: (res) => {
							// console.log(res);
							this.location = res;
							var temp = {
								latitude:this.location.latitude,
								longitude:this.location.longitude,
								iconPath: '/static/loc.png'
							};
							this.covers[0]=temp;
						}
					})
				},2000);
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	.bottom{
		background-color: #8EC5FC;
		background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
		
		width: 100%;
		height: 70px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		border-radius: 10px;
		color: #9c53c4;
		align-items: center;
	}
</style>
