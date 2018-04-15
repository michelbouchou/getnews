const db = require('../db/db')
const Sequelize = require('sequelize');

var News = db.define( 'news', {
    id: Sequelize.INTEGER,
    title: Sequelize.STRING,
})

News.sync()

module.exports = News