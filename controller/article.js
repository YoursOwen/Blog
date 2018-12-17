const conn = require("../db")

module.exports = {
    getArticleAdd (req,res) {
        if(!req.session.isLogin) return res.redirect("/")

        res.render('./article/add',{
            userInfo:req.session.userInfo,
            isLogin:req.session.isLogin
        })
    },
    postArticleAdd (req,res) {
        const data = req.body
        data.authorId = req.session.userInfo.id
        const sqlStr = "insert into article set ?"
        conn.query(sqlStr,data,(err,results) => {
            if(err) return res.status(500).send({status:500,msg:"添加文章失败"})
            res.send({status:200,msg:"添加文章成功"})
        })
    },
    getArticleInfo (req,res) {
        res.render('./article/info',{
            userInfo:req.session.userInfo,
            isLogin:req.session.isLogin
        })
    }
}