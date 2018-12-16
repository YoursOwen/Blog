const express = require("express")
const router = express.Router()
const ctrl = require('../controller')

//注册页路由
router.get("/register",ctrl.getRegisterHandler)
router.post("/register",ctrl.postRegisterHandler)

//登录页
router.get("/login",ctrl.getLoginHandler)
router.post("/login",ctrl.postLoginHandler)

module.exports = router