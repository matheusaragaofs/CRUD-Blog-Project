const express = require('express')
const Router = express.Router()

Router.get("/articles",(req,res)=>{
    res.send('Rota de artigos')
})

Router.get('/admin/articles/new',(req,res)=>{
    res.send('Rota para criar uam nova artigo')
})



module.exports = Router