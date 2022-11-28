/**
 * 21/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

const pool = require('./db');


async function verifyUser(userDetails) {
    if (!userDetails.userID || !userDetails.userPassword) {
        return false;
    }
    const emp_no = userDetails.userID;
    const birth_date = new Date(userDetails.userPassword);
    try {
        const confirmId = await pool.query(
            `SELECT * FROM Employees WHERE emp_no = ${emp_no};`
        );
        if (!confirmId) {
            return false;
        }
        const confirmPassword = new Date(confirmId.rows[0].birth_date);
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
        info.m_emp_count_total = (await pool.query(
            `SELECT COUNT(emp_no) FROM Employees WHERE gender='M';`
        )).rows[0].count;
        info.f_emp_count_total = (await pool.query(
            `SELECT COUNT(emp_no) FROM Employees WHERE gender='F';`
        )).rows[0].count;
        info.m_emp_count_current = (await pool.query(
            `SELECT COUNT(DISTINCT Employees.emp_no) FROM Salaries 
            RIGHT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M' AND to_date > DATE(NOW());`
        )).rows[0].count;
        info.f_emp_count_current = (await pool.query(
            `SELECT COUNT(DISTINCT Employees.emp_no) FROM Salaries 
            RIGHT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F' AND to_date > DATE(NOW());`
        )).rows[0].count;
        info.m_sal_sum_total = (await pool.query(
            `SELECT SUM(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M';`
        )).rows[0].sum;
        info.f_sal_sum_total = (await pool.query(
            `SELECT SUM(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F';`
        )).rows[0].sum;
        info.m_sal_sum_current = (await pool.query(
            `SELECT SUM(Salary) FROM Salaries 
            LEFT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M' AND to_date > DATE(NOW());`
        )).rows[0].sum;
        info.f_sal_sum_current = (await pool.query(
            `SELECT SUM(Salary) FROM Salaries 
            LEFT JOIN Employees ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F' AND to_date > DATE(NOW());`
        )).rows[0].sum;
        info.m_sal_count_total = (await pool.query(
            `SELECT COUNT(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='M';`
        )).rows[0].count;
        info.f_sal_count_total = (await pool.query(
            `SELECT COUNT(salary) FROM Employees 
            LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no 
            WHERE gender='F';`
        )).rows[0].count;
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
        const activeEmployees = (await pool.query(
            `SELECT dept_emp.dept_no, dept_name, COUNT(DISTINCT emp_no) 
            FROM dept_emp LEFT JOIN Departments ON dept_emp.dept_no = Departments.dept_no 
            WHERE to_date > DATE(NOW()) GROUP BY dept_name, dept_emp.dept_no 
            ORDER BY dept_emp.dept_no ASC;`
        )).rows;
        const yearlyPayroll = (await pool.query(
            `SELECT dept_no, SUM(salary) 
            FROM Salaries LEFT JOIN dept_emp ON Salaries.emp_no = dept_emp.emp_no 
            WHERE dept_emp.to_date > DATE(NOW()) AND Salaries.to_date > DATE(NOW()) 
            GROUP BY dept_no ORDER BY dept_no ASC;`
        )).rows;

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