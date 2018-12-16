
module.exports = {
    getIndex (req,res) {
        res.render("index",{
            userInfo:req.session.userInfo,
            isLogin:req.session.isLogin
        })
        
    }
}