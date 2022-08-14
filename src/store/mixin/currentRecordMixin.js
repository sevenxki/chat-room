//为了把聊天面板的相关store操作集成在这里，所以设立了改Mixin文件
import { mapState,mapActions} from "vuex";
const currentRecordMixin={
    computed:{
        //computed选项注册了currentRecord的name和record，调用位置为recordSpan.vue和recordName.vue，skeleton是骨架是否展示
        ...mapState("currentRecord",["anotherName",'record','anotherHeadImg','id','move','skeleton'])  
    },
    methods:{
        // changeRecordSpan(id){
        //   this.$store.dispatch("currentRecord/SetRecordSpan",id);
        // }
        //点击不同人物跳转到不同聊天窗口，调用位置为leftFirendList.vue的click事件
        ...mapActions('currentRecord',{changeRecordSpan:'SetRecordSpan'})
    }  

}
export default currentRecordMixin