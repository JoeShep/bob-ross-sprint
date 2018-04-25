All the things:

Tech Stack:
1. AngularJS
1. PostgreSQL w/Sequelize
1. NodeJS w/Express
1. CSS w/SASS

Tools:
1. ESlint
1. npm
1. sequelize-cli
1. psql

This app brings together 6 months of web development training for NSS Cohort 23 in one place. It allows a user to search a movie API to create a watch list of films and rank them after viewing.

As a single-page app, Angular handles the client-side routing, while NodeJS handles interactions with the API, as well as communication with the database.

### Tasks and stuff:
Did you know you can use npm as a task manager? You can even have it do stuff before and after the stuff you want it to do using the `pre` and `post` helpers. _pause for melting faces_.

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

App structure:

    app
    ----controllers
    ----models
    ----routes
    ----config
    ----env
    ----strategies
    ----config.js
    ----express.js
    public
    ----controllers
    ----css
    ----factories
    ----images
    ----partials
    package-lock.json
    package.json
    README.md
    server.js

**app** consists of the server side express application files.

**public** holds the frontend AngularJS files and folders.

### Persistence Pays
Now you're ready to get the database up and running. This app uses postgres and the sequelize ORM.

`npm install pg pg-hstore sequelize`

You'll also need to have postgres installed on your machine and either use the psql command line tool or pgAdmin GUI. I recommend psql, but it can be a beast to get working properly on Windows machines. Proceed at your own risk.

Create a db for the project on your postgres server. I called mine `movie-watchlist`. Call yours anything you like. And call your mother. She worries.

The sequleize CLI makes it easy to setup your data models. install it globally with `npm install sequelize-cli -g`. Then `sequelize init` in the `app/` directory to add the following goodies:

    ├── config
    │   └── config.json
    ├── migrations
    ├── models
    │   └── index.js
    └── package.json

Change config/config.json to match db settings

sequelize model:create --name User --attributes username:string,email:string,password:string

List of sequelize datatypes: http://docs.sequelizejs.com/en/latest/api/datatypes/

This creates:
models/user.js
migrations/{timestamp}-create-user.js

ignore migrations

Add validations to models:
http://docs.sequelizejs.com/en/latest/docs/models-definition/#validations

Add other properties to your model, ie
If your table has mixed caps and lowercase, you have to use quotes to query it in PSQL: So, set the table name yourself to avoid the default behavior of just pluralizing the uppercase model.
tableName: ‘my_very_custom_table_name’

Create build-db file and add script to package.json "build-db": "node build-db.js”

or

wrap your express `server.listen` in server.js like this:

```js
models.sequelize.sync().then( () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
```

Pass `{force: true}` to `sync()` if you want to live dangerously and tear down your tables and rebuild them every time your server restarts. This is only for the dev process, of course.

The User!
npm install passport passport-local express-session bcrypt-nodejs body-parser

Also bcrypt-cli is a help when generating a user to save to the db for testing purposes
pass in the password and the number of times you want it to re-hash(?)

### Working with the OMDB API
Get an API key here: http://www.omdbapi.com/apikey.aspx

Use it with this npm package: [IMDB-API](https://www.npmjs.com/package/imdb-api)

