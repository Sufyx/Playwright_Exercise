/**
 * 22/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

const { test, expect } = require('@playwright/test');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5433,
  database: "postgres"
});

test('login-page elements', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Baseshift Exercise');
  const element = await page.innerText('.login-header');
  expect(element).toBe('Login');
});

test('info-page elements', async ({ page }) => {
  await page.goto('/information_page');
  await expect(page).toHaveTitle('Baseshift Exercise');

  let element = await page.innerText('.headerMain');
  expect(element).toBe('Information Page');
  element = await page.innerText('.headerActiveEmps');
  expect(element).toBe('Active Employees:');
  element = await page.innerText('.headerAlltimeSalaries');
  expect(element).toBe(
    'Fairness by Gender All Time: Workforce Balance and Salary Equality');
  element = await page.innerText('.headerCurrentSalaries');
  expect(element).toBe(
    'Current Fairness by Gender: Workforce Balance and Salary Equality');
  element = await page.innerText('.headerForecast');
  expect(element).toBe('Payroll Forecast');
});

test('successful login', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('1953-09-02');
  await page.getByLabel('Employee ID').click();
  await page.getByLabel('Employee ID').fill('10001');
  const errorMsg = await page.innerText('#loginError');
  expect(errorMsg).toBe('');
  await page.locator('#submit').click();
  await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/information_page');
});

test('failed login (wrong password)', async ({ page }) => {
  await page.goto('/');
  await page.locator('#emp_id').fill('10001');
  await page.locator('#password').fill('1954-09-02');
  await page.locator('#submit').click();
  await expect(page).toHaveURL('http://localhost:3000');
  await expect(page).not.toHaveURL('http://localhost:3000/information_page');
  const errorMsg = await page.innerText('#loginError');
  expect(errorMsg).toBe('Incorrect ID or password');
});

test('failed login (wrong id)', async ({ page }) => {
  await page.goto('/');
  await page.locator('#emp_id').fill('10002');
  await page.locator('#password').fill('1953-09-02');
  await page.locator('#submit').click();
  await expect(page).not.toHaveURL('http://localhost:3000/information_page');
  const errorMsg = await page.innerText('#loginError');
  expect(errorMsg).toBe('Incorrect ID or password');
});

test('failed login (no password)', async ({ page }) => {
  await page.goto('/');
  await page.locator('#password').fill('');
  await page.locator('#emp_id').fill('1953-09-02');
  await page.locator('#submit').click();
  await expect(page).not.toHaveURL('http://localhost:3000/information_page');
  const errorMsg = await page.innerText('#loginError');
  expect(errorMsg).toBe('Please enter ID and password');
});

test('failed login (no id)', async ({ page }) => {
  await page.goto('/');
  await page.locator('#password').fill('10001');
  await page.locator('#emp_id').fill('');
  await page.locator('#submit').click();
  await expect(page).not.toHaveURL('http://localhost:3000/information_page');
  let errorMsg = await page.innerText('#loginError');
  expect(errorMsg).toBe('Please enter ID and password');
});

test('login request', async ({ request }) => {
  let res = await request.post(`http://localhost:5000/routes/login`, {
    data: {
      userID: '10001',
      userPassword: '1953-09-02'
    }
  });
  expect(res.ok()).toBeTruthy();
  let data = await res.json();
  expect(data.confirmation).toBe(true);

  res = await request.post(`http://localhost:5000/routes/login`, {
    data: {
      userID: '499999',
      userPassword: '1958-05-01'
    }
  });
  expect(res.ok()).toBeTruthy();
  data = await res.json();
  expect(data.confirmation).toBe(true);
});

test('failed login request', async ({ request }) => {
  let res = await request.post(`http://localhost:5000/routes/login`, {
    data: {
      userID: '10001',
      userPassword: '1954-09-02'
    }
  });
  expect(res.ok()).toBeTruthy();
  let data = await res.json();
  expect(data.confirmation).toBe(false);

  res = await request.post(`http://localhost:5000/routes/login`, {
    data: {}
  });
  expect(res.ok()).toBeTruthy();
  data = await res.json();
  expect(data.confirmation).toBe(false);
});

test('login query', async ({ request }) => {
  const emp_no = '110303';
  const birth_date = new Date('1956-06-08');
  const res = await request.post(`http://localhost:5000/routes/login`, {
    data: {
      userID: emp_no,
      userPassword: birth_date
    }
  });
  const data = await res.json();

  const queryRes = await pool.query(
    `SELECT * FROM Employees WHERE emp_no = ${emp_no};`
  );
  expect(queryRes).toBeTruthy();

  let confirmUser = true;
  const confirmPassword = new Date(queryRes.rows[0].birth_date);
  if (confirmPassword.toDateString() !== birth_date.toDateString()) {
    confirmUser = false;
  }

  expect(data.confirmation).toBe(confirmUser);
});

test('failed login query', async ({ request }) => {
  const emp_no = '110303';
  const birth_date = new Date('1956-06-09');
  const res = await request.post(`http://localhost:5000/routes/login`, {
    data: {
      userID: emp_no,
      userPassword: birth_date
    }
  });
  const data = await res.json();

  const queryRes = await pool.query(
    `SELECT * FROM Employees WHERE emp_no = ${emp_no};`
  );
  expect(queryRes).toBeTruthy();

  let confirmUser = true;
  const confirmPassword = new Date(queryRes.rows[0].birth_date);
  if (confirmPassword.toDateString() !== birth_date.toDateString()) {
    confirmUser = false;
  }

  expect(data.confirmation).toBe(confirmUser);
});
