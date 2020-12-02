const Sequelize =  require('sequelize')
const connection = new Sequelize('blogcrud','root','matheus@951478',{
    host: 'localhost',
    dialect: 'mysql',
    timezone:'-03:00'  //Timezone do Brasil
 })

module.exports = connection