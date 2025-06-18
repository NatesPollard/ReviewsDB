const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Review;