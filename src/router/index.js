import Vue from "vue";
import Router from "vue-router";
import store from "@/store"
Vue.use(Router)

// component:() => import()是一种路由懒加载技术,() => import()利用webpack2和es6的动态引入方法可以实现返回promise,vue接收到promise组件后可以
// 和webpack2代码分割技术实现异步组件技术，即webpack打包时先分包打包，vue拿到包以后只有需要加载时才加载该包，传统import静态引入会让webpack把包打包成
// 一个，初次加载页面就会长时间的白屏。除此之外，其他组件也可以都改成动态引入从而使用vue的异步组件,后续可以考虑优化，同时还可以
//使用参考注释const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')指定webpack打包模块
//参考：https://cn.vuejs.org/v2/guide/components-dynamic-async.html?#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6
//https://webpack.js.org/guides/code-splitting/
//https://router.vuejs.org/zh/guide/advanced/lazy-loading.html

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/view/login.vue"),
  },
  {
    path: '/register',
    name: 'register',
    component: (resolve) => import('@/view/register'),
  },
  {
    path: '/index',
    name: 'index',
    //只会展示左边个人信息竖条和搜索框
    component: () => import("@/view/index.vue"),
    meta: {
      requiresAuth: true
    },
    //重定向到聊天界面
    redirect: '/index/chat',
    children: [
      {
        path: '/index/chat',
        name: 'chat',
        component: () => import("@/view/chat.vue"),
        //重定向到聊天界面
        redirect: '/index/chat/record',
        children: [
          {
            path: '/index/chat/record',
            name: 'record',
            //com一定要加s
            //路由的同级展示
            //展示聊天好友列表和聊天面板
            components: { friendList: () => import("@/components/leftFirendList"), layRighRight: () => import("@/view/recordAll") },
          },
          {
            path: '/index/chat/friendList',
            name: 'friendList',
            //路由的同级展示
            //展示所有好友列表和好友信息面板
            components: { friendList: () => import("@/components/allFriendList"), layRighRight: () => import("@/components/friendSpan") }
          }
        ]
      },
      {
        //只会展示左边个人信息竖条和朋友圈提示
        path: '/index/chatenv',
        name: 'chatenv',
        component: () => import("@/view/chatEnv.vue"),
      },
    ]
  },
];

const router = new Router({
  mode: "history", // 去掉url中的#
  base: process.env.BASE_URL,
  routes,
});

// 前置路由守卫
router.beforeEach((to, from, next) => {
  // 检测路由配置中是否有requiresAuth这个meta属性
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断是否已登录
    console.log(store.getters['myself/isLogin'])
    // namespaced: true 调用要加空间名
    if (store.getters['myself/isLogin']) {
      next();
      return;
    }
    // 未登录则跳转到登录界面
    next('/login');
  } else {
    next()
  }
})

//在vue-router3.1之前,router.push不会返回任何数据，从而无法得知执行情况如何
//在vue-router3.1加入了push或repalce以后会返回promise,当next(false) or next('/当前路由')
//时会返回reject,需要有catch去处理，否则会报错(resolve可以不进行处理，但是reject会报错)
//下面代码全局绑定处理catch
//参考：https://github.com/vuejs/vue-router/issues/2881
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  //把原全上下文this传过来
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


export default router;
