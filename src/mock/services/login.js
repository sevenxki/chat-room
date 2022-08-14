// 登录信息
import Mock from 'mockjs'
import { builder, getBody } from '../util'
import headimg from '@/assets/img/headimg.jpg'
import headimg2 from '@/assets/img/headimg2.jpg'

export const newUser = [
    { userName: 'test1', password: '123', name: 'mo_om', phonenumber: '13111111111', email: 'abc@163.com', headimg: headimg, sex: 'man', region: ["440000", "440300", "440307"], grade: '2019', hobby: ['唱歌', '跳舞'], institute: '数学与信息学院' },
    { userName: 'test2', password: '123', name: '东哥', phonenumber: '13111111112', email: 'qwe@163.com', headimg: headimg2, sex: 'man', region: ["440000", "440100", "440106"], grade: '2019', hobby: ['画画'], institute: '农学院' },
]

// 在reques.js响应拦截器获取message和status判断
// 登录成功：1000，登录失败（账号或密码错误）：1001，未登录：1002，用户授权过期：1003
export const login = options => {
    // 模拟后端验证
    const body = getBody(options)
    // 模拟新数据
    for (let i = 0; i < newUser.length; i++) {
        if (body.userName == newUser[i].userName && body.password == newUser[i].password) {
            return builder({
                status: 1000,
                token: 'token',
                message: '登录成功',
                data: {
                    userName: newUser[i].userName,
                    password: newUser[i].password,
                    name: newUser[i].name,
                    headimg: newUser[i].headimg,
                    phonenumber: newUser[i].phonenumber,
                    email: newUser[i].email,
                    sex: newUser[i].sex,
                    region: newUser[i].region,
                    grade: newUser[i].grade,
                    hobby: newUser[i].hobby,
                    institute: newUser[i].institute
                }
            })
        }
        else if (body.userName == newUser[i].userName && body.password != newUser[i].password) {
            return builder({
                status: 1001,
                token: '',
                message: '密码错误',
                data: {}
            })
        }
    }
    // 模拟新数据
    let flag = 0;
    for (let i = 0; i < newUser.length; i++) {
        if (body.userName != newUser[i].userName) {
            flag = 1;
        }
    }
    if (flag == 1) {
        return builder({
            status: 1001,
            token: '',
            message: '该帐号不存在',
            data: {}
        })
    }
}

Mock.mock(/\/api\/user\/login/, 'post', login)