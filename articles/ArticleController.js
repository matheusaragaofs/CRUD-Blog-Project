const express = require('express')
const Router = express.Router()
const Category = require('../categories/Category')
const Article =  require('./Article')
const slugify = require('slugify')

Router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        include: [{model: Category}] //Vai puxar os dados da tabela categoria graças ao relacionamento
    }).then(article=>{
            res.render('admin/articles/index',{
            article:article
        })
        
    })

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

Router.post('/articles/delete',(req,res)=>{
    const { id } = req.body
    if (id != undefined){
        if (!isNaN(id)){
            Article.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/articles')
            })
        }else{ //não for um número
            res.redirect('/admin/articles')
        }
    }else{ //NULL
        res.redirect('/admin/articles')

    }

})


Router.get('/admin/article/edit/:id',(req,res)=>{
    const { id } = req.params
    
    Article.findByPk(id,
        {
    }).then(article=>{
        if (isNaN(id)){ 
            res.redirect('/admin/articles')
        }  
        if (article != undefined){ 
            Category.findAll().then(category=>{

                res.render('admin/articles/edit',{article:article, category:category})
            })
        }else{
            res.redirect('/admin/articles')
        }
    }).catch(err=>{
        res.redirect('/admin/articles')
    })

})


Router.post('/admin/article/update',(req,res)=>{
    const { id, title , body, category} = req.body
    Article.update(
        {title:title,
         body:body, 
         slug: slugify(title),
         categoryId:category},
         {where:{
             id:id
         }}).then(()=>{
             res.redirect('/admin/articles')
         })
})

module.exports = Router