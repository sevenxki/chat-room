//为了把所有好友列表的相关store操作集成在这里，所以设立了改Mixin文件
import { mapGetters, mapMutations } from "vuex";

const allFriendMixin = {
    //拿到所有好友信息，调用位置为allFriendList.vue组件
    computed: {
        ...mapGetters("allFriend", ["friendList"])
    },
    //因为其实跟聊天好友列表一样的原理，列表其实是根据输入框实时getter实时生成的，要把输入框的输入拿到放到allfriend仓库里
    methods: {
        //调用位置为leftSearch.vue的keyUp事件
        ...mapMutations('allFriend', { searchFriend: 'SETSEARNAME' })
    },
}

export default allFriendMixin