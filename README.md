# Game 2048

## Current State

Home page shows the HelloComponent.    
Navbar can direct me to gamepage, where phaser is renderd and the game is show. Game right now is just a rectangle that you can move with arrows on your keyboard.  
Login page does not exist

## Start the game

To start our project you need [Node.js](https://nodejs.org/en/download/package-manager/current).

### Install packages

Run on path "./apec4_2048_game/game2048/
```node
npm install
```

This will install all the dependecies from package.json.

### Start game

Run on path "./apec4_2048_game/game2048/
```node
npm start
```

See localhost:3000
=======
# How to Download and Install npm

This guide will help you download and install **npm (Node Package Manager)** on your system.

---

## Step 1: Check if Node.js and npm are Already Installed

1. Open a terminal or command prompt.
2. Run the following commands:
   ```bash
   `node -v`
3. Optional: Update npm
    `npm install -g npm@latest`

## Step 2: Download and Install Node.js:

npm is bundled with Node.js, so installing Node.js will also install npm.

1. Visit the official Node.js website: https://nodejs.org.
2. Download the LTS (Long-Term Support) version for stability or the Current version for the latest features.
3. Windows/Mac: Follow the setup wizard.
4. During installation, ensure the option to install npm is checked (it is selected by default).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Running Database-Server via command `node server.js` 

### Setting up the config-File
Please note that to start the database, you must create a _config.json_-File in the _backend_-folder. That json-File must contain the following content:  
`{  
    "db": {  
        "user": "POSTGRES",  
        "host": "LOCALHOST",  
        "database": "DATABASE_NAME",  
        "password": "DATABASE_PASSWORD",  
        "port": 5432  
    }  
}`  
This content defines the information for the _server.js_, in which the client-data of the database is being fetched. 

If you open the terminal and navigate to the directory `cd game2048\dbconnection` and execute the command `node server.js`, the PostgreSQL Server will start running on _port 3001_. Only after starting the server, you will be able to use the register html page (_http://localhost:3001/register.html_) to successfully register a user. If you make changes in the code, you need to restart the server and refresh the html page, so that the changes are adopted.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
