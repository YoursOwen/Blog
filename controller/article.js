
module.exports = {
    getArticleAdd (req,res) {
        if(!req.session.isLogin) return res.redirect("/")

        res.render('./article/add',{
            userInfo:req.session.userInfo,
            isLogin:req.session.isLogin
        })
    }
}