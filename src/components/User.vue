<template>
	<div class="hello">
		<!--<h1>这是用户user</h1>-->	
   	<!--<router-link to='/user/userlist'>用户列表页</router-link>-->
   	<div class='mbx'>
   		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to='{path:"/user/userlist"}'>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
   	</div>
   		<div class='inputk'>
   			<el-input v-model="inputs" placeholder="姓名"></el-input>
   			<el-button type="primary" @click='selectArr'>查询</el-button>
   		</div>
   		
   		<div class="tablek">
   			
		    <el-table
			    :data="filterArr"
			    v-loading='loading'
			    :border='false'
			    style="width: 100%"
			    :default-sort = "{prop: 'date', order: 'descending'}"
			    >
			    <el-table-column
			      type="index"
			      width="60">
			    </el-table-column>
			    
			    <el-table-column
			      prop="name"
			      label="姓名"
			      sortable
			      width="150">
			    </el-table-column>
			    
			    <el-table-column
			      prop="sex"
			      label="性别"
			      sortable
			      width="150"
			      :formatter='formatSex'>
			    </el-table-column>
			    
			    <el-table-column
			      prop="age"
			      label="年龄"
			      sortable
			      width="150">
			    </el-table-column>
			    
			    <el-table-column
			      prop="birth"
			      label="生日"
			      sortable
			      width="180">
			    </el-table-column>
			    
			    <el-table-column
			      prop="addr"
			      label="地址"
			      sortable
			      >
			    </el-table-column>
			  </el-table>
   		</div>
   	<router-view></router-view>
	</div>
	
</template>

<script>
//	import Users from '../mock/user'
	import axios from 'axios'
//	let {Users: user} = Users;
//	console.log(user)
	export default{
		name:'user',
		data(){
			return{
				inputs:'',
				user:[],
				loading:false,
				isclick:false,
//				trueArr:this.user,
				 tableData: [{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        },{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        },{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        },{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        },{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        },{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        },{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        },{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄',
			          sex:'男',
			          age:18
			        }, {
			          date: '2016-05-04',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1517 弄',
			          sex:'男',
			          age:18
			        }, {
			          date: '2016-05-01',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1519 弄',
			          sex:'男',
			          age:18
			        }, {
			          date: '2016-05-03',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1516 弄',
			          sex:'男',
			          age:18
			        }]
			}
		},
		mounted(){
			this.getUser();
		},
		methods: {
		getUser(){
				this.loading  = true;
				axios.get('/api/userlist').then((res)=>{
					this.user = res.data.users;
					this.loading = false
				})
			},
	    formatSex(row, column) {
		        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		    },
	    selectArr(){
//	      	console.log(this.inputs)
//			var y = this.user; 
//				if(this.inputs){
//					var x = this.user.filter((e)=>{
//	//	      		console.log(this.inputs)
//		      		return e.name.indexOf(this.inputs) != -1 || e.addr.indexOf(this.inputs) != -1;
//		      		});
//		      		this.user = x;
//				}else{
//					this.user = y
//				}
//				this.user = this.filterArr
//				this.isclick = true;
	      		this.inputs='';
//	      		console.log(x);
	      }
	    },
	    computed:{
	    	filterArr(){
	    		
	    		if(!this.inputs){
//	    			this.isclick = false
	    			return this.user;
	    		}else{
	    			return this.user.filter((e)=>{
	//	      		console.log(this.inputs)
		      			return e.name.indexOf(this.inputs) != -1 || e.addr.indexOf(this.inputs) != -1;
		      		});
	    		}
	    	}
	    }
	}
</script>

<style>
	.mbx{
		padding: 20px;
		/*font-size: 18px;*/
	}
	.inputk{
		width: 100%;
		margin-left: 20px;
	}
	.el-input, .el-input__inner{
		width: 200px;
		margin-right:20px ;
	}
	.tablek{
		/*padding: 5px;*/
		width: 1520px;
		margin-left: 10px;
		margin-top: 50px;
	}
	.el-table .cell{
		/*width: 50px;*/
	}
	
</style>