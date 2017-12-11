<template>
	<div class="admin">
		<div class='modal'>
			
				<p class='title'>系统登录</p>
				
				<div class="inshu">
					<el-input v-model="acount.admin" placeholder="请输入用户名"></el-input>
					<el-input v-model="acount.pwd" placeholder="请输入密码" type='password'></el-input>
				</div>
				
				<div class='footer'>
					<el-checkbox v-model="checked">记住密码</el-checkbox>
					<el-button type="primary" :plain="true" @click='handelLogin'>登录</el-button>
					
					
				</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'admin',
		data(){
			return{
				acount:{
					admin:'admin',
					pwd:'123456',
				},
				
				checked:true
			}
		},
		props:{
				
		},
		methods:{
			handelLogin(){
				//将用户信息用对象的形式存储起来
				var userInfo = {
					userName:this.acount.admin,
					pwd:this.acount.pwd
				};
				//存储到sessionStorage里面,调用setItem的方法,要以字符串的方式穿进去,所以调用JSON.stringify()的方法;对象转字符串
				sessionStorage.setItem('userinfo',JSON.stringify(userInfo));
				//跳转到/路径下
				this.$router.push('/');
				this.$message({
		          message: '恭喜你，登录成功',
		          type: 'success',
		          duration: 2000
		        });
			},
		},
	}
</script>

<style scoped="scoped">
	.el-button--primary{
		background-color: #00ADFF;
		color: #fff;
	}
	.modal{
			width: 500px;
			margin: 200px auto;
			box-shadow: 1px 1px 5px 5px #ccc;
			border-radius: 10px;
			background-color: #fff;
			overflow: hidden;
			/*text-align: center;*/
			padding: 30px;
		}
		.modal .title{
			font-size: 20px;
			font-weight: bold;
			/*text-indent: 20px;*/
			text-align: center;
			width: 100%;
			height: 30px;
			line-height: 30px;
			/*margin-top: 30px;*/
		}
		.modal .main{
			width: 100%;
			height: 100px;
			list-style: none;
			
		}
		.modal .footer{
			width: 100%;
			/*height: 50px;*/
			line-height: 50px;
		}
		.modal .footer button{
			width: 300px;
			display: block;
			/*height: 30px;*/
			/*border-radius: 5px;*/
			/*border: 0px;*/
			/*float: right;*/
			margin: 0 auto;
			text-align: center;
		}
		.modal .footer .el-checkbox{
			margin-left: 50px;
		}
		.inshu{
			width: 400px;
			height: 150px;
			margin: 0 auto;
		}
		.inshu .el-input{
			margin-top: 30px;
		}
</style>