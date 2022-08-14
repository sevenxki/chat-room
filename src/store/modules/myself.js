import { login } from '@/api/index'
import { updateLoginUserInfo } from '@/api/index'
import axios from 'axios';

const myself = {
    namespaced: true,
    state: {
        // 页面刷新后，vuex中的数据丢失。这是因为：js代码是运行在内存中的，代码运行时的所有变量、函数也都
        // 是保存在内存中的。进行刷新页面的操作，以前申请的内存被释放，重新加载脚本代码，变量重新赋值，所以
        // 这些数据要想存储就必须存储在外部。
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    },
    mutations: {
        SETUSERINFO(state, value) {
            state.userInfo = value
        },
        SETTOKEN(state, value) {
            state.token = value
        },
        LOGOUT(state) {
            state.token = '';
        },
    },
    actions: {
        Login({ commit }, user) {
            const userName = user.userName
            const password = user.password
            return new Promise((resolve, reject) => {
                // 向后端发送请求，验证帐号密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                login(userName, password)
                    .then(response => {
                        const result = response.data.result
                        // 每次请求接口时，需要在headers添加对应的Token验证
                        // axios.defaults.headers.common['Authorization'] = token
                        // 更新token
                        commit('SETTOKEN', result.token)
                        localStorage.setItem('token', result.token)
                        commit('SETUSERINFO', result.data)
                        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
                        let dataString = JSON.stringify(result.data)
                        sessionStorage.setItem('userInfo', dataString)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('SETTOKEN', "")
                        localStorage.removeItem('token')
                        sessionStorage.removeItem('userInfo')
                        reject(error)
                    })
            })
        },
        Logout({ commit }) {
            return new Promise(resolve => {
                localStorage.removeItem('token')
                sessionStorage.removeItem('userInfo')
                // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
                delete axios.defaults.headers.common['Authorization'];
                commit('LOGOUT')
                resolve()
            })
        },
        Update({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                updateLoginUserInfo(userInfo)
                    .then(response => {
                        commit('SETUSERINFO', userInfo)
                        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
                        let dataString = JSON.stringify(userInfo)
                        sessionStorage.setItem('userInfo', dataString)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    },
    getters: {
        // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false    
        isLogin: state => !!state.token,
        userInfo(state) {
            return state.userInfo
        }
    }
};
export default myself
