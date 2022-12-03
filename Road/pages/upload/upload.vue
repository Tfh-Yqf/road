<template>
	<view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 100%;align-items: center;">
			
			<view class="phone">
				<input disabled="true" style="height: 100rpx;" >
				<text style="font-size: 13px;">道路裂纹检测系统</text>

				
				<view  style="display: flex;flex-direction: column;width: 100%;">

					
					<view style="width: 100%;display: flex;flex-direction: column;margin-top: 60rpx;">
						<view style="display: flex;flex-direction: row;align-items: center;">
							<text style="font-size: 13px;flex-shrink: 0;">标 题:</text>
							<view style="width: 100%;margin-top: 15rpx;margin-left: 10px;">
								<input class="input_group" placeholder="文化西路与山大路交汇处东20M" v-model="title"/>
							</view>
						</view>


						<view style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
							<text style="font-size: 13px;flex-shrink: 0;">位 置:</text>
							<view style="width: 70%;margin-top: 15rpx;margin-left: 10px;flex-shrink: 0;height: 150px;">
								<map style="width: 100%;height: 100%;"
									 :latitude="location.latitude" 
									 :longitude="location.longitude" 
									 :markers="covers">
								</map>
							</view>
							<view @click="jump_dingwei()" class="button_login" style="margin-left: 10px;width: 180px;border-radius: 10px;">修改</view>
						</view>
						
						<view style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
							<text style="font-size: 13px;flex-shrink: 0;">经 度:{{location.longitude}}</text>
							<text style="font-size: 13px;flex-shrink: 0;margin-left: 20px;">纬 度:{{location.latitude}}</text>
						</view>
						
						<view style="display: flex;flex-direction: row;align-items: center;margin-top: 10px;">
							<text style="font-size: 13px;flex-shrink: 0;">车道名:</text>
							<view style="width: 100%;margin-top: 15rpx;margin-left: 10px;">
								<input class="input_group" placeholder="" v-model="road_name"/>
							</view>
						</view>
						
						<view style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
							<text style="font-size: 13px;flex-shrink: 0;">详 情：</text>
							<view style="width: 100%;">
								<textarea  class="text_filed" placeholder="无" v-model="detail"></textarea>
							</view>
						</view>
						<br><hr>
						
						<view style="display: flex;flex-direction: row;align-items: center;margin-top: 10px;">
							<uni-file-picker 
								v-model="image" 
								fileMediatype="image" 
								mode="grid" 
								limit="20"
							/>
						</view>


						<view style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;justify-content: space-between;">
							<view @click="huancun()" class="button_login" style="width: 100px;">缓 存</view>
							<view @click="add()" class="button_login" style="">确定添加</view>
						</view>
						

					</view>
				</view>
				
				<uni-popup ref="alertDialog" type="dialog">
					<uni-popup-dialog type="success" cancelText="关闭" confirmText="加载" title="提示" content="你有缓存是否要载入" @confirm="dialogConfirm"
						@close="dialogClose"></uni-popup-dialog>
				</uni-popup>

			</view>
			
			
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:'',
				title:'',
				location:{
					address:'',	
					latitude:0,
					longitude:0
				},
				road_name:null,
				covers:[{}],
				location_interval:null,
				image:[]
			}
		},
		onLoad() {
			this.getloc();
		},
		mounted() {
			this.loadhuancun();
		},
		methods: {
			dialogConfirm(){
				this.$refs.alertDialog.close();
				var temp = uni.getStorageSync('huancun');
				this.title = temp.title;
				this.detail = temp.detail;
				this.location = temp.location;
				this.road_name = temp.road_name;
				this.image = temp.image;
			},
			dialogClose(){
				this.$refs.alertDialog.close();
			},
			loadhuancun(){
				if(uni.getStorageSync('huancun')!=false){
					this.$refs.alertDialog.open();
				}
			},
			add(){
				if(this.title==''){
					uni.showToast({
						title:'标题未填写',
						icon:'none'
					});
					return;
				}
				if(this.image.length==0){
					uni.showToast({
						title:'图片未上传',
						icon:'none'
					});
					return;
				}
				
				var location = {...this.location};
				delete location.address;
				var temp = {
					detail:this.detail,
					title:this.title,
					location,
					road_name:this.road_name,
					image:this.image,
					covers:this.covers
				}
				// uni.showLoading();
				uni.request({
					url:this.upload_url+'/data',
					method:'POST',
					data:temp,
					complete: (res) => {
						console.log(res);
						uni.hideLoading();
						if(res.data.code==0){
							uni.showToast({
								title:'上传成功!',
								icon:'none'
							});
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'error'
							});
						}
					}
				})
				var alltrack = [];
				if(uni.getStorageSync('AllTrack')!=false){
					var alltrack = uni.getStorageSync('AllTrack');
				}
				
				alltrack.push(temp);
				uni.setStorageSync('AllTrack',alltrack);
				uni.setStorageSync('huancun',false);
				uni.showToast({
					title:'添加成功',
					icon:'none'
				})
			},
			huancun(){
				if(this.title==''){
					uni.showToast({
						title:'标题未填写',
						icon:'none'
					});
					return;
				}
				if(this.image.length==0){
					uni.showToast({
						title:'图片未上传',
						icon:'none'
					});
					return;
				}
				var temp = {
					detail:this.detail,
					title:this.title,
					location:this.location,
					road_name:this.road_name,
					image:this.image
				}
				
				uni.setStorageSync('huancun',temp);
				uni.showToast({
					title:'缓存成功',
					icon:'none'
				})
			},
			getloc(){
				var that = this;
				
				
				// this.location_interval = setInterval(function(){
					uni.getLocation({
						type:'gcj02',
						geocode:true,
						success: (res) => {
							console.log(res);
							
							if(that.road_name==null){
								that.location = res;
								that.road_name = res.address.city +res.address.district+res.address.street+res.address.streetNum+res.address.poiName;
							}
							var temp = {
								latitude:that.location.latitude,
								longitude:that.location.longitude,
								iconPath: '/static/loc.png'
							};
							that.covers[0]=temp;
							
						}
					})
				// },2000);
			
				
			},
			jump_dingwei(){
				uni.chooseLocation({
					success: (res) => {
						console.log(res);
						this.location = res;
						this.road_name = res.address.city +res.address.district+res.address.street+res.address.streetNum+res.address.poiName;
						var temp = {
							latitude:this.location.latitude,
							longitude:this.location.longitude,
							iconPath: '/static/loc.png'
						};
						this.covers[0]=temp;
					}
				})
			},

		}
	}
