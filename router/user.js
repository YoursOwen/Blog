const express = require("express")
const router = express.Router()
const ctrl = require('../controller')

//注册页路由
router.get("/register",ctrl.register)
router.post("/register",ctrl.getRegister)

//登录页
router.get("/login",ctrl.login)
router.post("/login",ctrl.makeLogin)

module.exports = router