//模拟好友推荐api
import { builder } from "../util";
import Mock from 'mockjs'
import headimg from '@/assets/img/headimg.jpg'
const recommed=(options)=>{
    return builder([
        { id: 9, headimg: headimg, name: 'ah' ,describe:'跟ta同学院'},
        { id: 10, headimg: headimg, name: 'bh' ,describe:'跟ta同专业' },
        { id: 11, headimg: headimg, name: 'ch' ,describe:'跟ta同班级'},
        { id: 12, headimg: headimg, name: 'dh' ,describe:'跟ta同学院'},
    ])
}

Mock.mock(/\/api\/recommed\/friend/,"get",recommed)