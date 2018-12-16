const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const bodyParser = require('body-parser')
const session = require('express-session')
//主要注册了session中间件，那么就可以访问到req.session
app.use(session({
    secret: 'mySession',
    cookie: { maxAge: 3600 *24 * 15 },
    resave: false,
    saveUninitialized: false,
  }))



//静态托管
app.use("/node_modules",express.static("./node_modules"))

//parser初始化
app.use(bodyParser.urlencoded({ extended: false }))

//ejs初始化
app.set('view engine', 'ejs')

//自动加载路由模块
//使用fs模块读取router文件下的所有文件名
fs.readdir("./router",(err,filename)=>{
    if(err) return console.log(err,message)
    filename.forEach(item => {
        const filePath = path.join(__dirname,"./router",item)
        const router = require(filePath)
        app.use(router)
        console.log(item)
    })
})


app.listen(80,()=>{  //默认80端口 Url栏不显示
    console.log("Running at http://127.0.0.1")
})



