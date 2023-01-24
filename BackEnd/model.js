/**
 * 21/11/2022
 * Asaf Gilboa
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
            ], where: {
                to_date: { [Op.gt]: new Date(Date.now()) }
            }, include: [{
                model: department,
                attributes: ['dept_name', 'dept_no']
            }],
            col: 'emp_no',
            distinct: true,
            group: ['dept_emp.dept_no', 'department.dept_name'],
            order: [['dept_emp.dept_no', 'ASC'],],
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

        let [results, metadata] = await sequelize.query(
            `SELECT COUNT(emp_no) FROM Employees WHERE gender='M';`
        );
        info.m_emp_count_total = results[0].count;

        [results, metadata] = await sequelize.query(
            `SELECT COUNT(emp_no) FROM Employees WHERE gender='F';`
        );
        info.f_emp_count_total = results[0].count;

        [results, metadata] = await sequelize.query(
            `SELECT COUNT(DISTINCT Employees.emp_no) FROM Salaries 
            RIGHT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M' AND to_date > DATE(NOW());`
        );
        info.m_emp_count_current = results[0].count;

        [results, metadata] = await sequelize.query(
            `SELECT COUNT(DISTINCT Employees.emp_no) FROM Salaries 
            RIGHT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F' AND to_date > DATE(NOW());`
        );
        info.f_emp_count_current = results[0].count;

        [results, metadata] = await sequelize.query(
            `SELECT SUM(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M';`
        );
        info.m_sal_sum_total = results[0].sum;

        [results, metadata] = await sequelize.query(
            `SELECT SUM(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F';`
        );
        info.f_sal_sum_total = results[0].sum;

        [results, metadata] = await sequelize.query(
            `SELECT SUM(Salary) FROM Salaries 
            LEFT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M' AND to_date > DATE(NOW());`
        );
        info.m_sal_sum_current = results[0].sum;

        [results, metadata] = await sequelize.query(
            `SELECT SUM(Salary) FROM Salaries 
            LEFT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F' AND to_date > DATE(NOW());`
        );
        info.f_sal_sum_current = results[0].sum;

        [results, metadata] = await sequelize.query(
            `SELECT COUNT(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M';`
        );
        info.m_sal_count_total = results[0].count;

        [results, metadata] = await sequelize.query(
            `SELECT COUNT(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F';`
        );
        info.f_sal_count_total = results[0].count;

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


// async function getSalariesModel2() {
//     const info = {
//         m_emp_count_total: 0,
//         f_emp_count_total: 0,
//         m_emp_count_current: 0,
//         f_emp_count_current: 0,
//         m_sal_sum_total: 0,
//         f_sal_sum_total: 0,
//         m_sal_sum_current: 0,
//         f_sal_sum_current: 0,
//         m_sal_count_total: 0,
//         f_sal_count_total: 0
//     }
//     try {
//         const employee = await models.Employee;
//         const salary = await models.Salary;
//         const sals_empno = await salary.findAll({
//             attributes: ['salary', 'emp_no', "to_date"],
//         });
//         const empno_gen = await employee.findAll({
//             attributes: ['emp_no', 'gender'],
//         });

//         let gender_data = [];
//         let m_emps = 0;
//         let f_emps = 0;
//         for (let i = 0; i < empno_gen.length; i++) {
//             gender_data[empno_gen[i].emp_no] = empno_gen[i].gender;
//             if (empno_gen[i].gender == 'M') {
//                 m_emps++;
//             } else {
//                 f_emps++;
//             }
//         }
//         let m_salary_sum = 0;
//         let f_salary_sum = 0;
//         let m_salary_count = 0;
//         let f_salary_count = 0;
//         let m_salary_sum_curr = 0;
//         let f_salary_sum_curr = 0;
//         let m_salary_count_curr = 0;
//         let f_salary_count_curr = 0;
//         for (let i = 0; i < sals_empno.length; i++) {
//             if (gender_data[sals_empno[i].emp_no] == 'M') {
//                 m_salary_sum += Number(sals_empno[i].salary);
//                 m_salary_count++;
//                 if (new Date(sals_empno[i].to_date) > new Date(Date.now())) {
//                     m_salary_sum_curr += Number(sals_empno[i].salary);
//                     m_salary_count_curr++;
//                 }
//             } else {
//                 f_salary_sum += Number(sals_empno[i].salary);
//                 f_salary_count++;
//                 if (new Date(sals_empno[i].to_date) > new Date(Date.now())) {
//                     f_salary_sum_curr += Number(sals_empno[i].salary);
//                     f_salary_count_curr++;
//                 }
//             }
//         }

//         info.m_emp_count_total = m_emps
//         info.f_emp_count_total = f_emps
//         info.m_emp_count_current = m_salary_count_curr;
//         info.f_emp_count_current = f_salary_count_curr;
//         info.m_sal_sum_total = m_salary_sum;
//         info.f_sal_sum_total = f_salary_sum;
//         info.m_sal_count_total = m_salary_count;
//         info.f_sal_count_total = f_salary_count;
//         info.m_sal_sum_current = m_salary_sum_curr;
//         info.f_sal_sum_current = f_salary_sum_curr;

//         return info;
//     } catch (err) {
//         console.error("Caught: ", err.message);
//     }
// }