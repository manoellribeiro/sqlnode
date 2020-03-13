const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Tech.init(connection);

Address.associate(connection.models);  //Passa os models que estão dentro da conexão para minha função associate
User.associate(connection.models);  //Passa os models que estão dentro da conexão para minha função associate
Tech.associate(connection.models);  //Passa os models que estão dentro da conexão para minha função associate

module.exports = connection;
