# Current State

- Home Page just show a message, 
- Game Page is playable 
- for Register and Login you need to start database server (see below)

# Start the game

To start our project you need [Node.js](https://nodejs.org/en/download/package-manager/current).

## Install packages

Run on path `./apec4_2048_game/game2048/`

```node
npm install
```

This will install all the dependecies from package.json.

## Start game

Run on path `./apec4_2048_game/game2048/`

```node
npm start
```

See **localhost:3000**

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

# Database

## Setting up config file

To start the database you **need** to create `config.json` file under the path `.\apec4_2048_game\game2048\backend\dbconnection`

Content of the file:
``` json
{  
    "db": {
        "user": "game2048db_user",
        "host": "dpg-cu74klij1k6c73fhib90-a.frankfurt-postgres.render.com",
        "database": "game2048db",
        "password": "gYiNB9WyU6UhB0isu9vtQuDo6wMqq5wJ",
        "port": 5432,
        "ssl": {
            "rejectUnauthorized": false
        }
    }
}
```

## Start database server

- in terminal navigate to `apec4_2048_game\game2048\backend\dbconnection`
- execute `node server.js`
- start the game and register/login your user

```
If you make changes in the code, you need to restart the server and refresh the html page, so that the changes are adopted.
```
