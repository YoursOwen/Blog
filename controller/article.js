var markdown = require( "markdown" ).markdown;
const conn = require("../db")
const moment = require('moment');

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
        data.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sqlStr = "insert into article set ?"
        conn.query(sqlStr,data,(err,results) => {
            if(err) return res.status(500).send({status:500,msg:"添加文章失败"})
            res.send({status:200,msg:"添加文章成功",articleId:results.insertId})
        })
    },
    getArticleInfo (req,res) {
        const id = req.params.id
        const sqlStr = "select * from article where id = ?"
        conn.query(sqlStr,id,(err,results)=>{
            if(err) return res.status("500").send({status:500,msg:"文章信息获取失败"+err.message})

            //用markdown将结果先转换好再传参
            let html = markdown.toHTML(results[0].content)
            results[0].content = html

            res.render('./article/info',{
                articleInfo:results[0],
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
            })
        })
        
    },
    getArticleEdit (req,res) {
        if(!req.session.isLogin) return res.redirect("/")
        const id = req.params.id
        const sqlStr = "select * from article where id = ?"

        conn.query(sqlStr,id,(err,results)=>{
            if(err) return res.status("500").send({status:500,msg:"文章信息获取失败"})
            
            res.render('./article/edit',{
                articleInfo:results[0],
                isLogin:req.session.isLogin,
                userInfo:req.session.userInfo,
            })
        })
    },
    postArticleEdit (req,res) {
        data.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sqlStr = "update article set ? where id = ?"
        conn.query(sqlStr,[req.body,req.params.id],(err,results) => {
            if(err) return res.status(500).send({status:500,msg:"编辑文章失败"+err.message})
            res.send({status:200,msg:"编辑文章成功",articleId:req.params.id})
        })
    }


}

