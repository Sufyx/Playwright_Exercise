/**
 * 22/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

import axios from 'axios';
const { test, expect } = require('@playwright/test');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5433,
  database: "postgres"
});


test('active employees count', async ({ request }) => {
  const direct_query = (await pool.query(
    `SELECT COUNT(DISTINCT emp_no) FROM Salaries 
    WHERE to_date > DATE(NOW());`
  )).rows[0].count;
  const query_val = Number(direct_query);

  const request_query = await request.get(`http://localhost:5000/routes/salariesInfo`);
  const data = await request_query.json();
  expect(request_query.ok()).toBeTruthy();

  const request_val = Number(data.salariesInfo.m_emp_count_current)
    + Number(data.salariesInfo.f_emp_count_current);

  expect(query_val).toBe(request_val);
});

async function getQueryByGender(query, gender, isCurrent) {
  let dateLimit = '';
  if (isCurrent) {
    dateLimit = 'AND to_date > DATE(NOW())';
  }
  const direct_query = (await pool.query(
    `${query} WHERE gender='${gender}' ${dateLimit};`
  )).rows[0];
  return direct_query;
}

async function queryEmployeeCount(gender, isCurrent) {
  const query_res = await getQueryByGender(
    `SELECT COUNT(DISTINCT Employees.emp_no) FROM Employees
    LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no`,
    gender, isCurrent);
  return Number(query_res.count);
}

async function querySalarySum(gender, isCurrent) {
  const query_res = await getQueryByGender(
    `SELECT SUM(salary) FROM Employees 
    LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no`,
    gender, isCurrent);
  return Number(query_res.sum);
}

async function querySalaryCount(gender, isCurrent) {
  const query_res = await getQueryByGender(
    `SELECT COUNT(salary) FROM Employees 
     LEFT JOIN Salaries ON Employees.emp_no = Salaries.emp_no`,
    gender, isCurrent);
  return Number(query_res.count);
}

/** Table 1 **/

// Column 1 - Number of employees all time
test('all-time employees count', async ({ request }) => {

  const query_male_num = await queryEmployeeCount('M');
  const query_female_num = await queryEmployeeCount('F');

  const res = await request.get(`http://localhost:5000/routes/salariesInfo`);
  expect(res.ok()).toBeTruthy();
  const data = await res.json();

  const request_male_num = Number(data.salariesInfo.m_emp_count_total);
  const request_female_num = Number(data.salariesInfo.f_emp_count_total);

  expect(request_male_num).toBe(query_male_num);
  expect(request_female_num).toBe(query_female_num);

});

// Column 2 - Number of employees all time
test('all-time average salary', async ({ request }) => {

  const query_male_salary_num = await querySalaryCount('M');
  const query_female_salary_num = await querySalaryCount('F');
  const query_male_salary_sum = await querySalarySum('M');
  const query_female_salary_sum = await querySalarySum('F');
  const query_male_average = query_male_salary_sum / query_male_salary_num;
  const query_female_average = query_female_salary_sum / query_female_salary_num;

  const res = await request.get(`http://localhost:5000/routes/salariesInfo`);
  expect(res.ok()).toBeTruthy();
  const data = await res.json();
  const request_male_average =
    Number(data.salariesInfo.m_sal_sum_total) /
    Number(data.salariesInfo.m_sal_count_total);
  const request_female_average =
    Number(data.salariesInfo.f_sal_sum_total) /
    Number(data.salariesInfo.f_sal_count_total);

  expect(request_male_average).toBe(query_male_average);
  expect(request_female_average).toBe(query_female_average);

});



/** Table 2 **/

// Column 1 - number of active employees
test('current employees count', async ({ request }) => {

  const query_male_num = await queryEmployeeCount('M', true);
  const query_female_num = await queryEmployeeCount('F', true);

  const res = await request.get(`http://localhost:5000/routes/salariesInfo`);
  expect(res.ok()).toBeTruthy();
  const data = await res.json();

  const request_male_num = Number(data.salariesInfo.m_emp_count_current);
  const request_female_num = Number(data.salariesInfo.f_emp_count_current);

  expect(request_male_num).toBe(query_male_num);
  expect(request_female_num).toBe(query_female_num);

});

