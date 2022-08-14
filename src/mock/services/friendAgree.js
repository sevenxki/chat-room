// 模拟通过的好友申请,返回谁通过了，模拟websocket
import { builder, getBody } from "../util";
import Mock from 'mockjs'

const addFriend = (options) => {
    const body = getBody(options)
    console.log('woshishiih' + body.friendName)
    const respon = {
        id: body.friendId,
        name: body.friendName
    }
    return builder(respon)
}
Mock.mock(/\/api\/friend\/agree/, 'post', addFriend)