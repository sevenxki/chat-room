// 仅仅模拟已传递好友修改信息给后端后端返回成功字样
import { builder, getBody } from "../util";
import Mock from 'mockjs'

const updateLoginUserInfo = (options) => {
    const body = getBody(options)
    const respon = `个人信息修改成功`
    return builder(respon)
}
Mock.mock(/\/api\/user\/modify/, 'put', updateLoginUserInfo)