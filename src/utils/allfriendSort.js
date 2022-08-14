//根据中文汉字名按照字母表排序生成所需对象，后续会更新为什么这么写
import Pinyin from './Pinyin'
export function allfriendSort(name){
    var pinyinArray = new Array();
    for (var bukn = 0; bukn < name.length; bukn++) {
        var o = new Object();
        var ken = Pinyin.getSpell(name[bukn].text, function (charactor, spell) {
            return spell[1];
        });
        o.name = name[bukn];
        o.pinyin = ken.split(',').join('');
        pinyinArray.push(o);
    }
    let map = {
        title: '',
        datas: []
    };
    pinyinArray.forEach((item, index) => {
        if (!map[item.pinyin[0].toUpperCase()]) {
            map[item.pinyin[0].toUpperCase()] = {
                title: item.pinyin[0].toUpperCase(),
                datas: []
            };
        }
        map[item.pinyin[0].toUpperCase()].datas.push({
            name: item.name,
            pinyin: item.pinyin
        });
    });
    var turn = new Array();
    var letters = '*ABCDEFGHIJKLNMOPQRSTUVWXYZ'.split('');
    for (var i = 1; i < letters.length; i++) {
        if (map[letters[i]]) {
            var obj = new Object();
            obj.title = letters[i];
            obj.datas = map[letters[i]].datas;
            turn.push(obj);
        }
    }
    //对景区名称进行排序
    let arr = turn;
    var compare = function (obj1, obj2) {
        var val1 = obj1.pinyin;
        var val2 = obj2.pinyin;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    };
    for (let i = 0; i < arr.length; i++) {
        arr[i].datas.sort(compare);
    }
    let finarr=new Array()
    for(let i=0;i<arr.length;i++){
        finarr.push({texttype:"zimu",text:arr[i].title},)
        for(let j=0;j<arr[i].datas.length;j++){
            finarr.push(arr[i].datas[j].name)
        }
    }
    console.log(finarr)
    return finarr
}
