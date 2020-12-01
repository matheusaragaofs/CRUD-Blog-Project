const express = require('express')
const Router = express.Router()
const Category = require('../categories/Category')
const Article =  require('./Article')
const slugify = require('slugify')

Router.get("/admin/articles",(req,res)=>{
    res.send('Rota de artigos')

})

Router.get('/admin/articles/new',(req,res)=>{
    Category.findAll().then(categories=>{
        res.render('admin/articles/new',{
            categories:categories
        })
        
    })
})

Router.post('/articles/save',(req,res)=>{
    const { title, body, category} = req.body
    Article.create({
        title:title,
        slug: slugify(title),
        body:body,
        categoryId: category
    }).then(()=>{
        res.redirect('/admin/articles')
    })

})

module.exports = Router