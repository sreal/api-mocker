# api-mocker

Mock api server with cookie auth helpers.

## Running Locally

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

1. Set and Clear cookies
2. Fake cookie based authentication via the header.

#### Setting/Clearning Headers

Cookies will be set to the value set in the `X-API-Mocker-Set-Cookie` header.
Cookies will be cleared if the name is set in the `X-API-Mocker-Clear-Cookie` header.
See: ./header-cookie-manager.js.

These will be processed in the order they are found in the headers. Multiple values can be set.

```
header.set('X-API-Mocker-Set-Cookie', '<cookie-name>=<my-cookie-value>')
header.set('X-API-Mocker-Clear-Cookie', '<cookie-name>')
```

#### Setting/Clearning Headers

Values in the `X-Api-Mocker-Valid-Value` must be present else the request will return a `401`
See: ./header-cookie-auth.js

```
header.set('X-Api-Mocker-Valid-Value', '<cookie-name>=<my-cookie-value>')
```
