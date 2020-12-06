const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const session = require('express-session')

//Body Parser Aceitar dados do formulário
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json( ))
const categoriesController = require('./categories/CategoriesController')
const articleController = require('./articles/ArticleController')
const UsersController = require('./users/UsersController')


//Importando os Models
const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./users/User')
const { default: slugify } = require('slugify')

//Sessão, preciso chamar antes das rotas.
app.use(session({
    secret:"qualquercoisa",
    cookie:{maxAge:300000},
    resave: false,
    saveUninitialized: true

}))
//Utilizando as rotas
app.use([categoriesController, articleController, UsersController])


//Verifando Conexão
connection.authenticate().then(()=>{
    console.log('Banco de dados conectado corretamente')
}).catch((err)=>{
    console.log('Nao foi possivel conectar ao banco de dados')
})




//View Engine
app.set('view engine', 'ejs')





//Statics files
app.use(express.static('public'))


//Routes
app.get('/',(req,res)=>{
    Article.findAll({
        order:[['id','DESC']],
        limit:4
    }).then(articles=>{
        
        Category.findAll().then(categories=>{
            res.render('index',{articles:articles, categories:categories})
            
        })
        
    })
})

app.get('/:slug',(req,res)=>{
    const { slug }= req.params
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{
        if (article != undefined){
            Category.findAll().then(categories=>{
                res.render("article",{article:article,categories:categories})
            })
        }else{
            res.redirect('/')
        }
    }).catch(err=>{
        res.redirect('/')
    })
})

app.get('/category/:slug',(req,res)=>{
    const { slug } = req.params
    Category.findOne({ 
        where:{
            slug:slug
        }, 
        include: [{model:Article}]
        }).then(category=>{
            if (category != undefined){
                Category.findAll().then(categories=>{
                    res.render("index",{articles: category.articles, categories:categories})
                })
            }else{
                res.redirect('/')
            }
        }).catch(err=>{
            res.redirect('/')
        })
    })

app.listen(8080, ()=>{
    console.log('servidor rodando na porta 8080')
})