// Column 2 - Number of employees all time
test('current average salary', async ({ request }) => {

  const query_male_num = await queryEmployeeCount('M', true);
  const query_female_num = await queryEmployeeCount('F', true);
  const query_male_salary_sum = await querySalarySum('M', true);
  const query_female_salary_sum = await querySalarySum('F', true);
  const query_male_average = query_male_salary_sum / query_male_num;
  const query_female_average = query_female_salary_sum / query_female_num;

  const res = await request.get(`http://localhost:5000/routes/salariesInfo`);
  expect(res.ok()).toBeTruthy();
  const data = await res.json();
  const request_male_average =
    Number(data.salariesInfo.m_sal_sum_current) /
    Number(data.salariesInfo.m_emp_count_current);
  const request_female_average =
    Number(data.salariesInfo.f_sal_sum_current) /
    Number(data.salariesInfo.f_emp_count_current);

  expect(request_male_average).toBe(query_male_average);
  expect(request_female_average).toBe(query_female_average);

});



/** Table 3 **/

async function getDeptQuery(query, column_name) {
  const direct_query = (await pool.query(`${query}`)).rows;
  const column_val = [];
  for (let i = 0; i < direct_query.length; i++) {
    const row = (direct_query[i]);
    column_val.push(row[column_name]);
  }
  return column_val.sort();
}
async function getDeptReq(column_name, column_type) {
  const res = await axios.get(`http://localhost:5000/routes/departmentsInfo`);
  const deptInfo = res.data.departmentsInfo[column_type];
  const column_val = [];
  for (let i = 0; i < deptInfo.length; i++) {
    const row = (deptInfo[i]);
    column_val.push(row[column_name]);
  }
  return column_val.sort();
}

// Column 1 - Department names
test('department names', async ({ page }) => {
  const dept_names_query = await getDeptQuery(
    `SELECT dept_name FROM Departments;`
    , "dept_name");
  const dept_names_req = await getDeptReq("dept_name", "activeEmployees");
  expect(dept_names_query).toStrictEqual(dept_names_req);
});

// Column 2 - Department names
test('department numbers', async () => {
  const dept_names_query = await getDeptQuery(
    `SELECT dept_no FROM Departments;`
    , "dept_no");
  const dept_names_req = await getDeptReq("dept_no", "activeEmployees");
  expect(dept_names_query).toStrictEqual(dept_names_req);
});

// Column 3 - Department active employees
test('department active employees', async () => {
  const dept_names_query = await getDeptQuery(
    `SELECT dept_emp.dept_no, COUNT(DISTINCT emp_no) 
    FROM dept_emp LEFT JOIN Departments ON 
    dept_emp.dept_no = Departments.dept_no 
    WHERE to_date > DATE(NOW()) GROUP BY dept_emp.dept_no;`
    , "count");
  const dept_names_req = await getDeptReq("count", "activeEmployees");
  expect(dept_names_query).toStrictEqual(dept_names_req);
});

// Column 4 - Department expected salaries
test('department expected salaries', async () => {
  const dept_names_query = await getDeptQuery(
    `SELECT dept_no, COUNT(Salary) FROM Salaries 
    LEFT JOIN dept_emp ON Salaries.emp_no = dept_emp.emp_no 
    WHERE salaries.to_date > DATE(NOW()) AND 
    dept_emp.to_date > DATE(NOW()) GROUP BY dept_no;`
    , "count");
  const dept_names_req = await getDeptReq("count", "activeEmployees");
  expect(dept_names_query).toStrictEqual(dept_names_req);
});

// Column 5 - Department expected monthly payroll
test('department expected payroll', async () => {
  const dept_names_query = await getDeptQuery(
    `SELECT dept_no, SUM(Salary) FROM Salaries 
    LEFT JOIN dept_emp ON Salaries.emp_no = dept_emp.emp_no 
    WHERE salaries.to_date > DATE(NOW()) AND 
    dept_emp.to_date > DATE(NOW()) GROUP BY dept_no;`
    , "sum");
  const dept_names_req = await getDeptReq("sum", "yearlyPayroll");
  for (let i = 0; i < dept_names_query.length; i++) {
    dept_names_query[i] = Number(dept_names_query[i]) / 12;
    dept_names_req[i] = Number(dept_names_req[i]) / 12;
  }
  expect(dept_names_query).toStrictEqual(dept_names_req);
});
// Column 5 - Department yearly payroll
test('department yearly payroll', async () => {
  const dept_names_query = await getDeptQuery(
    `SELECT dept_no, SUM(Salary) FROM Salaries 
    LEFT JOIN dept_emp ON Salaries.emp_no = dept_emp.emp_no 
    WHERE salaries.to_date > DATE(NOW()) AND 
    dept_emp.to_date > DATE(NOW()) GROUP BY dept_no;`
    , "sum");
  const dept_names_req = await getDeptReq("sum", "yearlyPayroll");
  expect(dept_names_query).toStrictEqual(dept_names_req);
});
