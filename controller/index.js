
module.exports = {
    getIndex (req,res) {
        console.log(req.session)
        res.render("index",{
            userInfo:req.session.userInfo,
            isLogin:req.session.isLogin
        })
        
    }
}