All the things:

Tech Stack:
1. AngularJS
1. PostgreSQL w/Sequelize
1. NodeJS w/Express
1. CSS w/SASS

Tools:
1. Grunt ( ? )
1. JShint
1.

This app brings together 6 months of web development training for NSS Cohort 23 in one place. It allows a user to search a movie API to create a watch list of films and rank them after viewing.

As a single-page app, Angular handles the client-side routing, while NodeJS handles interactions with the API, as well as communication with the database.

Grunt will handle all the client and server tasks???

Or maybe we'll just use npm Scripts for everything. That sounds rad. We can even have npm do stuff before and after the stuff we want it to do:

```json
"scripts": {
  "premy-script": "echo 'about to list files'",
  "my-script": "ls -l",
  "postmy-script": "echo 'omg did you see that?'"
}
```

We can even compile SASS into CSS, just like we did with Grunt, and all without needing SASS globally installed. Totally tubular.

```
"scripts": {
  "sass": "node-sass sass/ -o build/css/"
}

This will compile all of the sass files (that don't start with an underscore) to the build/css/ directory.
```

Big thanks to this @paulcpederson [article](http://paulcpederson.com/articles/npm-run/) for laying out how groovy it is to use npm as a task-runner.

    npm install -g eslint
    npm install rerun-script node-sass concurrently

Create a local install of eslint and a `.eslintrc` file at project root

    eslint --init

Create a `.npmrc` file and add `loglevel=silent` to suppress npm error messages when linting
https://github.com/npm/npm/issues/6124

packages links
https://github.com/eslint/eslint
https://github.com/sass/node-sass
https://www.npmjs.com/package/concurrently

app structure
app
----controllers
----models
----routes
----views
config
----env
----strategies
----config.js
----express.js
public
----config
----controllers
----directives
----css
----filters
----images
----views
----services
server.js
package.json

app: consists of the server side express application files.
config: It holds the configuration files for the server side express application.
  config/strategies: It consiste the authentication strategy files of passport .
node_modules:  The node framework files like express , passport, bower etc..
public:  This folder holds the frontend AngularJS files and folders.
  public/lib:  This folder consists the frontend libraries, if needed
  public/modules :  This is where the client side feature based files and folders kept. Each feature has its own folder which contain the AngularJS files.
procfile:  Process file for heroku implementation
package.json:  npm definition file where the server side dependencies configured
