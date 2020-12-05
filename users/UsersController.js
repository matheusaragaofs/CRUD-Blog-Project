const express = require('express')
const Router = express.Router()
const User = require('./User')
//npm install --save bcryptjs para fazer o hash
//npm install --save express-session
const bcrypt = require('bcryptjs')


Router.get('/admin/users',(req,res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/users',{users:users})

    })

})


Router.get('/admin/users/create',(req,res)=>{
    res.render('admin/users/create')
})

Router.post('/users/create',(req,res)=>{
    const { email, password } = req.body


    User.findOne({
        where:{
            email:email
        }
    }).then(user=>{
        if (user == undefined){
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password,salt)
        
            User.create({
                email:email,
                password:hash
            }).then(()=>{
                res.redirect('/admin/users/')
            }).catch(err=>{
                res.json({error:err})
            })
        
        }else{
           res.json({error:'Esse email já existe'})
        }
    })
    
})

Router.get('/login',(req,res)=>{
    res.render('admin/users/login')
})

Router.post('/authenticate',(req,res)=>{
    const { email, password } = req.body
    User.findOne({where:{email:email}}).then(user=>{
        if (user != undefined){
            var correct = bcrypt.compareSync(password,user.password)
            if (correct){
                req.session.usuarios= {
                    user: user.email,
                    id: user.id,
                    senha: user.password
                }
        
                res.json(req.session.usuarios)
            }else{
                res.send('Nao ta certo')
            }            
        }else{
            res.send('Nao ta certo')
        }
        
    })
})

    
module.exports = Router