
//模拟前端把同意或者拒绝的数据发到后端，后端返回你接受了ta或者拒绝了ta
import { builder,getBody } from "../util";
import  Mock from 'mockjs'

const agreeOrRefuse=(options)=>{
    const body=getBody(options)
    const respon={yesOrNo:body.YesOrNo,id:body.taId,name:body.taName}
    return builder(respon)
}
Mock.mock(/\/api\/yesOr\/no/,'post',agreeOrRefuse)