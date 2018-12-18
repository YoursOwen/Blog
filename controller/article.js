var markdown = require( "markdown" ).markdown;
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
            res.send({status:200,msg:"添加文章成功",articleId:results.insertId})
        })
    },
    getArticleInfo (req,res) {
        const id = req.params
        const sqlStr = "select * from article where ?"
        conn.query(sqlStr,id,(err,results)=>{
            if(err) return res.status("500").send({status:500,msg:"文章信息获取失败"})
            
            //用markdown将结果先转换好再传参
            let html = markdown.toHTML(results[0].content)
            results[0].content = html

            res.render('./article/info',{
                articleInfo:results[0],
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
            })
        })
        
    }
}