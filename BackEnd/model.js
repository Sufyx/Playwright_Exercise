/**
 * 21/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

const { sequelize, models } = require('./models');
const { Op } = require("sequelize");


async function verifyUser(userDetails) {
    if (!userDetails.userID || !userDetails.userPassword) {
        return false;
    }
    const emp_no = userDetails.userID;
    const birth_date = new Date(userDetails.userPassword);
    try {
        const res = await models.Employee.findOne({ where: { emp_no: emp_no } });
        const confirmId = res.dataValues;
        
        if (!confirmId) {
            return false;
        }
        const confirmPassword = new Date(confirmId.birth_date);
        if (confirmPassword.toDateString() != birth_date.toDateString()) {
            return false;
        }
        return true;
    } catch (err) {
        console.error("Caught: ", err.message);
    }
}

async function getSalariesModel() {
    const info = {
        m_emp_count_total: 0,
        f_emp_count_total: 0,
        m_emp_count_current: 0,
        f_emp_count_current: 0,
        m_sal_sum_total: 0,
        f_sal_sum_total: 0,
        m_sal_sum_current: 0,
        f_sal_sum_current: 0,
        m_sal_count_total: 0,
        f_sal_count_total: 0
    }
    try {
        const employee = await models.Employee;
        const salary = await models.Salary;

        let res = await employee.findAndCountAll({ where: { gender: 'M' } });
        info.m_emp_count_total = res.count;

        res = await employee.findAndCountAll({ where: { gender: 'F' } });
        info.f_emp_count_total = res.count;
        res = await salary.findAll(
            {
                attributes: [
                    sequelize.fn('COUNT', sequelize.col('employee.emp_no')),
                ], where: {
                    to_date: { [Op.gt]: new Date(Date.now()) }
                }, include: [{
                    model: employee,
                    attributes: ['emp_no', 'gender']
                }], group: ["employee.emp_no"],
            },
        );

        let m_val = res.filter(emp => emp.dataValues.employee.dataValues.gender == 'M');
        info.m_emp_count_current = m_val.length;
        info.f_emp_count_current = res.length - m_val.length;

        console.log(" !-!-!");

        // why is this one so slow ?
        res = await salary.findAll(
            {
                attributes: [
                    'to_date',
                    'salary',
                ], include: [{
                    model: employee,
                    attributes: ['emp_no', 'gender']
                }],
                group: ["employee.emp_no", "salary.salary", "salary.to_date"],
            },);

        let salaries = res.map(emp => emp.dataValues.salary);
        let salary_sum = salaries.reduce((total, emp) => Number(total) + Number(emp));
        let salary_count = salaries.length;

        m_val = res.filter(emp => emp.dataValues.employee.dataValues.gender == 'M');
        let m_salaries = m_val.map(emp => emp.dataValues.salary);
        let m_sum = m_salaries.reduce((total, emp) => Number(total) + Number(emp));
        let m_count = m_salaries.length;

        info.m_sal_sum_total = m_sum;
        info.f_sal_sum_total = salary_sum - m_sum;

        let curr_salaries = res.filter(emp => new Date(emp.dataValues.to_date) > new Date(Date.now()));
        salaries = curr_salaries.map(emp => emp.dataValues.salary);
        salary_sum = salaries.reduce((total, emp) => Number(total) + Number(emp));
        m_val = curr_salaries.filter(emp => emp.dataValues.employee.dataValues.gender == 'M');
        m_salaries = m_val.map(emp => emp.dataValues.salary);
        m_sum = m_salaries.reduce((total, emp) => Number(total) + Number(emp));

        info.m_sal_sum_current = m_sum;
        info.f_sal_sum_current = salary_sum - m_sum;
        info.m_sal_count_total = m_count;
        info.f_sal_count_total = salary_count - m_count;
        return info;
    } catch (err) {
        console.error("Caught: ", err.message);
    }
}


async function getDepartmentsInfoModel() {
    const info = {
        activeEmployees: 0,
        yearlyPayroll: 0
    };

    try {
        const salary = await models.Salary;
        const department = await models.Department;
        const dept_emp = await models.Dept_emp;

        const res1 = await dept_emp.count({
            attributes: [
                'dept_emp.dept_no',
                'department.dept_name',
            ],
            include: [{
                model: department,
                attributes: ['dept_name', 'dept_no']
            }],
            distinct: true,
            col: 'emp_no',
            group: ['dept_emp.dept_no', 'department.dept_name'],
            order: [
                ['dept_emp.dept_no', 'ASC'],
            ],
        });
        const activeEmployees = [...res1];


        let currSalaries = await salary.findAll({
            where: {
                to_date: { [Op.gt]: new Date(Date.now()) },
            }
        });
        let currDepts = await dept_emp.findAll({
            attributes: { exclude: ['departmentDeptNo'] },
            where: {
                to_date: { [Op.gt]: new Date(Date.now()) },
            }
        });
        currSalaries = currSalaries.filter(sal =>
            new Date(sal.dataValues.to_date) > new Date(Date.now()));
        currDepts = currDepts.filter(dept =>
            new Date(dept.dataValues.to_date) > new Date(Date.now()));
        currSalaries = currSalaries.sort((a, b) =>
            (a.emp_no > b.emp_no) ? 1 : ((b.emp_no > a.emp_no) ? -1 : 0));
        currDepts = currDepts.sort((a, b) =>
            (a.emp_no > b.emp_no) ? 1 : ((b.emp_no > a.emp_no) ? -1 : 0));


        let deptSalaries = [];
        for (let i = 0; i < currSalaries.length; i++) {
            if (isNaN(deptSalaries[currDepts[i].dept_no])) {
                deptSalaries[currDepts[i].dept_no] = 0;
            } else {
                deptSalaries[currDepts[i].dept_no] += Number(currSalaries[i].salary);
            }
        }
        let yearlyPayroll = [];
        for (const key in deptSalaries) {
            yearlyPayroll.push({
                dept_no: key,
                sum: deptSalaries[key]
            });
        }
        yearlyPayroll = yearlyPayroll.sort((a, b) =>
            (a.dept_no > b.dept_no) ? 1 : ((b.dept_no > a.dept_no) ? -1 : 0));


        info.activeEmployees = activeEmployees;
        info.yearlyPayroll = yearlyPayroll;

        return info;
    } catch (err) {
        console.error("Caught: ", err.message);
    }
}


module.exports = {
    getDepartmentsInfoModel,
    getSalariesModel,
    verifyUser
}