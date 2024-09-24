# FinTech-FLAMES
This is the main branch of FinTech-Flames Learn-To-Bank simulation website
# Installation
To begin, please follow the steps below for installing Npm and Node and setting up the server and database:
## Install Node and Npm
Download the latest version of Node from the official website.
[Download Here](https://nodejs.org/en)
## Install Npm 
Open the terminal and run the following command:
```
npm install
```
## Install Npm 
On the terminal run the following command:
```
npm install express --save
```
## Install React Router
For this project the router dependency needs to be installed. On the terminal run the following command:
```
npm install react-router-dom
```
## Install MongoDB
Download MongoDB from the official website.
[Download Here](https://www.mongodb.com/docs/manual/administration/install-community/)

Then install and run as a service
[Install Here](https://brandonblankenstein.medium.com/install-and-run-mongodb-on-mac-1604ae750e57)

# Start the app
To start the app do the following depending on the machine:
# MacOS
Open up three terminal windows, for frontend, backend and database
## Frontend
Make sure you are in the frontend directory
```
cd FinTech-FLAMES/Frontend
```
Run the frontend
```
npm start
```
## Backend
Make sure you are in the frontend directory
```
cd FinTech-FLAMES/Backend
```
Run the backend
```
node server.js
```
Trouble shooting purpose only: If the above command doesn't work, run:
```
npm install bcrypt
```
and then the first command again
## Database
Run MongoDB:
```
mongod --dbpath ~/data/db
```
Optional if the above command does not work:
```
mkdir -p ~/data/db
```
Then run the first command again
# Windows
## Frontend
Open up a terminal and ensure it is located in the Frontend directory
```
cd FinTech-FLAMES/Frontend
```
Run NodeJs for the frontend in the terminal
```
npm start
```
Mitchell/Fischer for Backend and Database
