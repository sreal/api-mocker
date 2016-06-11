# api-mocker

App to mock an api in Node.js app using [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone <this repo>
$ cd api-mocker
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Features

1. Fake cookie authentication controlled in request headers.


## Headers

```
header.set('X-API-Faker-Set-Cookie', 'CookieName')
header.set('X-API-Faker-Destroy-Cookie', 'CookieName')
```
