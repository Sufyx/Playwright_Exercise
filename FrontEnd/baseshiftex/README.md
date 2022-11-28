# Playwright_Exercise

A simple exercise for presenting and testing data related to a company and it's employees/departments/etc. 

The database is in SQL from a provided Docker image.
The implementation is in React, Node and Postgres.
The testing is in Playwright.

 To login you may use the following details:
- Employee ID: 10001
- Password: 1953-09-02


## About the tests

Tests do basic checks, mostly regarding the information retrieved from the server and presented on the page, compared to the information in the database.

Number of workers has been limited to 1, due to shared memory restriction by Docker, which means tests take a little longer.

Test-report presented on the page is of the last performed set of tests.


**For the tests to work, the following are necessary:**
- All node dependencies have been installed
- The database docker image has been downloaded and ran*
- The server is running on port 5000
- The React app is running at localhost:3000
- *see exercise pdf for details