</script>

<style>
	hr{
		border: thin solid #c8c8c8;
	}
	input::input-placeholder{
		color:rgba(30, 30, 30, 1.0);
	}

	page{
		width: 100%;
		height: 100%;
		
	}
	
	.windows{
		margin-left: 14%;
		width: 27.7%;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}
	.phone{
		margin-left: 5%;
		width: 93%;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	
	.timedown{
		width: 15%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: thin solid #9e896a;
		border-radius: 36px;
		height: 30px;
		margin-left: 15rpx;
		color: rgba(158, 137, 106, 1);
	}
	
	.button_login{
		width: 50%;
		height: 40px;
		opacity: 1;
		border-radius: 10px;
		background: #6306ea;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
		color:#fff;
	}
	
	.dingwei{
		background: rgba(158, 137, 106, 1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
		color:#fff;
	}
	.login_group{
		width: 260px;
		height: 44.25px;
		opacity: 1;
		border-radius: 33px;
		background: rgba(248, 237, 221, 1);
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 45rpx;
		font-size: 13px;
	}
	
	.login_s{
		margin-left: 13px;
		/* top: 203px; */
		width: 110px;
		height: 30px;
		opacity: 1;
		border-radius: 33px;
		background: rgba(158, 137, 106, 1);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #FFF;
		font-size: 13px;
	}
	
		
	.login{
		margin-left: 13px;
		/* top: 203px; */
		width: 110px;
		height: 30px;
		opacity: 1;
		border-radius: 33px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: rgba(158, 137, 106, 1);
		font-size: 13px;
	}
	
	.youxiang{
		font-size: 16px;
	}
	
	.input_group{
		width: 100%;
		height: 40px;
		opacity: 1;
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		border: 0.5px solid rgba(158, 137, 106, 1);            
		color: rgba(52, 52, 52, 1.0);
		font-size: 13px;
	}
	
	.text_filed{
		width: 100%;
		min-height: 40px;
		opacity: 1;
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		border: 0.5px solid rgba(158, 137, 106, 1);            
		color: rgba(52, 52, 52, 1.0);
		font-size: 13px;
	}
</style>
