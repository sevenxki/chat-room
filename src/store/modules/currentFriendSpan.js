//当前点击好友详细信息面板仓库，其实跟当前跟谁聊天currentRecord一样的储存仓库，列表那里点击了以后就会把点击那个人的信息放到当前信息仓库，
//然后好友信息面板组件来这里拿数据
const currentFriendSpan = {
    namespaced: true,
    state: {
        //firendSpan.vue组件会来拿
        name: '',
        headimg: '',
        id: 0,
        sex: '',
        move: true  //里面的朋友切换时v-if触发条件和recordName的名字切换一样
    },
    mutations: {
        //调用位置为allFriendList.vue
        SETFRIEND(state, value) {
            state.move = !state.move
            state.name = value.text
            state.headimg = value.img
            state.id = value.id
            state.sex = value.sex
        },
    }
}
export default currentFriendSpan