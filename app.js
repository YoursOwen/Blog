const express = require("express")
const app = express()

const bodyParser = require('body-parser')
const router = require("./router")


//静态托管
app.use("/node_modules",express.static("./node_modules"))

//parser初始化
app.use(bodyParser.urlencoded({ extended: false }))

//ejs初始化
app.set('view engine', 'ejs')

app.use(router)


app.listen(80,()=>{  //默认80端口 Url栏不显示
    console.log("Running at http://127.0.0.1")
})



