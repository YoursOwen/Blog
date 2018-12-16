const express = require("express")
const app = express()

const bodyParser = require('body-parser')



//静态托管
app.use("/node_modules",express.static("./node_modules"))

//parser初始化
app.use(bodyParser.urlencoded({ extended: false }))

//ejs初始化
app.set('view engine', 'ejs')
const router1 = require("./router/index")
app.use(router1)
const router2 = require("./router/user")
app.use(router2)


app.listen(80,()=>{  //默认80端口 Url栏不显示
    console.log("Running at http://127.0.0.1")
})



