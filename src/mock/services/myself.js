//模拟拿回自己的数据
import { builder } from "../util";
import Mock from 'mockjs'
import headimg from '@/assets/img/headimg.jpg'
const myself=(options)=>{
    const me={
        token:0,
        name:'mo_om',
        headimg:headimg
    }
    return builder(me)
}
Mock.mock(/\/api\/myself\/get/,'get',myself)