const Sequelize = require('sequelize');

const sequelize = new Sequelize('todos', 'root', 'root', {
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

module.exports = sequelize