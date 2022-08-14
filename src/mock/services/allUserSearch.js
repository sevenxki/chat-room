//模拟数据库中的所有用户
import { builder, getBody } from "../util";
import Mock from 'mockjs'
import headimg from '@/assets/img/headimg.jpg'

const allUserSearch = (options) => {
    const body = getBody(options)

    const allUser = [
        { id: 5, headimg: headimg, name: 'hn' ,describe:'跟ta同学院'},
        { id: 6, headimg: headimg, name: 'n' ,describe:'跟ta同学院'},
        { id: 7, headimg: headimg, name: '牛nh' ,describe:'跟ta同学院'},
        { id: 8, headimg: headimg, name: '不h',describe:'跟ta同学院' },
        { id: 9, headimg: headimg, name: 'ah' ,describe:'跟ta同学院'},
        { id: 10, headimg: headimg, name: 'bh' ,describe:'跟ta同学院'},
        { id: 11, headimg: headimg, name: 'ch' ,describe:'跟ta同学院'},
        { id: 12, headimg: headimg, name: 'dh' ,describe:'跟ta同学院'},

    ]
    // 模拟数据库进行搜索框输入的匹配
    let search = allUser.filter(item => item.name.indexOf(body.parem) != -1)
    console.log('测试' + search)
    //包装成http需要的包
    return builder(search)
}

//进行模拟
Mock.mock(/\/api\/allUser\/list/, 'post', allUserSearch)