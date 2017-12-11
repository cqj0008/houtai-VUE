<template>
<div id="passward">
	<div class="mbx">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to='{path:"/passward"}'>修改密码</el-breadcrumb-item>
		  <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
		  <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
		</el-breadcrumb>
	</div>
	<div class='fromdan'>
		<el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			
		  <el-form-item label="原密码" prop="age">
		    <el-input v-model.number="ruleForm2.age"></el-input>
		  </el-form-item>
			
		  <el-form-item label="新密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认新密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
		  </el-form-item>
		  
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</div>
</template>

<script>
	 export default {
	 	name:'passward',
	    data() {
	      
	      return {
	        ruleForm2: {
	          pass: '',
	          checkPass: '',
	          age: ''
	        },
	        
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	             this.$message('该功能暂未开发!!!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
	  }
</script>

<style scoped="scoped">
	.mbx{
		padding: 10px;
	}
</style>