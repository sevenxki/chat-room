// 仅仅模拟好友已经发送到后端后端返回成功字样
import { builder,getBody } from "../util";
import  Mock from 'mockjs'

const addFriend=(options)=>{
    const body=getBody(options)
    const respon=`好友申请已发送`
    return builder(respon)
}
Mock.mock(/\/api\/friend\/add/,'post',addFriend)