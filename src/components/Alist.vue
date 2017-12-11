<template>
	<div id="alist">
		
		<div class="mbx">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>文章管理</el-breadcrumb-item>
			  <el-breadcrumb-item>文章列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<div class="shuruk">
			<el-input v-model="input" placeholder="书名"></el-input>
			<el-button type="primary">查询</el-button>
			<el-button  @click="dialogFormVisible = true" type="primary">新增</el-button>
			<!-- 新增信息 -->
			<el-dialog title="新增信息" :visible.sync="dialogFormVisible">
			  <el-form :model="numberValidateForm" ref="numberValidateForm" :rules="rules" v-loading='addloading'>
			    <el-form-item
				    label="书名"
				    prop="bookname">
				    <el-input type="bookname" v-model="numberValidateForm.bookname" auto-complete="off"></el-input>
				  </el-form-item>	   
			    <el-form-item
				    label="作者"
				    prop="author">
				    <el-input type="author" v-model="numberValidateForm.author" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item
				    label="出版日期"
				    prop="date" >
				    	<el-date-picker
					      v-model="numberValidateForm.date"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
				  </el-form-item>
				  
				  <el-form-item
				    label="内容详情"
				    prop="details">
				    <el-input
				    	size='mini'
				    	resize='none'
					  type="textarea"
					  :rows="3"
					  placeholder="请输入内容"
					  v-model="numberValidateForm.details">
					</el-input>
			    
				  </el-form-item>

			    <el-form-item>
				    <el-button @click="resetForm('numberValidateForm')">取 消</el-button>
				    <el-button type="primary" @click="submitForm('numberValidateForm')">确 定</el-button>
				</el-form-item>
			  </el-form>
			  
			</el-dialog>
		</div>
		<div class="tablek">
			<el-table
			    ref="multipleTable"
			    :data="article"
			    :border='false'
			    @selection-change='selChange'
			    v-loading='loading'
			    tooltip-effect="dark"
			    style="width: 100%"
			    >
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    
			    
			    
			     <el-table-column
			      type="index"
			      width="60">
			    </el-table-column>
			    
			   
							    
			    <el-table-column prop="details" type="expand">
			      <template scope="details">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="[内容介绍]">
			            <span>{{  details.row.details}}</span>
			          </el-form-item>
			          
			        </el-form>
			      </template>
			    </el-table-column>
			    
			    <el-table-column
			      prop="bookname"
			      label="书名"
			      sortable
			      show-overflow-tooltip>
			    </el-table-column>
			    
			    <el-table-column
			      prop="author"
			      label="作者"
			      sortable
			      width="120">
			    </el-table-column>
			    
			    <el-table-column
			    	prop="date"
			      label="出版日期"
			      sortable
			      width="120">
			      <template scope="scope">{{ scope.row.date }}</template>
			    </el-table-column>
			    
			    <!-- 编辑信息 -->
			    <el-table-column width="200" label="操作">
			      <template scope="scope">
			        <el-button
			          size="small"
			          @click="change(scope.row)">编辑</el-button>
			          <el-button
			          size="small"
			          type="danger"
			          @click='delData(scope.row)'>删除</el-button>
			          <el-dialog title="编辑信息" :visible.sync="dialogEditVisible">
				  <el-form :model="editValidateForm" ref="editValidateForm" :rules="rules" v-loading='editloading'>
				    <el-form-item
					    label="书名"
					    prop="bookname">
					    <el-input type="bookname" v-model="editValidateForm.bookname" auto-complete="off"></el-input>
					  </el-form-item>	   
				    <el-form-item
					    label="作者"
					    prop="author">
					    <el-input type="author" v-model="editValidateForm.author" auto-complete="off"></el-input>
					  </el-form-item>
					  <el-form-item
					    label="出版日期"
					    prop="date" >
					    	<el-date-picker
						      v-model="editValidateForm.date"
						      type="date"
						      placeholder="选择日期"
						      :picker-options="pickerOptions0">
						    </el-date-picker>
					  </el-form-item>
					  
					  <el-form-item
					    label="内容详情"
					    prop="details">
					    <el-input
					    	size='mini'
					    	resize='none'
						  type="textarea"
						  :rows="3"
						  placeholder="请输入内容"
						  v-model="editValidateForm.details">
						</el-input>
				    
					  </el-form-item>
	
				    <el-form-item>
					    <el-button @click="resetForm1('editValidateForm')">取 消</el-button>
					    <el-button type="primary" @click="submitForm1(scope.row)">确 定</el-button>
					</el-form-item>
				  </el-form>
			  
				</el-dialog>
			        
			      </template>
			    </el-table-column>
			    
			    
			
			  </el-table>
  			<el-button type="danger" :disabled='multipleSelection == 0' @click='batchDelete'>批量删除</el-button>
		</div>
		  <div class="block">
		   
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage3"
		      :page-size="10"
		      layout="prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		  </div>
	</div>
