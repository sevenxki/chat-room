// 模拟注册
import { builder, getBody } from '../util'
import Mock from 'mockjs'

export const newRegister = []

// 在register.vue取status判断
// 注册成功:1004，用户已被注册:1005
const register = (options) => {
    // 模拟后端验证
    const body = getBody(options)
    if (newRegister.length == 0) {
        if (body.userName == 'test1' || body.userName == 'test2') {
            return builder({
                status: 1005,
                message: '该帐号已被注册！',
            })
        }
        else {
            return builder({
                status: 1004,
                message: '注册成功',
            })
        }
    } else {
        let flag = 0;
        for (let i = 0; i < newRegister.length; i++) {
            if (body.userName == newRegister[i].userName) {
                flag = 1;
            }
        }
        if (body.userName == 'test1' || body.userName == 'test2' || flag == 1) {
            return builder({
                status: 1005,
                message: '该帐号已被注册！',
            })
        }
        else {
            return builder({
                status: 1004,
                message: '注册成功',
            })
        }
    }
}
Mock.mock(/\/api\/user\/register/, 'post', register)