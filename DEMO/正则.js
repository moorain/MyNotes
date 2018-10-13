const ts = (reg, str) => {
    console.log(str, reg.test(str));
    return reg.test(str);
}

let reg1 = /\d/;  //\d 代表0-9之间的数字




//一，元字符：

//1. 具有特殊意义的：

    // \    : 转义字符 ，转译后面字符代表的含义
    // ^    : 以某一个元字符开始
    // $    : 以某一个元字符结尾
    // \n   : 匹配一个换行符
    // .    :除了\n以外任意字符

    let reg5 = /^0.2$/;// 以0开头 以2结尾,中间任意【一个】字符
    ts(reg5, '0d2');//true
    ts(reg5, '0。2');//true
    ts(reg5, '0@2');//true

    //只代表0.2的正则,利用转译字符
    let reg6 = /^0\.2$/;
    ts(reg6, '0d2');//false
    ts(reg6, '0.2');//true

    let reg2 = /^\d$/;
    ts(reg2, '2')//true 
    ts(reg2, '012')//false  ---> ^ $ 代表开头和结尾，不占位


    //  ()   :分组 ,把正则本身分成几个小的正则

    ts(/^\d+moorain\d+$/, '2moorain123123')//true 
    ts(/^(\d+)moorain(\d+)$/, '2moorain123123')//true 

    // x|y    : x或者y
    // [xyz]  : x或y或z中的一个
    // [^xyz]: 除了三个以外的任意一个字符
    // [a-z] : 包含a-z之间到任意一个字符
    // [^a-z]: 除了a-z之间到任意一个字符
    // \d     : 一个0-9之间的数字
    // \D     : 除了0-9之间的任意一个字符
    // \b     : 匹配一个边界符 'w1 w2 w3'
    // \w     :数字字母下划线中任意一个字符  [0-9a-zA-Z_]
    // \s     :匹配一个空白字符，空格，一个制表符，换页符


//2.代表出现次数的量词元字符
    // *     : 出现0-多次
    // +     : 出现1-多次
    // ?     : 出现1-多次
    // {n}   : 出现n多次
    // {n,}  : 出现n到多次
    // {n,m} : 出现n到m次

    let reg3 = /^\d+$/
    ts(reg3, '2015')//true

    // 1.检测有效数字的正则：
    // 1.1 以 + - 开头且出现0次或1次： /^[+-]?$/ 
    // 1.2 以1-9开头多位数或单数 ： /^(\d|([1-9]\d+))$/
    // 1.3 可以有小数点，且小数点后必须有一个或多个数字：/^(\.\d+)?$/
    // 1.4 /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/

    ts(/^[+-]?(\d|([1-9]\d+))(\.\d+)?$/, '1.12312')//true






// 二，正则捕获

//1.懒惰性:每次执行只捕获第一个匹配的内容。原因是正则有一个属性lastIndex：

    //  正则每一次捕获在字符串中开始查找的位置，默认0。在每次调用时，lastIndex都默认为0，也就是又从0开始查找，
    //  所以就只能匹配第一个匹配的内容。

    const strExec = (reg,str)=>{
        console.log('正则每一次捕获在字符串中开始查找的位置',reg.lastIndex)
        console.log(reg.exec(str));
        return reg.exec(str);
    }

    //先进行默认匹配，如果没有成功，结果为null

    strExec(/\d+/,'moorain234234style2040');

    // 0: "23123"                  ------> 捕获到的内容
    // index: 0                    ------> 捕获内容在字符串中索引
    // input: "23123moorain234234" ------> 捕获原始字符串

