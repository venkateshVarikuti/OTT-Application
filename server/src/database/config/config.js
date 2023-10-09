const Sequelize = require('sequelize');

const sequelize= new Sequelize('database_name', 'username', 'password', {
  host: 'your_rds_endpoint',
  dialect: 'postgres',
});

module.exports = sequelize;
