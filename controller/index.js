
module.exports = {
    getIndex (req,res) {
        res.render("index",{
            userInfo:req.session.userInfo,
            isLogin:req.session.isLogin
        })  
       
    },
    getLogout (req,res) {
        req.session.destroy(function(err) {
            res.redirect("/")
          })
    }
}