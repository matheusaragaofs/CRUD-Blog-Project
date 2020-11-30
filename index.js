const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
//Body Parser Aceitar dados do formulário
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json( ))
const categoriesController = require('./categories/CategoriesController')
const articleController = require('./articles/ArticleController')


//Importando os Models
const Article = require('./articles/Article')
const Category = require('./categories/Category')

//Utilizando as rotas
app.use([categoriesController, articleController])

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
    res.render('index')
})

app.listen(8080, ()=>{
    console.log('servidor rodando na porta 8080')
})