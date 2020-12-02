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

Router.post('/categories/delete',(req,res)=>{
    const { id } = req.body
    if (id != undefined){
        if (!isNaN(id)){
            Category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })
        }else{ //não for um número
            res.redirect('/admin/categories')
        }
    }else{ //NULL
        res.redirect('/admin/categories')

    }

})

Router.get('/admin/categories/edit/:id',(req,res)=>{
    const { id } = req.params
    Category.findByPk(id).then((category)=>{

        if(isNaN(id)){
            res.redirect('/admin/categories')
        }

        if (category != undefined){
            res.render('admin/categories/edit',{category:category})
        }else{
            res.redirect("/admin/categories")  
        }
    }).catch(erro=>{
        res.redirect("/admin/categories")
    })
})

Router.post('/categories/update',(req,res)=>{
    const { id, title } = req.body
    Category.update({title:title, slug: slugify(title)},{
        where:{id:id}
    }).then(()=>{
        res.redirect('/admin/categories')
    })

})




module.exports = Router