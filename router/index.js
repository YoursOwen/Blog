const express = require("express")
const router = express.Router()
const ctrl = require('../controller')

//主页
router.get("/",ctrl.index)


module.exports = router

