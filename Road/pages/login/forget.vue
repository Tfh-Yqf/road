<template>
	<view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 100%;align-items: center;">

			
			<view class="phone">
				<input disabled="true" style="height: 300rpx;" />
				<text style="font-size: 13px;">道路裂纹检测系统</text>
				
				<view class="login_group" >
					<view @click="change_login(true)" :class="{'login_s':(is_login),'login':(!is_login)}">
						<text>邮箱找回</text>
					</view>
					<view @click="change_login(false)" :class="{'login_s':(!is_login),'login':(is_login)}">
						<text>密码找回</text>
					</view>
				</view>
				
				<view v-if="is_login" style="display: flex;flex-direction: column;width: 100%;">
					<view style="width: 100%;text-align: center;margin-top: 45rpx;">
						<text style="font-size: 13px;">
							我们专注于提供免费的道路裂纹检测系统
						</text>	
					</view>

					
					<view style="width: 100%;display: flex;flex-direction: column;margin-top: 60rpx;">
						<text style="font-size: 13px;">邮 箱</text>
						<view style="width: 100%;margin-top: 15rpx;">
							<input class="input_group" placeholder="请 输 入 您 的 邮 箱" v-model="email"/>
						</view>
						
						<text style="font-size: 13px;margin-top: 50rpx;">验 证 码</text>
						<view class="input_group" style="width: 100%;margin-top: 15rpx;display: flex;flex-direction: row;align-items: center">
							<input style="width: 70%;font-size: 13px;"  placeholder="请 输 入 您 的 验 证 码" v-model="code" maxlength="6"/>
							<view v-if="!is_send" class="fasongemail" @click="send()">
								发送
							</view>
							<view v-else class="timedown">
								{{time_dowm}}
							</view>
						</view>
						
						
						<text style="font-size: 13px;margin-top: 37.5rpx;">新 密 码</text>
						<view style="width: 100%;margin-top: 15rpx;">
							<input class="input_group" placeholder="请 输 入 您 的 密 码" v-model="password" password="true"/>
						</view>
						
						
						<view @click="login()" style="display: flex;flex-direction: row-reverse;width: 100%;margin-top: 97.5rpx;">
							<view class="button_login">重 置</view>
						</view>
					</view>
				</view>
				<view v-else style="display: flex;flex-direction: column;width: 100%;">
					<view style="width: 100%;text-align: center;margin-top: 45rpx;">
						<text style="font-size: 13px;">
							我们专注于提供免费的道路裂纹检测系统
						</text>	
					</view>
					
					<text style="font-size: 13px;margin-top: 60rpx;">邮 箱</text>
					<view style="width: 100%;margin-top: 15rpx;">
						<input class="input_group" placeholder="请 输 入 您 的 邮 箱" v-model="email"/>
					</view>
					
					<text style="font-size: 13px;margin-top: 37.5rpx;">旧 密 码</text>
					<view style="width: 100%;margin-top: 15rpx;">
						<input class="input_group" placeholder="请 输 入 您 的 旧 密 码" v-model="oldpassword" password="true"/>
					</view>
					
					<text style="font-size: 13px;margin-top: 37.5rpx;">新 密 码</text>
					<view style="width: 100%;margin-top: 15rpx;">
						<input class="input_group" placeholder="密码必须大于八位同时包含字母和数字" v-model="password" password="true"/>
					</view>
					

					
					<view @click="register()" style="display: flex;flex-direction: row-reverse;width: 100%;margin-top: 97.5rpx;">
						<view class="button_login">注 册</view>
					</view>
				</view>
				

			</view>
			
			
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_login:true,
				email:'',
				password:'',
				rember_password:true,
				is_send:false,
				time_dowm:60,
				code:'',
				oldpassword:''
			}
		},
		onLoad() {
			var that = this;
		},
		methods: {
			send(){
				if(this.email==''){
					uni.showToast({
						title:'邮箱未填写',
						icon:'none'
					});
					return;
				}
				if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)==false){
					uni.showToast({
						title:'邮箱格式不正确',
						icon:'none'
					});
					return;
				}
				this.is_send=true;
				var that =this;
				setInterval(function(){
					if(that.is_send)	that.time_dowm--;
					if(that.time_dowm==0)	that.is_send=false;
				},1000)
			},
			register(){
				if(this.email==''||this.oldpassword==''||this.password==''){
					uni.showToast({
						title:'未填写完整',
						icon:'none'
					})
					return;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.password)){
					uni.showToast({
						title:'密码必须同时包含字母和数字且大于八位',
						icon:'none'
					})
					return;
				}
			},
			login(){
				if(this.email==''||this.password==''||this.oldpassword){
					uni.showToast({
						title:'未填写完整',
						icon:'none'
					})
					return;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.password)){
					uni.showToast({
						title:'密码必须同时包含字母和数字且大于八位',
						icon:'none'
					})
					return;
				}
			},
			change_login(e){
				this.is_login=e;
			}
		}
	}
</script>

<style>
	input::input-placeholder{
		color:rgba(172, 172, 172, 1);
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
		margin-left: 10%;
		width: 76%;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}
	.fasongemail{
		color: #fff;
		width: 15%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #9e896a;
		border-radius: 36px;
		height: 30px;
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
		height: 38px;
		opacity: 1;
		border-radius: 36px;
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
		border-radius: 40px;
		background: rgba(255, 255, 255, 1);
		padding: 0 0rpx 0 60rpx;
		border: 0.5px solid rgba(158, 137, 106, 1);            
		color: rgba(172, 172, 172, 1);
		font-size: 13px;
	}
</style>
