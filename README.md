# Projectify
Projectify is a web application that allows the AdsForGood advertising agency to have visibility over
the status of your projects in a very simple way. using NodeJS and PostgreSQL, Projectify
allows AdsForGood operational users to report, each week, their percentage of dedication to each of the company's projects.

```
There are two different options to run this app

Heroku (Recomended)

Local
```
## Heroku environment
> REST requests:

```
In order to use a token required request, you need to set Authorization header

Authorization: Bearer <valid token>
```
POST
* **Create user**
    * https://projectifyback.herokuapp.com/api/users

``` JSON
{
"first_name": "user",
"second_name": "",
"first_lastname": "lastname",
"second_lastname": "lastname",
"email": "user@user.com",
"password": "1233456",
"inactive": false
}
```

POST
* **Login**
    * https://projectifyback.herokuapp.com/api/security/login
``` JSON
{
"email": "user@user.com",
"password": "1233456"
}
```


POST
* **Validate token**
    * https://projectifyback.herokuapp.com/api/security/validate-token
```JSON
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiQW5kcmVzIiwiZmlyc3RfbGFzdG5hbWUiOiJDb3JyZWRvciIsImVtYWlsIjoienp6QGUuY29tIiwiaW5hY3RpdmUiOmZhbHNlLCJpYXQiOjE2NDI5OTA0NDcsImV4cCI6MTY0Mjk5MDQ2Mn0.Rw4vYw_lGmReIj4IN6x7noIGEF-FRX7tMi3Nbu0jNv8"
}
```
POST
* **Create project**
    * https://projectifyback.herokuapp.com/api/users
```JSON
{
"name": "Project X",
"description": "An amazing project"
}
```
POST
* **Create report**
    * https://projectifyback.herokuapp.com/api/user-reports
```JSON

{
"user_id": 1,
"project_id": 1,
"dedication_percentage": 100
}
```

PATCH
* **Edit report percentage**
    * https://projectifyback.herokuapp.com/api/user-reports/1
```JSON
{
    "newPercentage":50
}
```

GET
* **Find all reports of one user**
```
    * https://projectifyback.herokuapp.com/api/user-reports/user/1

```
---

GET
* **Find all users**
```
    * https://projectifyback.herokuapp.com/api/users?page=0

```

GET
* **Find all projects**
```
    * https://projectifyback.herokuapp.com/api/projects?page=1

```
---


## Local environment

> Dependencies instalation:
---
> In Local environment (Make sure to have the env files):

!["Referemce"](./Screenshots/envreference.png)
```
One env file at root level and the other at Config level but same
content:

DB_HOT=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=localnamebd
DB_NAME_TEST=testingbd
JWT_SECRET=chorizo
TOKEN_EXPIRATION=1m
```
> Once you have the env files, proceed to run the app
```
If you are running it on local server, remember that is very important to have the postgres service active and databases already created with the same environment name than before.
```
<ul>
<li>Instalation dependencies : <strong>npm install</strong></li>
<li>Development: <strong>npm run dev</strong></li>
<li>Tests: <strong>npm run test</strong></li>
<br>
<li>Migrations: <strong>npm run migrate</strong></li>
<li>Rollback last migration: <strong>npm run migrate:down</strong></li>
<li>Rollback all migrations: <strong>npm run migrate:rollback:all</strong></li>
<li>Seeds: <strong>npm run seed</strong></li>
<br>
<li>Test migrations: <strong>npm run migrate:test</strong></li>
<li>Rollback last test migration: <strong>npm run migrate:down:test</strong></li>
<li>Rollback all test migrations: <strong>npm run migrate:rollback:all:test</strong></li>
<li>Test seeds: <strong>npm run seed:test</strong></li>
</ul>

```
In order to run npm run dev or npm run test, be sure to already have the respective database updated with all migrations -> npm run migrate or npm run migrate:test.
```
## Backend Dependencies:
<br>
<ul>
<li><div style="display:flex; justify-content:space-between; width:150px;">Nodejs <img width="40px" src="https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png"></img></div></li>
<br>
<li><div style="display:flex; justify-content:space-between; width:150px;">Express <img width="40px" src="https://expressjs.com/images/express-facebook-share.png"></img></div></li>
<br>
<li><div style="display:flex; justify-content:space-between; width:150px;">KnexJS <img width="40px" src="https://miro.medium.com/max/1035/1*k0QFBnA2btydUOh7Lwc4wQ.png"></img></div></li>
<br>
<li><div style="display:flex; justify-content:space-between; width:150px;">ObjectionJS <img width="40px" src="https://res.cloudinary.com/practicaldev/image/fetch/s--HYqE1Jzx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://miro.medium.com/max/832/1%2AxoIcN0IG7F9EV4IJIxb4ag.png"></img></div></li>
<br>
<li><div style="display:flex; justify-content:space-between; width:150px;">PostgreSQL <img width="40px" src="https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png"></img></div></li>
</ul>
