//模拟的是当前聊天窗口的数据
import Mock from 'mockjs'
import { builder, getBody } from '../util'   //用解构赋值承接那边传过来的的分别暴露内容,es6的内容
import headimg from '@/assets/img/headimg.jpg'
import headimg2 from '@/assets/img/headimg2.jpg'
import headimg3 from '@/assets/img/headimg3.jpg'
import headimg4 from '@/assets/img/headimg4.jpg'
import headimg5 from '@/assets/img/headimg5.jpg'

const currentRecord = (options) => {
    //拿到前端穿过来的数据，下面模拟后端进行数据判断，主要是根据id号查找相应数据，一般前端传过来的数据是放在reuquest的Body中
    //一般记得把数据封装在对象中
    const body = getBody(options)
    if (body.id == 1) {
        return builder({
            name: '东哥',
            headimg: headimg2,
            record: [
                { id: 0, text: '你说我是谁', direction: 'left' },
                { id: 1, text: '富恒', direction: 'left' },
                { id: 2, text: '我咋知道', direction: 'right' },
                { id: 3, text: 'hhhhh', direction: 'left' },
                { id: 4, text: '那你说我是谁', direction: 'right' },
            ]
        })
    }
    else if (body.id == 2) {
        return builder({
            name: '哥',
            headimg: headimg3,
            record: [
                { id: 5, text: 'nimofei是那个谁', direction: 'left' },
                { id: 6, text: '那个。。。', direction: 'left' },
                { id: 7, text: '忘了', direction: 'left' },
                { id: 8, text: '。。。', direction: 'right' },
            ]
        })
    }
    else if (body.id == 3) {
        return builder({
            name: '东',
            headimg: headimg4,
            record: [
                { id: 9, text: '你会写前端吗', direction: 'right' },
                { id: 10, text: '有人吗', direction: 'right' },
                { id: 11, text: '不会吧', direction: 'right' },
                { id: 12, text: '你的意思是', direction: 'right' },
            ]
        })
    }
    else if (body.id == 4) {
        return builder({
            name: '东2哥',
            headimg: headimg5,
            record: [
                { id: 13, text: 'hhhh', direction: 'left' },
                { id: 14, text: 'hhhh', direction: 'right' },
                { id: 15, text: 'hhhhh', direction: 'left' },
                { id: 16, text: 'hhhhhh', direction: 'right' },
            ]
        })
    }
    else if (body.id == 5) {
        return builder({
            name: 'hn',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 6) {
        return builder({
            name: 'n',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 7) {
        return builder({
            name: '牛nh',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 8) {
        return builder({
            name: '不h',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 9) {
        return builder({
            name: 'ah',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 10) {
        return builder({
            name: 'bh',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 11) {
        return builder({
            name: 'ch',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 12) {
        return builder({
            name: 'dh',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 13) {
        return builder({
            name: 'eh',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }
    else if (body.id == 14) {
        return builder({
            name: 'fh',
            headimg: headimg,
            record: [
                { id: 1, text: '我是新好友', direction: 'left' },

            ]
        })
    }


}
Mock.mock(/\/api\/record\/current/, 'post', currentRecord)