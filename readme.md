Deployment : on vercel
https://node-js-final-project-qu3ysb17o-jefferykung.vercel.app/

# 1. Title of the project
Event matching app -- Jeffery's final project for NodeJS 

# 2. What technic do I use in this Project?

* frontend library-> React.js
* styling -> Tailwind CSS、 blueprintJS
* backend and database -> MongoDB app service 


# 3. How to Install and Run the Project

npm i
// to install dependencies 

npm run dev
// run with nodemon

# 4. How to Use the Project

## -- updated V3 2023-04-26 --
### adding (1) function of filtering by date/location. (2) get contact button.  

## -- updated V2 2023-02-23 --
### new feature added -- google Oauth

## -- v1  2023-02-22 --
### (1). Sign in
login page with user authentication. I connect it to a Mongo database and store all the credencials. 
If you successfully log in, you'll be redirect to the article page. If you don't, a JSON message will show you a error message.

## (2). Register
you can also click sign up to a register page. email and password will be store in database on Mongo DB.  It detects whether the email has been used or not.

## (3).Main page -- left half section -- My events --CRUD
I bind the user infomation from your email and filter your data to show on this section. you can easily use CRUD here.

## (4).Main page -- right half section -- All events -- filter function
You can filter by event category here to see if you have anyone want to do something at the same time you want! 





# 5. the Inspiration of making this app.

To easily match what people want to do. Don't have to ask each people every time. 
