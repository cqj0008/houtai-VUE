import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mainly from '@/components/Mainly'
import User from '@/components/User'
import DashBoard from '@/components/DashBoard'
import UserList from '@/components/UserList'
import Article from '@/components/Article'
import Alist from '@/components/Alist'
import Aclass from '@/components/Aclass'
import Info from '@/components/Info'
import PassWard from '@/components/PassWard'
import Admin from '@/components/Admin'


Vue.use(Router)

var admin_router =  new Router({
	mode:'history',
	routes: [
    {
      path: '/',
      name: 'shouye',
      redirect:'/dashboard',
      component: Mainly,
      children:[{
      	path:'dashboard',
      	name:'dashboard',
      	component:DashBoard,
      },
      {
      	path:'/info',
      	name:'info',
      	component:Info,
      	
      },
      {
      	path:'/passward',
      	name:'passward',
      	component:PassWard
      },
      {
      	path:'/exit',
      	name:'exit',
      	redirect:'/admin',
      },
      {
      	path:'article',
      	name:'article',
      	component:Article,
      	children:[{
      		path:'alist',
      		name:'alist',
      		component:Alist,
      	},{
      		path:'aclass',
      		name:'aclass',
      		component:Aclass
      	}]
      },{
      	path:'user',
      	name:'user',
      	component:User,
      	children:[{
      		path:'userlist',
      		name:'userlist',
//    		beforeEnter:function(to,from,next){}
      		component:UserList
      	}]
      }]
    },{
    	path:'/admin',
    	name:'admin',
    	component:Admin
    }
  ]
})
//还有单个路由的守卫(直接在路由配置里面调用beforeEnter:function(to,from,next){
	//函数里面写验证;路由的信息if else语句
//})
function checkAdmin(to,from,next){
	if(to.path.startsWith('/admin')){
		//在进入之前先将sessionStorage清除一下
		sessionStorage.removeItem('userinfo');
		next()
	}else{
		if(sessionStorage.getItem('userinfo')){
			next();
		}else{
			next('/admin');
		}
	};
}

//进行导航守卫拦截(全局的导航守卫)
admin_router.beforeEach((to,from,next)=>{
	//to是从当前页面要去的页面(目的地)
	console.log(to.path);
	//from是当前离开的页面(始发地)
//	console.log(from);
	//next是接下来要执行的页面
//	console.log(next);
	//不写next(),不会执行当前页面
	if(to.path.startsWith('/admin')){
		//在进入之前先将sessionStorage清除一下
		sessionStorage.removeItem('userinfo');
		next()
	}else{
		if(sessionStorage.getItem('userinfo')){
			next();
		}else{
			next('/admin');
		}
	};
	
})

export default admin_router