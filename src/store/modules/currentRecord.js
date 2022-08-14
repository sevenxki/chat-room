//为当前聊天窗口提供数据
import { getCurrentRecord } from "@/api/index"

const currentRecord = {
    //只有打开了命名空间才可以使用...mapState的语法糖
    namespaced: true,//只有这里加了这个在...mapState()才可以用
    state: {
        id: '',
        anotherName: '', //聊天窗口的对方名字
        anotherHeadImg: '', //聊天窗口对方的名字
        record: '', //聊天记录
        lastWrite: '',  //自己的输入还未发送时
        move: true,     //让name不停通过v-if展示动画，但其实无论是true还是false执行的逻辑是一样的，只是通过v-if去触发罢了
        skeleton: false  //是否展示加载中的过渡骨架
    },
    mutations: {
        SETNAME(state, value) {  //最后同步向state中注册
            state.anotherName = value
            // 数字变化的动画
            // gsap.to(state, { duration: 0.5, anotherName: value });
        },
        SETANOTHERHEADIMG(state, value) {
            state.anotherHeadImg = value
        },
        SETRECORD(state, value) {
            state.record = value
        },
        SETID(state, value) {
            state.id = value
        },
        SETMOVE(state) {
            state.move = !state.move
        },
        SETSELLETON(state) {
            state.skeleton = !state.skeleton
        }
    },
    actions: {
        //就是你知道怎么说吗，当你点击以后会出现store马上更新然后马上渲染，所以会出现各种跳动和瞬间消失什么东西一样，所以那边css我努力让他在一开始opacity为0
        //设置一个中空的时间让所有渲染都消失可以避免很多Vue的偷懒vue可以再次渲染，出现动画，并且每条聊天记录id不能相同，不然Key会让vue偷懒
        //当点击不同人物的小方框时记录id，向后端请求和对方的name,和聊天记录
        SetRecordSpan({ commit }, idAndname) {  //这里的{commit}是context的解构赋值获得commit，调用位置为leftFriendList.vue的click事件
            commit('SETSELLETON')  //设置骨架，当服务器返回数据有延迟时最好开启这个
            commit('SETMOVE')   //可以让名字不停地v-if重新渲染形成动画
            commit('SETNAME', idAndname.name)   //获取后到mutations中向state中注册  recordName那里瞬间重新换成新的名字有动画而不用等待服务器返回，但是一个bug就是一瞬间会让还未消失的好友名字变成这个
            commit('SETID', '')  //这里的目的是因为localstroage会瞬间捕捉id，local的语句不会消失，出现跳动，而设置一个中空的时间让所有渲染都消失可以避免很多Vue的偷懒，
            //两个计时器一个模仿向数据库加载的时间出现骨架，另一个你知道因为如果骨架一直在那里，后马上就渲染真的domvue还是会偷懒，因为并没有真的执行
            //空的渲染，所以给个10毫秒渲染空再渲染真的防止vue偷懒
            commit('SETRECORD', '')  //所以SETID和SETRECORD是两个设空的重要东西，他们会把两个list清空，以便让他重新渲染，其他都不重要
            // commit('SETANOTHERHEADIMG','') //这个没必要，相反还会在一瞬间出现图片消失的情形。
            setTimeout(() => {
                return new Promise((resolve, reject) => {
                    getCurrentRecord({ id: idAndname.id }).then(response => {  //这里的id要包装到对象中,相当于{id:id}
                        const result = response.data.result  //封装到data里了
                        console.log(result)
                        commit('SETSELLETON') //取消骨架等待五百毫秒后播放入场动画
                        setTimeout(() => {
                            commit('SETRECORD', result.record)
                            commit('SETANOTHERHEADIMG', result.headimg)
                            commit('SETID', idAndname.id)  //这里设置id的原因是输入框需要知道现在在跟谁对话，好利用此id上传新发送的内容
                            resolve('SETID')
                        }, 500)//这里设置才可以有500毫秒骗vue去渲染假的空值才会有消失动画和新的进入动画
                    }).catch(error => {
                        reject()
                    })
                })
            }, 0)//这里若设置时间则会卡住，要用骨架去抵消时间
        }
    }
}
//向外暴露
export default currentRecord