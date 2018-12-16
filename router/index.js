//封装理由模块是为了保证每个模块的职能单一性
//对于路由模块来说，只需要分配url到处理函数之间的关系即可
const express = require("express")
const router = express.Router()
const ctrl = require('../controller/index')

//主页
router.get("/",ctrl.getIndex)

router.get("/logout",ctrl.getLogout)
module.exports = router


