# Clowdr

Clowdr is a project bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

#### Install all dependencies

Use npm to install all dependencies after cloning.

```bash
npm install
```

#### Set up database

Download and install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) and start the server.

Note that installing MongoDB is used for calling the `mongodbrestore` command. You do not have to run MongoDB when using Back4App.

Create an account on [Back4App](https://www.back4app.com/) and create an app space for Clowdr with any name you like.

Set up your own configurations in ./.env file and ./db/.env-db file according to the ./.env-example and ./db/.env-db-example, respectively. 

The configuration parameters can be found from your created app in Back4App: Server Settings -> Core Settings

You can find the MongoDB Database URI there. xxx is the password, yyy is the database ID in the following example.

`mongodb://admin:xxx@mongodb.back4app.com:27017/yyy?ssl=true`

#### Populate the database

Run the following script to add initialized the database:

```bash
npm run init-app
```

You should be able to see all tables being added with some essential data stored in the database.

#### Set up Back4App

From the app created in back4app, turn on live queries for the following tables: LiveVideos /LiveVideoWatchers /BreakoutRoom, by going to Server Settings -> Web Hosting and Live Query


## Usage

After all installations, start the application by executing

```bash
npm start
```

It will pop up a tab in your default browser and from there you can log into the website.

When you want to exit, enter `ctrl + c`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


