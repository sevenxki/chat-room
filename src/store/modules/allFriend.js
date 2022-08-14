//这里几乎与userList.js的功能完全相同
import { GetAllFriend } from '@/api/index'
import { allfriendSort } from '@/utils/allfriendSort'
const allFriend = {
    namespaced: true,
    state: {
        allFriend: [],  //好友列表
        searName: ''   //输入框输入的
    },
    mutations: {
        SETALLFRIEND(state, value) {
            state.allFriend = value
        },
        SETSEARNAME(state, value) { //向state中注册
            state.searName = value;   //当在输入框输入希望搜索的词后会调用这里的方法，向state中注册searname，调用位置为向输入框的keyUp事件
        },
    },
    actions: {
        // 去数据库拿数据，调用位置为allFriend初次挂载的钩子函数
        getAllFriend({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllFriend().then(response => {
                    let result = response.data.result
                    result = allfriendSort(result)
                    commit('SETALLFRIEND', result)
                }).catch(error => {
                    console.log(error)
                })
            })
        }
    },
    getters: {
        //其实用户列表的生成全都依赖这里的计算属性，当输入框什么都没输入时indexOf返回0，会返回所有state中向服务器申请的所有好友列表，有时是1并且经过过滤
        //得到要查询的人，没有找到时则会返回-1，
        friendList: (state) => {       //虽然上面已经把数据更新到了state中，但这里才是真正的列表渲染的数据
            return state.allFriend.filter(item => item.text.indexOf(state.searName) != -1)
        }
    }
}

export default allFriend