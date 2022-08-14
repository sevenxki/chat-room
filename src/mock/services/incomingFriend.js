//模拟想要加我为好友的用户,携带着他的验证消息
import { builder } from "../util";
import Mock from 'mockjs'
import headimg from '@/assets/img/headimg.jpg'
const incomingFriend = (options) => {
    return builder(
        [
            { id: 14, headimg: headimg, name: 'fh', text: '我是你爸爸' },
            { id: 13, headimg: headimg, name: 'eh', text: '我是你妈妈' }
        ]
    )
}

//进行模拟
Mock.mock(/\/api\/friend\/new/, 'get', incomingFriend)