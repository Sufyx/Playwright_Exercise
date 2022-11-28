/**
 * 20/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
*/

import '../App.css';
import { React, useState, useEffect } from 'react';
import {
    VStack, Heading, Box, StackDivider, Skeleton,
    Table, Thead, Tbody, Tr, Th, Td, TableContainer
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import TestResults from '../components/TestResults';


export default function InfoPage() {

    const [salariesInfo, setSalariesInfo] = useState({
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
    });

    const [departmentsInfo, setDepartmentsInfo] = useState([]);
    const [salariesLoading, setSalariesLoading] = useState(false);
    const [departmentsLoading, setDepartmentsLoading] = useState(false);


    useEffect(() => {
        fetchInfo();
    }, []);


    async function fetchInfo() {
        setSalariesLoading(true);
        let res = await axios.get(`http://localhost:5000/routes/salariesInfo`);

        const salInfo = {
            m_emp_count_total: Number(res.data.salariesInfo.m_emp_count_total),
            f_emp_count_total: Number(res.data.salariesInfo.f_emp_count_total),
            m_emp_count_current: Number(res.data.salariesInfo.m_emp_count_current),
            f_emp_count_current: Number(res.data.salariesInfo.f_emp_count_current),
            m_sal_sum_total: Number(res.data.salariesInfo.m_sal_sum_total),
            f_sal_sum_total: Number(res.data.salariesInfo.f_sal_sum_total),
            m_sal_sum_current: Number(res.data.salariesInfo.m_sal_sum_current),
            f_sal_sum_current: Number(res.data.salariesInfo.f_sal_sum_current),
            m_sal_count_total: Number(res.data.salariesInfo.m_sal_count_total),
            f_sal_count_total: Number(res.data.salariesInfo.f_sal_count_total),
        }
        setSalariesInfo(salariesInfo => ({ ...salInfo }));

        setSalariesLoading(false);
        setDepartmentsLoading(true);

        res = await axios.get(`http://localhost:5000/routes/departmentsInfo`);
        const deptInfo = res.data.departmentsInfo;

        const deptInfoArr = [];
        for (let i = 0; i < deptInfo.activeEmployees.length; i++) {
            const line = {
                dept_name: deptInfo.activeEmployees[i].dept_name,
                dept_number: deptInfo.activeEmployees[i].dept_no,
                active_employees: deptInfo.activeEmployees[i].count,
                num_of_salaries_expect: deptInfo.activeEmployees[i].count,
                monthly_payroll:
                    (Number(deptInfo.yearlyPayroll[i].sum) / 12).toFixed(2),
                yearly_payroll: deptInfo.yearlyPayroll[i].sum
            }
            deptInfoArr.push(line);
        }

        setDepartmentsInfo(departmentsInfo => ([...deptInfoArr]));
        setDepartmentsLoading(false);
    }

    const basicTableStyle = {
        variant: 'simple',
        boxShadow: 'outline',
        borderRadius: "3px",
        fontWeight: 'bold',
        size: 'lg'
    }
    const basicHeaders = {
        textShadow: '0px 0px 1px #008080',
        fontFamily: 'Merriweather',
        noOfLines: 1
    }


    return (
        <Box className='info_page_container'
            bgGradient='linear(to-bl, gray.200, teal.100)'>
            <VStack divider={<StackDivider borderColor='gray.200' />}
                align='center'>

                <Box mt='1%'>
                    <Heading fontFamily='Merriweather' size='2xl' py='2%'
                        textShadow='0px 0px 3px #008080' className='headerMain'>
                        Information Page
                    </Heading>
                </Box>

                <VStack py='1%'>
                    <Heading sx={basicHeaders} size='lg'
                        className='headerActiveEmps' >
                        Active Employees:
                    </Heading>
                    <Skeleton isLoaded={!salariesLoading}>
                        <Heading size='2xl' noOfLines={1} id="active_emp_num"
                            textShadow='0px 0px 2px gray'>
                            {salariesInfo.m_emp_count_current +
                                salariesInfo.f_emp_count_current}
                        </Heading>
                    </Skeleton>
                </VStack>

                <VStack py='1%'>
                    <Heading sx={basicHeaders} fontSize='1.7vw'
                        className='headerAlltimeSalaries'>
                        Fairness by Gender All Time:
                        Workforce Balance and Salary Equality
                    </Heading>

                    <TableContainer py='1%' w='70%'>
                        <Table sx={basicTableStyle} w='100%'>
                            <Thead bg='gray.600'>
                                <Tr >
                                    <Th color='white'>Gender</Th>
                                    <Th color='white'>Number of Employees</Th>
                                    <Th color='white'>Average Salary</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr bg='gray.300'>
                                    <Td>M</Td>
                                    <Td id="alltime_salaries_00">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {salariesInfo.m_emp_count_total}
                                        </Skeleton>
                                    </Td>
                                    <Td id="alltime_salaries_01">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {!salariesInfo.m_sal_count_total ? 0 :
                                                parseInt(salariesInfo.m_sal_sum_total /
                                                    salariesInfo.m_sal_count_total)}
                                        </Skeleton>
                                    </Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td>F</Td>
                                    <Td id="alltime_salaries_10">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {salariesInfo.f_emp_count_total}
                                        </Skeleton>
                                    </Td>
                                    <Td id="alltime_salaries_11">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {!salariesInfo.f_sal_count_total ? 0 :
                                                parseInt(salariesInfo.f_sal_sum_total /
                                                    salariesInfo.f_sal_count_total)}
                                        </Skeleton>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>

                <VStack py='1%'>
                    <Heading sx={basicHeaders} fontSize='1.7vw'
                        className='headerCurrentSalaries'>
                        Current Fairness by Gender:
                        Workforce Balance and Salary Equality
                    </Heading>

                    <TableContainer py='1%' w='70%'>
                        <Table sx={basicTableStyle}>
                            <Thead>
                                <Tr bg='gray.600'>
                                    <Th color='white'>Gender</Th>
                                    <Th color='white'>Number of Employees</Th>
                                    <Th color='white'>Average Salary</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr bg='gray.300'>
                                    <Td>M</Td>
                                    <Td id="current_salaries_00">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {salariesInfo.m_emp_count_current}
                                        </Skeleton>
                                    </Td>
                                    <Td id="current_salaries_01">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {!salariesInfo.m_emp_count_current ? 0 :
                                                parseInt(salariesInfo.m_sal_sum_current /
                                                    salariesInfo.m_emp_count_current)}
                                        </Skeleton>
                                    </Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td>F</Td>
                                    <Td id="current_salaries_10">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {salariesInfo.f_emp_count_current}
                                        </Skeleton>
                                    </Td>
                                    <Td id="current_salaries_11">
                                        <Skeleton isLoaded={!salariesLoading}>
                                            {!salariesInfo.f_emp_count_current ? 0 :
                                                parseInt(salariesInfo.f_sal_sum_current /
                                                    salariesInfo.f_emp_count_current)}
                                        </Skeleton>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>

                <VStack w='100%'>
                    <Heading sx={basicHeaders} size='lg'
                        className='headerForecast'>
                        Payroll Forecast
                    </Heading>

                    <TableContainer bg='gray.200' fontWeight='bold'
                        boxShadow='dark-lg' borderRadius="5px" w='94%'>
                        <Table variant='striped' colorScheme='gray'
                            w='100%' size='lg'>
                            <Thead>
                                <Tr bg='gray.600'>
                                    <Th color='white'>Department Name</Th>
                                    <Th color='white'>Dept No.</Th>
                                    <Th color='white'>Active Employees</Th>
                                    <Th color='white'>Expected Salaries</Th>
                                    <Th color='white'>Expected Payroll</Th>
                                    <Th color='white'>Yearly Payroll</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {departmentsInfo.map((dept, index) =>
                                    <Tr key={uuidv4()}>
                                        <Td id={"depts_" + index + "0"}>
                                            <Skeleton isLoaded={!departmentsLoading}>
                                                {dept.dept_name}
                                            </Skeleton>
                                        </Td>
                                        <Td id={"depts_" + index + "1"}>
                                            <Skeleton isLoaded={!departmentsLoading}>
                                                {dept.dept_number}
                                            </Skeleton>
                                        </Td>
                                        <Td id={"depts_" + index + "2"}>
                                            <Skeleton isLoaded={!departmentsLoading}>
                                                {dept.active_employees}
                                            </Skeleton>
                                        </Td>
                                        <Td id={"depts_" + index + "3"}>
                                            <Skeleton isLoaded={!departmentsLoading}>
                                                {dept.num_of_salaries_expect}
                                            </Skeleton>
                                        </Td>
                                        <Td id={"depts_" + index + "4"}>
                                            <Skeleton isLoaded={!departmentsLoading}>
                                                {dept.monthly_payroll}
                                            </Skeleton>
                                        </Td>
                                        <Td id={"depts_" + index + "5"}>
                                            <Skeleton isLoaded={!departmentsLoading}>
                                                {dept.yearly_payroll}
                                            </Skeleton>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>

                <TestResults />
                <StackDivider borderColor='gray.200' />
            </VStack>

        </Box>
    )
}


