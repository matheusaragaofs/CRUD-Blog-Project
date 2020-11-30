const express = require('express')
const { default: slugify } = require('slugify')
const Category = require('./Category')
const Router = express.Router()

Router.get('/admin/categories/new',(req,res)=>{
    res.render('admin/categories/new')

})

Router.post('/categories/save',(req,res)=>{


    const { title } = req.body
    if (title != undefined){
        Category.create({
            title:title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/")
        })
    }else{
        res.redirect("/admin/categories/new")
    }
})


Router.get('/admin/categories',(req,res)=>{
    Category.findAll().then(categories =>{
        res.render('admin/categories/index',{
             categories:categories
        })
        
    })
})
module.exports = Router