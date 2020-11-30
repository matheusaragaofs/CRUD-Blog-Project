const Sequelize =  require('sequelize')
const connection = new Sequelize('blogcrud','root','matheus@951478',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection