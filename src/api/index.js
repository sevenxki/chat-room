import request from '@/utils/request'
import store from '@/store'

const Api = {
  listUser: '/user/list',
  RecordCurrent: '/record/current',
  myself: '/myself/get',
  allUser: '/allUser/list',
  addFriend: '/friend/add',
  friendAgree: '/friend/agree',
  incomingFriend: '/friend/new',
  AgreeOrNo: '/yesOr/no',
  allFriend: '/friend/all',
  login: '/user/login',
  register: '/user/register',
  modifyLoginUserInfo: '/user/modify',
  recommed: '/recommed/friend'
}

// 查询所有好友列表
export function listUser() {
  return request({
    url: Api.listUser,
    method: 'get',
  })
}

// 查询当前聊天窗口数据
export function getCurrentRecord(parameter) {
  return request({
    url: Api.RecordCurrent,
    method: 'post',
    data: parameter
  })
}

//添加好友查询所有用户数据
export function GetAllUser(parameter) {
  return request({
    url: Api.allUser,
    method: 'post',
    data: parameter
  })
}

//添加好友发送给后端
export function addFriend(parameter) {
  return request({
    url: Api.addFriend,
    method: 'post',
    data: parameter
  })
}

//好友申请已通过
export function friendAgree(parameter) {
  return request({
    url: Api.friendAgree,
    method: 'post',
    data: parameter
  })
}

//websocket模拟对方申请加好友
export function incomingFriend() {
  return request({
    url: Api.incomingFriend,
    method: 'get',
  })
}

//向后端发送我是否接受还是拒绝了某个人
export function AgreeOrNo(parameter) {
  return request({
    url: Api.AgreeOrNo,
    method: 'post',
    data: parameter
  })
}

// 查询自己的数据
export function GetMyself() {
  return request({
    url: Api.myself,
    method: 'get',
  })
}

//拿到好友推荐的数据
export function recommed() {
  return request({
    url: Api.recommed,
    method: 'get',
  })
}

//查询所有好友的数据
export function GetAllFriend() {
  return request({
    url: Api.allFriend,
    method: 'get',
  })
}

//登录向后端发送数据
export function login(userName, password) {
  const data = {
    userName,
    password,
  }
  return request({
    url: Api.login,
    method: 'post',
    data: data
  })
}

//注册用户发送给后端
export function register(parameter) {
  return request({
    url: Api.register,
    method: 'post',
    data: parameter
  })
}

// 修改个人信息
export function updateLoginUserInfo(parameter) {
  return request({
    url: Api.modifyLoginUserInfo,
    method: 'put',
    data: parameter
  })
}