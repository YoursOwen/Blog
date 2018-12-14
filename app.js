const express = require("express")
const app = express()
const ejs = require("ejs")

app.use("/node_modules",express.static("./node_modules"))

app.set('view engine', 'ejs')

app.get("/",(req,res)=>{
    res.render("index",{})
})

app.listen(80,()=>{  //默认80端口 Url栏不显示
    console.log("Running at http://127.0.0.1")
})