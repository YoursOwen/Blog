
module.exports = {
    getArticleAdd (req,res) {
        res.render('./article/add',{
            userInfo:req.session.userInfo,
            isLogin:req.session.isLogin
        })
    }
}