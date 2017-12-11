import axios from 'axios'
//用到axios就引入
import MockAdapter from 'axios-mock-adapter'
//axios的mock虚拟数据接口模拟框架引入
import Users from './user.js'
//引入数据
let {Users: user,Aritcle:article} = Users;
//数据解构赋值
let _aritcle = article;
console.log(article)
export default {
	//userlist的虚拟接口初始化
    	init(){
    		//首先要创建一个虚拟接口实例
    		 let mock = new MockAdapter(axios);
    		 // 获取用户列表
    		 //定义接口
    		 mock.onGet('/api/userlist').reply(config => {
    		//后面有一个回复函数,函数里面是配置信息
    		 	return new Promise((resolve, reject) => {
    		 		//返回一个响应数据的实例
    		 		setTimeout(() => {
    		 			//定义延迟调用的定时器
    		 			//rosove里面有三个参数:1.状态码2.data,发送的数据(主要)3.header
    		 			resolve([200, {
    						users: user
    		 			}])
    		 		}, 500)
    		 		//500就是定义延迟时间
    		 	})
    		 });
    		  mock.onGet('/api/alist').reply(config => {
    		//后面有一个回复函数,函数里面是配置信息
    		 	return new Promise((resolve, reject) => {
    		 		//返回一个响应数据的实例
    		 		setTimeout(() => {
    		 			//定义延迟调用的定时器
    		 			//rosove里面有三个参数:1.状态码2.data,发送的数据(主要)3.header
    		 			resolve([200, {
    						Article: _aritcle
    		 			}])
    		 		}, 500)
    		 	})
    		 })
    		  //可以定义多个接口
    		  //批量删除
    		  mock.onGet('/batch/alist').reply(config => {
    		  	let {ids} = config.params;
    		  	let idArr = ids.split(',');
    		  	
    		  	 _aritcle = _aritcle.filter((e) => {
    		  		return !idArr.includes(e.id);
    		  	})
    		  	 console.log(_aritcle);
    		  	return new Promise((resolve, reject) => {
		    		setTimeout(() => {
		    			resolve([200, {
		    				code: 200,
		    				msg: '删除成功'
		    			}])
		    		}, 500)
		    	})
    		  })
    		  //编辑
    		  mock.onGet('/alist/edit').reply(config => {
    		  	let {
    		  		id,
		    		bookname,
		    		author,
		    		details,
		    		date
		    	} = config.params;
//		    	console.log(config.params);
		    	_aritcle.some((e)=>{
		    		if(e.id == id){
		    			e.bookname = bookname;
		    			e.author = author ;
		    			e.details = details ;
		    			e.date = date;
		    		}
		    	})
		    	return new Promise((resolve, reject) => {
		    		setTimeout(() => {
		    			resolve([200, {
		    				code: 200,
		    				msg: '编辑成功'
		    			}])
		    		}, 500)
		    	})
    		  	
    		  })
    		  //新增
    		  mock.onGet('/book/add').reply(config => {
		    	let {
		    		bookname,
		    		author,
		    		details,
		    		date
		    	} = config.params
		    	//console.log(config.params)
		    	_aritcle.unshift({
		    		bookname,
		    		author,
		    		details,
		    		date
		    	})
		    	return new Promise((resolve, reject) => {
		    		setTimeout(() => {
		    			resolve([200, {
		    				code: 200,
		    				msg: '新增成功'
		    			}])
		    		}, 500)
		    	})
	   	 	});
	   	 	//删除
	   	 	mock.onGet('/delete/data').reply(config =>{
	   	 		//获取这个id
	   	 		let {id} = config.params;
	   	 		//根据id值来进行数据的过滤，就是相当于删除操作，防止数据的意外丢失，不会真的删除数据；
	   	 		_aritcle = _aritcle.filter((e)=>{
	   	 			return e.id !== id;
	   	 		})
	   	 		return new Promise((resolve, reject) => {
		    		setTimeout(() => {
		    			resolve([200, {
		    				code: 200,
		    				msg: '删除成功'
		    			}])
		    		}, 500)
		    	})
	   	 	})
    		  
    	}
    	
    }