const localStroage={
    namespaced:true,
    state:{
        newList:[]
    },
    mutations:{
        SETNEWLIST(state,value){
            state.newList=value
        }
    }
}
export default localStroage