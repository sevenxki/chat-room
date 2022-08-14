//该仓库为了存取好友列表和搜索用户，其实是一体的
import {listUser} from '@/api/index'

const userList={
    //只有打开了命名空间才可以使用...mapState的语法糖
    namespaced: true,//只有这里加了这个在...mapState()才可以用
    state:{
        userList:[], //这里最好赋值[],因为下面调用了Array的filter，装了数据库返回的所有好友列表
        searName:''   //检索搜索的名字
    },
    mutations:{
        SETSEARNAME(state,value){ //向state中注册
            state.searName=value;   //当在输入框输入希望搜索的词后会调用这里的方法，向state中注册searname，调用位置为向输入框的keyUp事件
        },
        SETUSERLIST(state,value){   //下面要提交所有用户列表时
            state.userList=value;
            console.log(state.userList)
        }
    },
    actions:{
        GetUserList({commit}){   //当初次加载时会向后端申请好友列表，升级websocket后可以主动更新 
            return new Promise((resolve,reject)=>{
                listUser().then(response=>{
                    const result=response.data.result //被包装在了data里
                    console.log(result)
                    commit('SETUSERLIST',result)  //提交好友列表
                    resolve(response) //可以返回Promise数据
                }).catch(error=>{
                    reject(error)
                })
            })
        }
    },
    getters:{
        //其实用户列表的生成全都依赖这里的计算属性，当输入框什么都没输入时indexOf返回0，会返回所有state中向服务器申请的所有好友列表，有时是1并且经过过滤
        //得到要查询的人，没有找到时则会返回-1，
        userList:(state) => {       //虽然上面已经把数据更新到了state中，但这里
            return state.userList.filter(item=>item.name.indexOf(state.searName)!=-1)
        }
    }
    
}
//一定要记得向外暴露
export default userList