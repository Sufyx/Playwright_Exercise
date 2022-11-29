'use strict';

// const fs = require('fs');
// const path = require('path');
// const basename = path.basename(__filename);
// const process = require('process');
// const env = process.env.NODE_ENV || 'development';
// const db = {};
// import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
const config = require('../config/config');
const getEmployeeModel = require('./employee');
const getSalaryModel = require('./salary');
const getDept_empModel = require('./dept_emp');
const getDepartmentModel = require('./department');

// const sequelize = new Sequelize(
//   "postgres",
//   "postgres",
//   "1234",
//   {dialect: "postgres"}
// );
// let sequelize;
// if (config.use_env_variable) {
//   sequelize =
//     new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize =
//     new Sequelize(config.database, config.username, config.password, config);
// }
const devConfig = config.development;
const sequelize = new Sequelize(devConfig.database, devConfig.username, devConfig.password, 
  {
    dialect: 'postgres',
    host: devConfig.host,
  });

const models = {
  Employee: getEmployeeModel(sequelize, Sequelize),
  Salary: getSalaryModel(sequelize, Sequelize),
  Dept_emp: getDept_empModel(sequelize, Sequelize),
  Department: getDepartmentModel(sequelize, Sequelize)
};

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

// export { sequelize };
module.exports = {models, sequelize};

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// module.exports = db;
