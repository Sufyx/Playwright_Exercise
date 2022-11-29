## Playwright Exercise

A simple exercise for presenting and testing data related to a company and it's employees/departments/etc. 

The database is in SQL from a provided Docker image.
The implementation is in React, Node and Postgres.
The testing is in Playwright.

 To login you may use the following details:
- Employee ID: 10001
- Password: 1953-09-02


### About the tests

Tests do basic checks, mostly regarding the information retrieved from the server and presented on the page, compared to the information in the database.

Number of workers has been limited to 1, due to shared memory restriction by Docker, which means tests take a little longer.

Test-report presented on the page is of the last performed set of tests.


### Instructions
- Clone the Git repository to a local folder
- Make sure you have the following installed:
  - Postgres
  - Docker
- Open any terminal and type:
> docker run --rm -p 5433:5432 -e POSTGRES_PASSWORD=1234 -d diegmonti/test_db
 

- In the folder, go into `BackEnd`, open a terminal and type `'npm install'`
  - When installation is complete, type `'nodemon server.js'`, and wait for a message saying `"Server listening on port 5000"`
- Next go to `FrontEnd\baseshiftex`, open a terminal and type `'npm install'`
  - When installation is complete, type `'npm start'`

- A page should open at `http://localhost:3000`, featuring a login screen.
Login with the following details:
  - Employee ID: **10001**
  - Password: **1953-09-02**

- At this point you should be redirected to `http://localhost:3000/information_page`
  - You should see several tables featuring data (it could take a little while to load). If the page or the data in the tables fails to load, the tests will not work either. See if there are any errors in the terminals, and make sure the server is running and connection is not refused.

- With the page still up, go to the terminal at `FrontEnd\baseshiftex` to run tests
  - For example: `npx playwright test -g "Departments" --repeat-each 5`
  
- - -
Hope this works :)