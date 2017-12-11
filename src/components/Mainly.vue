<template>
	<div class="hello">
		<el-row>
			<el-col class='left' :span='3'>
				<p>后台管理系统</p>
			</el-col>
			<el-col class='right' :span='21'>
				<el-menu theme="dark" :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect" >
				  
				  <el-submenu index="2" class='fr'>
				    <template slot="title">您好,{{info}}</template>
				    <router-link to='/info'><el-menu-item index="2-1">个人信息</el-menu-item></router-link>
				    <router-link to='/passward'><el-menu-item index="2-1">密码更新</el-menu-item></router-link>
				    <router-link to=''><el-menu-item index="2-1" @click='exit'>退出登录</el-menu-item></router-link>
				    
				    <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
				    <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
				  </el-submenu>
				 
				</el-menu>
				<el-dialog
					  title="提示"
					  :visible.sync="dialogVisible"
					  size="tiny"
					  >
					  <span>确认退出系统吗?</span>
					  <span slot="footer" class="dialog-footer">
					    <el-button @click="handle(0)">取 消</el-button>
					    <el-button type="primary" @click="handle(1)">确 定</el-button>
					  </span>
					</el-dialog>
			</el-col>
		</el-row>
		
	
	<el-row>
		<el-col class='left-1' :span='3' :collapse="isCollapse">
				
				<el-menu theme="dark" default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
					<div class="Collapse" :class='{trans:isxuan}' @click='change'><i class="el-icon-d-arrow-right"></i></div>
					
					 <el-menu-item index="1">
					    <i class="el-icon-message"></i>
					    <router-link to='/' tag='span' slot='title'>首页</router-link>
					    <!--<span slot="title">首页</span>-->
					  </el-menu-item>
				  
				  <el-submenu index="2">
				    <template slot="title">
				      <i class="el-icon-menu"></i>
				      <router-link to='/user/userlist' tag='span' slot ='title'>用户管理</router-link>
				      <!--<span slot="title">用户管理</span>-->
				    </template>
				    
				    	
					    <el-menu-item index="2-1"><router-link to='/user/userlist' class='userlist'>用户列表</router-link></el-menu-item>
					   
				   
				    
				  </el-submenu>
				  <el-submenu index="3">
				    <template slot="title">
				      <i class="el-icon-setting"></i>
				      <router-link to='/article/alist' tag='span' slot='title'>文章管理</router-link>
				      <!--<span slot="title">文章管理</span>-->
				    </template>
				    <router-link to='/article/alist'><el-menu-item index="3-1">文章列表</el-menu-item></router-link>
				    <router-link to='/article/aclass'><el-menu-item index="3-2">文章类名</el-menu-item></router-link>
					    
					    <!--<el-menu-item index="3-2">选项2</el-menu-item>-->
				      	<!--<el-menu-item index="3-3">选项3</el-menu-item>-->
				   
				    
				  </el-submenu>
				  
				  
				</el-menu>
		</el-col>
		<el-col class='right-1' :span='21'>
			<section class="content-container">
			<router-view></router-view>
			</section>
		</el-col>
	</el-row>
	
   	
   	
	</div>
	
</template>

<script>
	

	
	if(sessionStorage.getItem('userinfo')){
		var info = JSON.parse(sessionStorage.getItem('userinfo')).userName;
}
	import EventBus from '../router/bus.js'
		console.log(EventBus)
	export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isCollapse: false,
        isxuan:false,
        isexit:'',
        dialogVisible: false,
        info,

      };
    },
    created(){
    	EventBus.$on('userinfo',(Text)=>{
    		this.info = Text;
			console.log(Text)
    	});
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
       handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      change(){
      	this.isxuan = !this.isxuan;
      	this.isCollapse = !this.isCollapse;
      },
      exit(){
//    	var x = confirm('确认退出吗?');
//    	if(x){
//    		this.isexit = '/exit';
//    		
//    	}
      	this.dialogVisible = true;
      }, 
      handle(a) {
       if(a){
//     	this.isexit = '/exit';
       	location.href='/exit'
       	this.dialogVisible = false;
       }else{
       	this.dialogVisible = false;
       }
      }
    },
    compouted:{
    	
    }
  }
</script>

<style scoped="scoped">
	
	*{
		margin: 0;
		padding: 0;
	}
	body{
		margin: 0 !important;
		padding: 0;
	}
	.content-container{
		background: #fff;
	    -webkit-box-flex: 1;
	    /*-ms-flex: 1;*/
	    flex: 1;
	    overflow-y: auto;
	}
	.Collapse{
		color: #fff;
		font-size: 20px;
		background-color: #324158;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.trans{
		transform: rotate(180deg);
	}
	.Collapse:hover{
		background-color: rgba(255,255,255,0.1);
		/*opacity: 0.2;*/
	}
	.el-menu-vertical-demo{
		/*width: 100% !important;*/
	}
	.userlist{
		color: #00adff;
		text-decoration: none;
	}
	.left{
		background-color: #324157;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #fff;
		font-size: 20px;
	}
	.left p{
		margin: 0;
	}
	.left-1{
		height: 800px;
	}
	.left-1 ul{
		height: 800px;
	}
	.el-menu--dark .fr{
		float: right;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100% !important;
    min-height: 400px;
  }

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 800px;
  }
  .el-button{
  	width: 50px;
  	height: 30px;
  }
  .right-1{
  	height: 800px;
  	overflow-y :auto
  }
</style>