//2.如何避免懒惰性：在正则末尾加'g'  ：

    //  修饰符 g，i，m  
    //  g(global)    :全局匹配  
    //  i(ignoreCase):忽略大小写匹配 
    //  m(multiline) :多行匹配 

    strExec(/\d+/g,'moorain234234style2040');

    // ["234234", index: 7, input: "moorain234234style2040", groups: undefined]
    // ["2040", index: 18, input: "moorain234234style2040", groups: undefined]

    // 加全局匹配符后，正则的lastIndex值进行了修改,不再为默认值。

    //正则获取全部匹配成功内容的函数（正则末尾加g）：
    const strExecAll = (reg, str) => {
        const arr = [];
        let res = reg.exec(str);
        while(res){
            arr.push(res[0]);
            res = reg.exec(str);
        }
        return arr;
    }

    console.log(strExecAll(/\d+/g,'moo12rain3456789st92yle40'));
    //[ '12', '3456789', '92', '40' ]


//4.正则“贪婪性”，正则每次捕获，按照正则匹配最长的结果捕获的。

    //  以上为列，例如2 ，2015 都符合正则，但返回的是2015。


//5.解决正则“贪婪性”。（也要在末尾加全局修饰符'g'）在正则量词元字符后加'g'。 同字符串中的match方法

    console.log(strExecAll(/\d+?/g,'moo12rain3456789st92yle40'));
    // [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '9', '2', '4', '0' ]

    // '?'的作用： 
    //  1. 放在普通原字符后，代表出现0-1次。
    //  2. 放在量词原字符后，代表取消捕获时‘贪婪性’。




// 6.字符串中的match方法：

    // 把全部和正则匹配的字符都获取到:
    const matchStr = 'moo12rain3456789st92yle40';
    const matchReg = /\d+?/g;
    const matchReg2 = /\d+/g;
    console.log(matchStr.match(matchReg));//此方法只需执行一次
    //[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '9', '2', '4', '0' ]
    console.log(matchStr.match(matchReg2));//此方法只需执行一次
    //[ '12', '3456789', '92', '40' ]

    // match在分组捕获的情况下，match只能捕获到大正则匹配的内容，而对于小正则匹配的内容，是无法获取的


// 7.  正则分组，正则分组和match的区别

    // 1）改变优先级
    // 2）分组引用

    const reg7 = /^(\w)\1(\w)\2$/  // \2代表和第二个分组出现一模一样的内容  \1 代表和第一个分组出现一模一样的内容
    console.log(reg7.test('zzff')) //true
    console.log(reg7.test('z2f2'))  //false -->内容都必须一样。

    //3）分组捕获 ，正则捕获，大正则匹配的内容，和分组小正则匹配的内容。
    const reg73 = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|x)$/;
    var str = "142726199009161212";
    console.log(reg73.exec(str))
    // ["142726199009161212", "14", "2726", "1990", "09", "16", "12", "1", "2", index: 0, input: "142726199009161212", groups: undefined]

    // 由此可见，每一个小分组正则匹配的内容都捕获到了。。。。。。。
    // 4)不需要捕获的小分组，在分组括号内加'?:',在分组中 '?:'意思为只匹配，不捕获;
    
    const reg74 = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(?:\d{2})(\d)(\d|x)$/;
    var str74 = "142726199009161212";
    console.log(reg74.exec(str74))
    //[ '142726199009161212','14','2726','1990','09','16','1','2',index: 0,input: '142726199009161212',groups: undefined ]

    //5)match的区别：

    console.log(str74.match(reg74))//和exec获取的结果是一样的。
    const reg75 = /moorain(\d+)/g;
    const str75 = 'moorain123moorain456moorain789moorain243242';
    console.log(reg75.exec(str75))//["moorain123", "123", index: 0, input: "moorain123moorain456moorain789moorain243242", groups: undefined]
    console.log(reg75.exec(str75))//["moorain456", "456", index: 10, input: "moorain123moorain456moorain789moorain243242", groups: undefined]
    console.log(reg75.exec(str75))// ["moorain789", "789", index: 20, input: "moorain123moorain456moorain789moorain243242", groups: undefined]
    
    console.log(str75.match(reg75)) //match只匹配到大正则匹配的内容，小分组没有匹配到。
    //["moorain123", "moorain456", "moorain789", "moorain243242"]

