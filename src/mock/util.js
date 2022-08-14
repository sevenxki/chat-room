//mock数据的builder类，封装成http格式的response，一般在数据最后模拟前需要经过这里的封装
//有用的数据一般存在result中
const responseBody={
    message:'',
    timestamp:0,
    result:null,
    code:0
}

export const builder=(data,message,code=0,headers={})=>{
    responseBody.result=data  //有用的数据一般存在result中，一般都调用这里
    if(message!=undefined &&message !==null){
        responseBody.message=message
    }
    if(code!==undefined&&code!==0){
        responseBody.code=code
        responseBody._status = code    
    }
    if(headers!==null && typeof headers==="object" && Object.keys(headers).length>0){
        responseBody._headers = headers
    }
    responseBody.timestamp=new Date().getTime()
    return responseBody
}

//拿到前端的数据对象
export const getBody=(options)=>{
    return options.body&&JSON.parse(options.body)
}





