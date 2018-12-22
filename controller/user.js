const conn = require('../db')
const moment = require("moment")
const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = {
    getRegisterHandler(req, res) {
        res.render("./users/register", {})
    },
    postRegisterHandler(req, res) {
        const data = req.body

        //验证表单数据的合法性
        if (!data.password || !data.username || !data.nickname) {
            return res.send({
                status: 400,
                msg: 请输入正确的表单信息
            })
        }
        //验证表单是否重复 (count计数)
        const queryCount = "select count(*) as c from user where username = ?"
        conn.query(queryCount, data.username, (error, results) => {
            if (error) return res.status("500").send({
                status: 500,
                msg: error.message
            })
            if (results[0].c > 0) return res.send({
                status: 400,
                msg: "用户名重复!"
            })

            //流程走到这说明数据没有问题,可以插入了
            data.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
            //执行sql前加密,数据库password的数据格式要为varchar

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data.password, salt);

            data.password = hash

            const sql = "insert into user set ?"
            conn.query(sql, data, (error, results) => {
                if (error) return res.status("500").send({
                    status: 500,
                    msg: error.message,
                    data: null
                })
                res.send({
                    status: 200,
                    msg: "注册成功",
                    data: results || null
                })
            });
        });

    },
    getLoginHandler(req, res) {
        res.render("./users/login", {})
    },
    postLoginHandler(req, res) {
        const data = req.body


        const sqlStr = "select * from user where username= ? "
        conn.query(sqlStr, data.username, (error, results) => {

            if (error) return res.status("500").send({
                status: 500,
                msg: error.message,
                data: null
            })
            if (results.length !== 1) return res.send({
                status: 400,
                msg: "用户名或密码错误"
            })
            if (!bcrypt.compareSync(req.body.password, results[0].password)) return res.status(400).send({
                status: 400,
                msg: '登录失败!请重试!'
            })
            //挂载要在send之前,如果send在前，挂载会不生效
            req.session.userInfo = results[0]
            req.session.isLogin = true
            // console.log( req.session.userInfo.username)
            res.send({
                status: 300,
                msg: "登陆成功"
            })
        });

    }
}