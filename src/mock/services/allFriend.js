import { builder } from "../util";
import Mock from "mockjs";
import headimg from '@/assets/img/headimg.jpg'
import headimg2 from '@/assets/img/headimg2.jpg'
import headimg3 from '@/assets/img/headimg3.jpg'
import headimg4 from '@/assets/img/headimg4.jpg'
import headimg5 from '@/assets/img/headimg5.jpg'

export const allfriendList = [
    { texttype: "friend", img: headimg2, text: "东哥", id: 1, sex: 'man' },
    { texttype: "friend", img: headimg3, text: "哥", id: 2, sex: 'man' },
    { texttype: "friend", img: headimg4, text: "东", id: 3, sex: 'woman' },
    { texttype: "friend", img: headimg5, text: "东2哥", id: 4, sex: 'woman' },
    { texttype: "friend", img: headimg, text: "ah", id:9 , sex: 'woman' },
]
const allFriend = (options) => {
    return builder(allfriendList)
}
Mock.mock(/\/api\/friend\/all/, "get", allFriend)