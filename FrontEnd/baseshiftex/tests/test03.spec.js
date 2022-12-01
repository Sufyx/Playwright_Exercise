/**
 * 27/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

const { test, expect } = require('@playwright/test');


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/information_page');
});

test('All-time salaries table', async ({ page }) => {
    await page.waitForTimeout(10000);
    let page_val = await page.innerHTML('#alltime_salaries_00>div');
    expect(page_val).toBe("179973");
    page_val = await page.innerHTML('#alltime_salaries_01>div');
    expect(page_val).toBe("63838");
    page_val = await page.innerHTML('#alltime_salaries_10>div');
    expect(page_val).toBe("120051");
    page_val = await page.innerHTML('#alltime_salaries_11>div');
    expect(page_val).toBe("63769");
});

test('Current salaries table', async ({ page }) => {
    await page.waitForTimeout(10000);
    let page_val = await page.innerHTML('#current_salaries_00>div');
    expect(page_val).toBe("144114");
    page_val = await page.innerHTML('#current_salaries_01>div');
    expect(page_val).toBe("72044");
    page_val = await page.innerHTML('#current_salaries_10>div');
    expect(page_val).toBe("96010");
    page_val = await page.innerHTML('#current_salaries_11>div');
    expect(page_val).toBe("71963");
});

test('Departments table names', async ({ page }) => {
    // await page.waitForTimeout(5000);
    let page_val = await page.innerHTML('#depts_00');
    expect(page_val).toBe("Marketing");
    page_val = await page.innerHTML('#depts_10');
    expect(page_val).toBe("Finance");
    page_val = await page.innerHTML('#depts_20');
    expect(page_val).toBe("Human Resources");
    page_val = await page.innerHTML('#depts_30');
    expect(page_val).toBe("Production");
    page_val = await page.innerHTML('#depts_40');
    expect(page_val).toBe("Development");
    page_val = await page.innerHTML('#depts_50');
    expect(page_val).toBe("Quality Management");
    page_val = await page.innerHTML('#depts_60');
    expect(page_val).toBe("Sales");
    page_val = await page.innerHTML('#depts_70');
    expect(page_val).toBe("Research");
    page_val = await page.innerHTML('#depts_80');
    expect(page_val).toBe("Customer Service");
});

test('Departments table numbers', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_01');
    expect(page_val).toBe("d001");
    page_val = await page.innerHTML('#depts_11');
    expect(page_val).toBe("d002");
    page_val = await page.innerHTML('#depts_21');
    expect(page_val).toBe("d003");
    page_val = await page.innerHTML('#depts_31');
    expect(page_val).toBe("d004");
    page_val = await page.innerHTML('#depts_41');
    expect(page_val).toBe("d005");
    page_val = await page.innerHTML('#depts_51');
    expect(page_val).toBe("d006");
    page_val = await page.innerHTML('#depts_61');
    expect(page_val).toBe("d007");
    page_val = await page.innerHTML('#depts_71');
    expect(page_val).toBe("d008");
    page_val = await page.innerHTML('#depts_81');
    expect(page_val).toBe("d009");
});

test('Departments table active employees', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_02');
    expect(page_val).toBe("14842");
    page_val = await page.innerHTML('#depts_12');
    expect(page_val).toBe("12437");
    page_val = await page.innerHTML('#depts_22');
    expect(page_val).toBe("12898");
    page_val = await page.innerHTML('#depts_32');
    expect(page_val).toBe("53304");
    page_val = await page.innerHTML('#depts_42');
    expect(page_val).toBe("61386");
    page_val = await page.innerHTML('#depts_52');
    expect(page_val).toBe("14546");
    page_val = await page.innerHTML('#depts_62');
    expect(page_val).toBe("37701");
    page_val = await page.innerHTML('#depts_72');
    expect(page_val).toBe("15441");
    page_val = await page.innerHTML('#depts_82');
    expect(page_val).toBe("17569");
});

test('Departments table expected salaries', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_03');
    expect(page_val).toBe("14842");
    page_val = await page.innerHTML('#depts_13');
    expect(page_val).toBe("12437");
    page_val = await page.innerHTML('#depts_23');
    expect(page_val).toBe("12898");
    page_val = await page.innerHTML('#depts_33');
    expect(page_val).toBe("53304");
    page_val = await page.innerHTML('#depts_43');
    expect(page_val).toBe("61386");
    page_val = await page.innerHTML('#depts_53');
    expect(page_val).toBe("14546");
    page_val = await page.innerHTML('#depts_63');
    expect(page_val).toBe("37701");
    page_val = await page.innerHTML('#depts_73');
    expect(page_val).toBe("15441");
    page_val = await page.innerHTML('#depts_83');
    expect(page_val).toBe("17569");
});

test('Departments table upcoming payroll', async ({ page }) => {
    // await page.goto('http://localhost:3000/information_page');
    // await page.waitForTimeout(7000);
    let page_val = await page.innerHTML('#depts_04');
    expect(Number(page_val)).toBeGreaterThan(99000000);
    page_val = await page.innerHTML('#depts_14');
    expect(Number(page_val)).toBeGreaterThan(81410000);
    page_val = await page.innerHTML('#depts_24');
    expect(Number(page_val)).toBeGreaterThan(68700000);
    page_val = await page.innerHTML('#depts_34');
    expect(Number(page_val)).toBeGreaterThan(301320000);
    page_val = await page.innerHTML('#depts_44');
    expect(Number(page_val)).toBeGreaterThan(346000000);
    page_val = await page.innerHTML('#depts_54');
    expect(Number(page_val)).toBeGreaterThan(79300000);
    page_val = await page.innerHTML('#depts_64');
    expect(Number(page_val)).toBeGreaterThan(279130000);
    page_val = await page.innerHTML('#depts_74');
    expect(Number(page_val)).toBeGreaterThan(87360000);
    page_val = await page.innerHTML('#depts_84');
    expect(Number(page_val)).toBeGreaterThan(98500000);
});

test('Departments table yearly payroll', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_05');
    expect(Number(page_val)).toBeGreaterThan(1188000000);
    page_val = await page.innerHTML('#depts_15');
    expect(Number(page_val)).toBeGreaterThan(976010000);
    page_val = await page.innerHTML('#depts_25');
    expect(Number(page_val)).toBeGreaterThan(824330000);
    page_val = await page.innerHTML('#depts_35');
    expect(Number(page_val)).toBeGreaterThan(3616100000);
    page_val = await page.innerHTML('#depts_45');
    expect(Number(page_val)).toBeGreaterThan(4150230000);
    page_val = await page.innerHTML('#depts_55');
    expect(Number(page_val)).toBeGreaterThan(951700000);
    page_val = await page.innerHTML('#depts_65');
    expect(Number(page_val)).toBeGreaterThan(3340810000);
    page_val = await page.innerHTML('#depts_75');
    expect(Number(page_val)).toBeGreaterThan(1046620000);
    page_val = await page.innerHTML('#depts_85');
    expect(Number(page_val)).toBeGreaterThan(1180100000);
});
