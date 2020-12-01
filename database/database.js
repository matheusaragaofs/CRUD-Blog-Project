const Sequelize =  require('sequelize')
const connection = new Sequelize('blogcrud','root','matheus@951478',{
    host: 'localhost',
    dialect: 'mysql',
    timezone:"-3:00"  //Brazil, é só procurar a timezone no wikipedia
 })

module.exports = connection