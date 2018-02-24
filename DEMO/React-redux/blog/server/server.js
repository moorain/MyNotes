// 2-4
const express = require('express')
const mongoose = require('mongoose')
//链接mongo  使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
})

// 类似于mysql的操作
// 定义文档模型
const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}))

User.create({
    user:'aaa',
    age:18
},function(err,doc){
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
})


// 新建app
const app = express()
app.get('/',function(req,res){
    res.send('<hello world>')
})

app.get('/data',function(req,res){
    // res.json({name:'aa',type:'it'})
    // 查询数据
    User.find({},function(err,data) {
        res.send(data)
    })
})

// 删除数据
User.remove({age:18},function (err,data) {
    if(!err){
        console.log(data)
    }
})

// 更新操作
User.updata({'user':'xiaoming'},{'$set':{age:26}},function (err,data) {
    console.log(data)
})

app.listen(9093,function(){
    console.log('node app start at port 9093')
})