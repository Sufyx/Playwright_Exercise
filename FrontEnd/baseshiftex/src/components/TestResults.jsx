/**
 * 26/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

import '../App.css';
import { React, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  VStack, Heading, Table, Thead, 
  Tbody, Tr, Th, Td, TableContainer
} from '@chakra-ui/react';
const report = require("../test-reports/test-json.json");


export default function TestResults() {

  const [testParsedData, setTestParsedData] = useState([]);
  const [lastTest, setLastTest] = useState("Data not found");

  useEffect(() => {
    insertData();
  }, []);


  function insertData() {
    let testData = [];
    report.suites.forEach(testSuite => {
      testData = [...testData, ...testSuite.specs];
    });

    let last_test_time = new Date(testData[0].tests[0].results[0].startTime);
    const minutes = Number(last_test_time.getMinutes()) < 10 ?
      "0" + last_test_time.getMinutes() : last_test_time.getMinutes();
    const hours = Number(last_test_time.getHours()) < 10 ?
      "0" + last_test_time.getHours() : last_test_time.getHours();
    last_test_time =
      last_test_time.toDateString() + " " + hours + ":" + minutes;
    setLastTest(last_test_time);

    const testsFiltered = {};
    for (let i = 0; i < testData.length; i++) {
      testsFiltered[testData[i].title] = {
        title: testData[i].title,
        passedRuns: 0,
        firstRun: -1,
        worstRunNumber: -1,
        worstRunTime: -1,
        totalTime: 0,
        deviation: -1,
        attempt: 0
      };
    }

    for (let i = 0; i < testData.length; i++) {
      testsFiltered[testData[i].title].attempt++;
      testsFiltered[testData[i].title].totalTime +=
        testData[i].tests[0].results[0].duration;
      // Number of successful runs
      if (testData[i].tests[0].results[0].status === "passed") {
        testsFiltered[testData[i].title].passedRuns++;
      }
      // Time of first run
      if (testsFiltered[testData[i].title].firstRun === -1) {
        testsFiltered[testData[i].title].firstRun =
          testData[i].tests[0].results[0].duration;
      }
      // Time of worst run, and which run it was
      if (testsFiltered[testData[i].title].worstRunTime
        < testData[i].tests[0].results[0].duration) {
        testsFiltered[testData[i].title].worstRunTime =
          testData[i].tests[0].results[0].duration;
        testsFiltered[testData[i].title].worstRunNumber =
          testsFiltered[testData[i].title].attempt;
      }
    }
    const sortedData = testData.sort((a, b) =>
      (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    let currTest = sortedData[0].title;
    let currArr = [];
    for (let i = 0; i < sortedData.length; i++) {
      if (currTest !== sortedData[i].title) {
        testsFiltered[sortedData[i - 1].title].deviation =
          getDeviation(currArr);
        currArr = [];
        currTest = sortedData[i].title;
      }
      currArr.push(sortedData[i].tests[0].results[0].duration);
    }
    testsFiltered[sortedData[sortedData.length - 1].title].deviation =
      getDeviation(currArr);

    // console.log("testData ", testData);
    // console.log("testsFiltered ", testsFiltered);

    const testsArray = [];
    for (const property in testsFiltered) {
      testsArray.push(testsFiltered[property]);
    }

    const sortedTests = testsArray.sort((a, b) =>
      (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    // console.log("testsArray ", testsArray);
    setTestParsedData(sortedTests);
  }

  function getDeviation(testsArr) {
    const n = testsArr.length;
    const mean = testsArr.reduce((a, b) => a + b) / n;
    const result = Math.sqrt(testsArr.map(x =>
      Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    return parseInt(result);
  }


  return (
    <VStack mt="2%" w='100%'>
      <Heading size='lg'  textShadow='0px 0px 1px #008080' 
        noOfLines={1} fontFamily='Merriweather'>
        Tests report
      </Heading>
      <Heading size='md' noOfLines={1} fontFamily='Merriweather'>
        Report data for {lastTest}
      </Heading>

      <TableContainer bg='gray.200' w='80%'
        boxShadow='dark-lg' borderRadius="5px">
        <Table variant='striped' colorScheme='gray'
          fontWeight='bold' w='100%'>
          <Thead>
            <Tr bg='gray.600'>
              <Th color='white'>Test title</Th>
              <Th color='white'>Successful runs</Th>
              <Th color='white'>First run time</Th>
              <Th color='white'>Worst run</Th>
              <Th color='white'>Average run time</Th>
              <Th color='white'>Standard deviation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {testParsedData.map(test =>
              <Tr key={uuidv4()}>
                <Td>
                  {test.title}
                </Td>
                <Td>
                  {test.passedRuns} out of {test.attempt}
                </Td>
                <Td>
                  {test.firstRun}ms
                </Td>
                <Td>
                  {test.worstRunNumber} ({test.worstRunTime}ms)
                </Td>
                <Td>
                  {test.attempt === 0 ? 0 :
                    (Number(test.totalTime) / Number(test.attempt)).toFixed(2)}ms
                </Td>
                <Td>
                  {test.deviation}
                </Td>
              </Tr>
            )}

          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}
