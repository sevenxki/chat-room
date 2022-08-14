//这个是动画的v-if触发条件，主要目的还是为了能够完整展示退出动画
const moveIf={
    namespaced:true,
    state:{
        listmove:true,  //列表和右面板是否不播放退出动画
        searchmove:true //朋友圈是否不播放退出动画
    },
    mutations:{
        // 调用位置为componentsLeft.vue的method方法
        SETLISTMOVE(state,value){
            state.listmove=value;
        },
        SETSEARCHMOVE(state,value){
            state.searchmove=value;
        }
    }
}
export default moveIf