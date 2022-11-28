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
    await page.waitForTimeout(8000);
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
    await page.waitForTimeout(8000);
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
    let page_val = await page.innerHTML('#depts_00>div');
    expect(page_val).toBe("Marketing");
    page_val = await page.innerHTML('#depts_10>div');
    expect(page_val).toBe("Finance");
    page_val = await page.innerHTML('#depts_20>div');
    expect(page_val).toBe("Human Resources");
    page_val = await page.innerHTML('#depts_30>div');
    expect(page_val).toBe("Production");
    page_val = await page.innerHTML('#depts_40>div');
    expect(page_val).toBe("Development");
    page_val = await page.innerHTML('#depts_50>div');
    expect(page_val).toBe("Quality Management");
    page_val = await page.innerHTML('#depts_60>div');
    expect(page_val).toBe("Sales");
    page_val = await page.innerHTML('#depts_70>div');
    expect(page_val).toBe("Research");
    page_val = await page.innerHTML('#depts_80>div');
    expect(page_val).toBe("Customer Service");
});

test('Departments table numbers', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_01>div');
    expect(page_val).toBe("d001");
    page_val = await page.innerHTML('#depts_11>div');
    expect(page_val).toBe("d002");
    page_val = await page.innerHTML('#depts_21>div');
    expect(page_val).toBe("d003");
    page_val = await page.innerHTML('#depts_31>div');
    expect(page_val).toBe("d004");
    page_val = await page.innerHTML('#depts_41>div');
    expect(page_val).toBe("d005");
    page_val = await page.innerHTML('#depts_51>div');
    expect(page_val).toBe("d006");
    page_val = await page.innerHTML('#depts_61>div');
    expect(page_val).toBe("d007");
    page_val = await page.innerHTML('#depts_71>div');
    expect(page_val).toBe("d008");
    page_val = await page.innerHTML('#depts_81>div');
    expect(page_val).toBe("d009");
});

test('Departments table active employees', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_02>div');
    expect(page_val).toBe("14842");
    page_val = await page.innerHTML('#depts_12>div');
    expect(page_val).toBe("12437");
    page_val = await page.innerHTML('#depts_22>div');
    expect(page_val).toBe("12898");
    page_val = await page.innerHTML('#depts_32>div');
    expect(page_val).toBe("53304");
    page_val = await page.innerHTML('#depts_42>div');
    expect(page_val).toBe("61386");
    page_val = await page.innerHTML('#depts_52>div');
    expect(page_val).toBe("14546");
    page_val = await page.innerHTML('#depts_62>div');
    expect(page_val).toBe("37701");
    page_val = await page.innerHTML('#depts_72>div');
    expect(page_val).toBe("15441");
    page_val = await page.innerHTML('#depts_82>div');
    expect(page_val).toBe("17569");
});

test('Departments table expected salaries', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_03>div');
    expect(page_val).toBe("14842");
    page_val = await page.innerHTML('#depts_13>div');
    expect(page_val).toBe("12437");
    page_val = await page.innerHTML('#depts_23>div');
    expect(page_val).toBe("12898");
    page_val = await page.innerHTML('#depts_33>div');
    expect(page_val).toBe("53304");
    page_val = await page.innerHTML('#depts_43>div');
    expect(page_val).toBe("61386");
    page_val = await page.innerHTML('#depts_53>div');
    expect(page_val).toBe("14546");
    page_val = await page.innerHTML('#depts_63>div');
    expect(page_val).toBe("37701");
    page_val = await page.innerHTML('#depts_73>div');
    expect(page_val).toBe("15441");
    page_val = await page.innerHTML('#depts_83>div');
    expect(page_val).toBe("17569");
});

test('Departments table upcoming payroll', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_04>div');
    expect(page_val).toBe("99019452.83");
    page_val = await page.innerHTML('#depts_14>div');
    expect(page_val).toBe("81420828.00");
    page_val = await page.innerHTML('#depts_24>div');
    expect(page_val).toBe("68705388.67");
    page_val = await page.innerHTML('#depts_34>div');
    expect(page_val).toBe("301359947.42");
    page_val = await page.innerHTML('#depts_44>div');
    expect(page_val).toBe("346104087.50");
    page_val = await page.innerHTML('#depts_54>div');
    expect(page_val).toBe("79326603.00");
    page_val = await page.innerHTML('#depts_64>div');
    expect(page_val).toBe("279153816.83");
    page_val = await page.innerHTML('#depts_74>div');
    expect(page_val).toBe("87387535.25");
    page_val = await page.innerHTML('#depts_84>div');
    expect(page_val).toBe("98511184.08");
});

test('Departments table yearly payroll', async ({ page }) => {
    let page_val = await page.innerHTML('#depts_05>div');
    expect(page_val).toBe("1188233434");
    page_val = await page.innerHTML('#depts_15>div');
    expect(page_val).toBe("977049936");
    page_val = await page.innerHTML('#depts_25>div');
    expect(page_val).toBe("824464664");
    page_val = await page.innerHTML('#depts_35>div');
    expect(page_val).toBe("3616319369");
    page_val = await page.innerHTML('#depts_45>div');
    expect(page_val).toBe("4153249050");
    page_val = await page.innerHTML('#depts_55>div');
    expect(page_val).toBe("951919236");
    page_val = await page.innerHTML('#depts_65>div');
    expect(page_val).toBe("3349845802");
    page_val = await page.innerHTML('#depts_75>div');
    expect(page_val).toBe("1048650423");
    page_val = await page.innerHTML('#depts_85>div');
    expect(page_val).toBe("1182134209");
});
