const express = require("express")
const router = express.Router()
const ctrl = require("../controller/article")

router.get("/article/add",ctrl.getArticleAdd)

router.post("/article/add",ctrl.postArticleAdd)

module.exports = router