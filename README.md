# Twitter Clone

Welcome to **Twitter Clone** where I created a more simple version of Twitter.
Tech stack: MongoDB, SemanticUI, ReactJS, NodeJS, GraphQL
Please visit [Twitter Clone](https://rocky-ocean-53591.herokuapp.com/) for more info.

## Running Locally

Make sure you have Node.js [installed locally](https://nodejs.org/en/download/) and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) in your working directory.

### Clone this repo to your local machine/folder
```sh
$ git clone https://github.com/Bodisoem/TwitterClone.git
$ cd TwitterClone/
$ npm install
$ cd client/
$ npm install
```

### Make some important file
Create config.js file which contain your MongoDB access URI. If you have create
```sh
module.exports = {
    MONGODB: 'MongoDB URI',
    SECRET_KEY: 'your secret key'
}
```

### Deploy the server
On TwitterClone dir:
```sh
$ npm run serve
```

### Deploy the app
On client dir:
```sh
$ npm start
```
