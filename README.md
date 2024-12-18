# Current State

Home page shows the HelloComponent.    
Navbar can direct me to gamepage, where phaser is renderd and the game is shown. The game is currently just one block that can ba move with arrows on the keyboard.  
Login page does not exist.

# Start the game

To start our project you need [Node.js](https://nodejs.org/en/download/package-manager/current).

## Install packages

Run on path "./apec4_2048_game/game2048/
```node
npm install
```

This will install all the dependecies from package.json.

## Start game

Run on path "./apec4_2048_game/game2048/
```node
npm start
```

See localhost:3000

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

# Running Database-Server via command `node server.js` 

## Setting up the config-File
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