</template>

<script>
	import util from '../util'
	import axios from 'axios'
//	import Article from '../mock/user'
//	let {Aritcle:article} = Article;
//	console.log(article)
	export default{
		name:'alist',
		mounted(){
			//在每次挂载完实例,数据,方法,属性之后,进行数据获取方法的调用
			this.getList();
		},
		data(){
			return{
				editloading:false,
				addloading:false,
				multipleSelection:[],
				editValidateForm:{
					bookname:'',
					author:'',
					date:'',
					details:'',
					id:''
				},
				
				dialogEditVisible:false,
				 rules: {
			          bookname: [
			            { required: true, message: '请输入书的名称', trigger: 'blur' },
			            
			          ],
			          author: [
			            { required: true, message: '请输入书的作者', trigger: 'blur' }
			          ],
			          details: [
			            { required: true, message: '请填写书的详情', trigger: 'blur' }
			          ]
			       },
				pickerOptions0: {
//		          disabledDate(time) {
//		            return time.getTime() < Date.now() - 8.64e7;
//		          }
		        },
				 numberValidateForm: {
			          bookname:'',
			          author:'',
			          date:'',
			          details:'',
			          
			          
			      },
				formLabelWidth: '120px',
		        currentPage3: 1,
		        dialogFormVisible: false,
				input:'',
				total:1,
				page:3,
				loading:false,
				article:[],
				
			}
		},
		methods:{
			selChange(sels){
				//用表格自带的方法来选中要选的元素;
				this.multipleSelection = sels;
				console.log(this.multipleSelection);
			},
			//批量删除
			batchDelete(){
				this.$confirm('此操作将永久删除该数据, 是否继续?','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
				//this.loading = true;
				let ids = this.multipleSelection.map(item => item.id).toString();
				let para = {ids: ids};
				console.log(ids);
				axios.get('/batch/alist' , {params:para}).then((res)=>{
					this.loading = false;
					this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
		        	this.getList();
				})
				})
			},
			//删除数据
			delData(row) {
				console.log(row.id);
		        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.addloading = true;
		        	//将id变为纯净得id
		        	let para = {id: row.id};
		        	//传入id值纯净得
		        	axios.get('/delete/data',{params:para}).then((res)=>{
		        		this.addloading = false;
		        		this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
		        		this.getList();
		        	})
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		      },
		      //提交编辑数据
			submitForm1() {
				console.log(this.editValidateForm)
				
		        this.$refs.editValidateForm.validate((valid) => {
		          if (valid) {
		          	this.$confirm('确认提交吗？', '提示', {}).then(() => {
//					this.editloading = true;
					let para = Object.assign({},this.editValidateForm);
					para.date = (!para.date || para.date == '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd');
//					console.log(para);
		            axios.get('/alist/edit',{params: para}).then((res) => {
			                this.editloading = false;
			                this.$message({
			                  message: '编辑成功',
			                  type: 'success'
			                });
			                this.$refs['editValidateForm'].resetFields();
			                this.dialogEditVisible = false;
			                this.getList();
	              });
		          })
		         } else {
		            console.log('error submit!!');
		            return false;
		          };
		         
		        });
		         
//		        
		      },
		      //重置编辑
		      resetForm1(formName) {
		        this.$refs[formName].resetFields();
		        this.dialogEditVisible = false;


		      },
		      //获得编辑的表单原始值
			change(row){
				console.log(row)
				this.editValidateForm.bookname = row.bookname;
				this.editValidateForm.author = row.author;
				this.editValidateForm.date = row.date;
				this.editValidateForm.details = row.details;
				this.editValidateForm.id  = row.id;
				this.dialogEditVisible = true;
			},
			//新增数据
			 submitForm(formName) {

		        this.$refs[formName].validate((valid) => {
		        	
		          if (valid) {
		          	this.addloading = true;
		            console.log(this.numberValidateForm)
				//		            将该对象变成一个纯的对象
				//对象的浅拷贝,复制方法
				let para = Object.assign({},this.numberValidateForm);
				//运用util框架来包装时间格式
				 para.date = (!para.date || para.date == '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd');
				 console.log(para)
				 //定义接口,将数据发送到模拟接口
				 axios.get('/book/add',{params: para}).then((res) => {
				 	//打开模拟延迟
		              this.addloading = false;
		              //提交提示消息
		              this.$message({
		                message: '提交成功',
		                type: 'success'
		              });
		              //重置文件的内容
		              this.$refs[formName].resetFields();
		              //关闭对话框
		              this.dialogFormVisible = false;
		              //重新获取新增后的数据
		              this.getList();
		           });
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });

		      },
		      //新增数据的重置
		      resetForm(formName) {
		        this.$refs[formName].resetFields();
		        this.dialogFormVisible = false;
		         this.dialogFormVisible = false;
		         this.numberValidateForm.bookname = '';
		         this.numberValidateForm.author = '';
		         this.numberValidateForm.date = '';
		         this.numberValidateForm.details = '';
		      },
		handleSizeChange(val) {
				
	        console.log(`每页 ${val} 条`);
	      },
	      //当前页的index
	      handleCurrentChange(val) {
	      	this.page = val
	      	this.getList();
//	        console.log(this.page);
	      },
	      //获取数据
	      getList(){
	      	//获取数据的方法,
	      	this.loading = true
	      	//loading是是否延迟加载数据的开关值,决定着是否加载数据
	      	axios.get('/api/alist').then((res)=>{
	      		this.total = res.data.Article.length;
	      		var start = (this.page - 1) * 10;
	      		
	      		var end = start + 10 ;
	      		var tend = end > this.total? this.total : end;
	      		 this.article = res.data.Article.slice(start,tend)
//	      		 console.log( this.page, start,end,tend)
	      		//每次要用到axios就要先引入
	      		//数据就在箭头函数里面的参数中的data里面
	      		//将要用到的数据赋值在用到的数据里面
//	      		this.article = res.data.Article;
	      		this.loading = false;
	      	})
	      },
	     
		}
	}
</script>

<style scoped="scoped">
	.mbx{
		padding: 10px;
		
	}
	.shuruk{
		width: 100%;
		margin-left: 20px;
	}
	.shuruk .el-input{
		width: 250px;
		margin-top: 30px;
		margin-right: 20px;
	}
	 .demo-table-expand {
	    font-size: 0;
	  }
	  .demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	  }
	  .demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	  }
	  .tablek{
	  	width: 1520px;
	  	margin-top:50px ;
	  	margin-left: 15px;
	  }
	
	.block{
			float: right;
			margin-right: 20px;
		}
	.el-table--border td, .el-table--border th {
 	   border-right: 1px solid #dfe6ec;
    	border-right: 0;
	}	
	.el-dialog__body .el-form-item {
		padding: 0 30px ;
	}
	.el-dialog__body .el-input {
		width: 600px;
		float: right;
		margin: 0;
	}
	.el-form{
		padding: 40px;
	}
	.el-form-item__content{
		padding-right: 100px;
	}
	.el-form-item__content .el-input__inner{
		margin-right: 100px !important;
	}
	.el-form-item__content button{
		float: right;
		margin-right: 30px;
	}
	.el-textarea{
		width: 600px;
		float: right;
	}
</style>