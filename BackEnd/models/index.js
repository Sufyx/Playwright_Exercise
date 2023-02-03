'use strict';

const Sequelize = require('sequelize');
const config = require('../config/config');
const getEmployeeModel = require('./employee');
const getSalaryModel = require('./salary');
const getDept_empModel = require('./dept_emp');
const getDepartmentModel = require('./department');


const devConfig = config.development;
const sequelize = new Sequelize(devConfig.database, devConfig.username, devConfig.password, 
  {
    dialect: 'postgres',
    host: devConfig.host,
    port: 5433,
    logging: false
  });

const models = {
  Employee: getEmployeeModel(sequelize, Sequelize),
  Salary: getSalaryModel(sequelize, Sequelize),
  Dept_emp: getDept_empModel(sequelize, Sequelize),
  Department: getDepartmentModel(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


module.exports = {models, sequelize};
