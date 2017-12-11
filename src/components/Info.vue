<template>
	
<div id="info">
	<div class="mbx">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to='{path:"/info"}'>个人信息</el-breadcrumb-item>
		  <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
		  <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
		</el-breadcrumb>
	</div>
	<div class='fromdan'>
		<span> &nbsp;&nbsp;账号</span>
		<el-input
		  placeholder="admin"
		  v-model="input1"
		  :disabled="true">
		</el-input>
	</div>
	<div class="footer">
		<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item
		  	label-width='54px'
		    label="昵称"
		    prop="nicheng"
		    :rules="[
		      { required: true, message: '昵称不能为空'},
		      { type: 'string', message: '年龄必须为数字值'}
		    ]"
		    >
		    <el-input type="nicheng" v-model="numberValidateForm.nicheng" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item
		    label="邮箱"
		    label-width='54px'
		    prop="email"
		    :rules="[
		      { required: true, message: '邮箱不能为空'},
		      { type: 'string', message: '年龄必须为数字值'}
		    ]"
		  >
		    <el-input type="email" v-model="numberValidateForm.email" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		  	<!--<el-button  @click="submitForm">成功</el-button>-->
		    <el-button :plain="true" type="primary" @click="submitForm('numberValidateForm')">修改并提交</el-button>
		    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
		
	
</div>
</template>

<script>
	import EventBus from '../router/bus.js';
	var info = JSON.parse(sessionStorage.getItem('userinfo'));
	console.log(info);
	 export default {
	 	name:'info',
	 	mounted(){
//			EventBus.$emit('userinfo',this.numberValidateForm.nicheng);
		},
	     data() {
		      return {
		      	input1:'admin',
		      	info,
		        numberValidateForm: {
			        nicheng:info.userName,
			        email: 'wangyi@163.com'
		        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//          alert('submit!');
			EventBus.$emit('userinfo',this.numberValidateForm.nicheng);
			var userInfo = {
			userName:this.numberValidateForm.nicheng,
			pwd:this.info.pwd,
			email:this.numberValidateForm.email
		};
		sessionStorage.setItem('userinfo',JSON.stringify(userInfo));
		this.$message({
          message: '恭喜你，修改成功',
          type: 'success',
          duration: 2000
        });
			
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      
         
////	            that.$message({
////	                  message: "修改成功！",
////	                  type: 'success',
////	                  duration: 2000 //默认3s太长
////	            });
		
       },
     
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       
    }
}
</script>

<style scoped="scoped">
	.mbx{
		padding: 10px;
	}
	.footer , .fromdan{
		width: 1420px;
		padding: 30px 30px 0 ;
		position: relative;
		
	}
	#info .fromdan span{
		display: inline-block;
		width: 50px;
		position: absolute;
		left: 35px;
		top: 35px;
	}
	#info .fromdan .el-input{
		width: 100%;
		/*float: right;*/
		margin-left: 54px;
		display: inline-block;
	}
	#info .fromdan .el-input input{
		width: 100%;
	}
	#info .el-form-item .el-form-item__label{
		width: 50px !important;
	}
	#info .el-form-item{
		padding: 0;
	}
	#info .el-form-item .el-input{
		padding: 0 0 30px;
	}
	/*#info .el-form-item__content{
		margin-left: 54px !important;
	}*/
	.el-button--primary{
		background-color: #00ADFF;
		color: #fff;
	}
	#info .el-button {
		width: 150px;
		height: 50px;
		line-height: 50px;
		padding: 0;
	}
</style>