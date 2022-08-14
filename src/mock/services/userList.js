//模拟的是用户列表的数据
import Mock from 'mockjs'
import {builder} from '../util'
import headimg from '@/assets/img/headimg.jpg'
import headimg2 from '@/assets/img/headimg2.jpg'
import headimg3 from '@/assets/img/headimg3.jpg'
import headimg4 from '@/assets/img/headimg4.jpg'
import headimg5 from '@/assets/img/headimg5.jpg'
export const list=[
    {id:1,headimg:headimg2,name:'东哥',lastcord:'那你说我是谁',time:"9:00"},
    {id:2,headimg:headimg3,name:'哥',lastcord:'。。。',time:"9:01"},
    {id:3,headimg:headimg4,name:'东',lastcord:'你的意思是',time:"9:03"},
    {id:4,headimg:headimg5,name:'东2哥',lastcord:'hhhhhh',time:"9:04"},
    // {id:5,headimg:headimg,name:'牛n',lastcord:'2会',time:"9:05"},
]
const userList=options=>{
    
    const userList=builder(list)
    console.log(userList)
    return userList
}

Mock.mock(/\/api\/user\/list/,'get',userList)