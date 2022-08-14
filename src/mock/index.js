//集成一下所有的modules
import { isIE } from "@/utils/util"
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
    if (isIE()) {
        console.error("IE不能用mockjs")
    }
    const Mock = require('mockjs')
    require('./services/userList')
    require('./services/recordSpan')
    require('./services/allUserSearch')
    require('./services/addFriend')
    require('./services/friendAgree')
    require('./services/incomingFriend')
    require('./services/agreeOrRefuse')
    require('./services/allFriend')
    require('./services/login')
    require('./services/register')
    require('./services/updateLoginUserInfo')
    require('./services/recommed')
    Mock.setup({
        timeout: 0   //多久相应，为了避免白屏，以后白屏优化的时候再进行设置
    })
    console.log("mock已挂载")
}