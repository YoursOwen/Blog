const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql');
const moment = require("moment")


const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'blog'
});
 
//静态托管
app.use("/node_modules",express.static("./node_modules"))

//parser初始化
app.use(bodyParser.urlencoded({ extended: false }))

//ejs初始化
app.set('view engine', 'ejs')

//主页
app.get("/",(req,res)=>{
    res.render("index",{name:"zs",age:"14"})
})

//注册页路由
app.get("/register",(req,res)=>{
    res.render("./users/register",{})    
})
app.post("/register",(req,res)=>{
    const data = req.body

    //验证表单数据的合法性
    if(!data.password || !data.username || !data.nickname ) {
        return res.send({status:400,msg:请输入正确的表单信息})
    }
    //验证表单是否重复 (count计数)
    const queryCount = "select count(*) as c from user where username = ?"
    conn.query(queryCount,data.username,(error, results)=>{
        if (error) return res.send({status:500,msg:error.message})
        if(results[0].c > 0) return res.send({status:400,msg:"用户名重复!"})

        //流程走到这说明数据没有问题,可以插入了
        data.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql = "insert into user set ?"
        conn.query(sql,data,(error, results)=>{
        if (error) return res.send({status:500,msg:error.message,data:null})
        res.send({status:200,msg:"注册成功",data:results || null})
        });
       ;
      });
    
})


//登录页
app.get("/login",(req,res) => {
    res.render("./users/login",{})
})
app.post("/login",(req,res) => {
    const data = req.body
    const sqlStr = "select count(*) as c from user where username= ? and password= ? "
    conn.query(sqlStr,[data.username,data.password],(error, results)=>{
        
        if (error) return res.send({status:500,msg:error.message,data:null})
        if(results[0].c == 0) return res.send({status:400,msg:"用户名或密码错误"})
        res.send({status:300,msg:"登陆成功"})
        });     

})


app.listen(80,()=>{  //默认80端口 Url栏不显示
    console.log("Running at http://127.0.0.1")
})

