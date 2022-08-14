//把所有modules集成到这里
import Vue from 'vue'
import Vuex from 'vuex'
import userList from './modules/userList'
import currentRecord from './modules/currentRecord'
import myself from './modules/myself'
import localStroage from './modules/localStroage'
import allFriend from './modules/allFriend'
import currentFriendSpan from './modules/currentFriendSpan'
import moveIf from './modules/moveIf'
Vue.use(Vuex);
export default new Vuex.Store({

    modules: {
        userList,
        currentRecord,
        myself,
        localStroage,
        allFriend,
        currentFriendSpan,
        moveIf
    },
    state: {},
    actions: {},
    mutations: {}
})