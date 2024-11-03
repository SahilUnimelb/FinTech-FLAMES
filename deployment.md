# Service used
https://render.com/
# Step-by-step guide
## Backend deployment

1) Go to "Deploy a Web service"
2) Go to the Public Git Repository and paste the repository's link: "https://github.com/SahilUnimelb/FinTech-FLAMES"
3) Then fill the options with the settings listed below:
   * Name: [Any proper backend server name]
   * Root Directory: Backend
   * Build Command: npm install
   * Start Command: node server.js
4) Go to Environment Variables, and select "Add from .env"
5) Copy everything from .env file and paste it and click on "Add variables"
6) Click "Deploy Web Service" and the backend server will be deployed.

## Frontend deployment

1) From the "Deploy a Web service"/ Backend server logs, copy the backend link from top left
2) Go to the repository in the frontend folder and replace every "http://localhost:5000" url to the copied backend url for every files in the frontend folder
3) Go back to the dashbord render/ deployment service, and go to "Deploy a static site"
4) Repeat #2 from Backend deployment
5) Then fill the options with the settings listed below:
   * Name: [Name for the website]
   * Root Directory: FrontEnd
   * Build Command: npm install; npm run build
   * Publish directory: build
6) Then click on "Deploy Static Site" and the frontend will be deployed

## To keep the page upon refreshing

1) Go to Redirects/ Rewrites on the Frontend service
2) Click on "Add Rule"
3) Then fill the options with the settings listed below:
   * Source: /*
   * Destination: /index.html
   * Action: Rewrite
