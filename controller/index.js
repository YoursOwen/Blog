const conn = require("../db")
const moment = require('moment');

module.exports = {
    getIndex (req,res) {
        const sqlStr = `select a.id,a.title,a.ctime,u.nickname from article 
        as a LEFT JOIN 
        user as u on a.authorId = u.id
        ORDER BY a.ctime DESC
        LIMIT 6` 
        conn.query(sqlStr,(err,results)=>{
          
            if(err) return res.status("500").send({status:500,msg:"数据加载失败"+err.message})
            res.render("index",{
                userInfo:req.session.userInfo,
                isLogin:req.session.isLogin,
                item:results
            })  
        })
        
       
    },
    getLogout (req,res) {
        req.session.destroy(function(err) {
            res.redirect("/")
          })
    }
}