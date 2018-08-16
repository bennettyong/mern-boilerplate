generator MERN - a boilerplate thats uses the MERN stack for easy creation of web applications

Below you will find some information on how to perform common tasks.<br>

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [Server Side Scripts](#server-side-scripts)
  - [Client Side Scripts](#client-side-scripts)
- [Using blueprintjs](#using-blueprintjs)
- [Fetching Data with AJAX Requests](#fetching-data-with-ajax-requests)
- [Integrating with an Express Backend](#integrating-with-an-express-backend)
- [Proxying API Requests in Development](#proxying-api-requests-in-development)


## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  views/
    layout.jade
    index.jade
    error.jade
  routes/
    index.js
    api.js
  node_modules/
  package.json
  public/
    stylesheets/
    javascripts/
    images/
  models/
    user.js
  controllers/
    userController.js/
  app.js
  bin/
    www
  client/
```

For the project to build, **these files must exist with exact filenames**:

* `client/public/index.html` is the page template;
* `bin/www is the Express entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.
rom JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts
##Server Side Scripts
In the Root directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will not reload if you make edits.<br>

### `npm devstart`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>

##Client Side Scripts
In the client directory, you cann run: 

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Using blueprintjs

You don’t have to use [blueprintjs](https://blueprintjs.com/) together with React but it is a popular library for and i chose blueprint due to the nice components that come with it

Install blueprintjs from npm. Make sure to include the css files for styling(I include the css files i need in the css folder in the public folder and imports it from the index.html):

```sh
npm install --save @blueprintjs/core
```

Alternatively you may use `yarn`:

```sh
yarn add @blueprintjs/core
```

## Fetching Data with AJAX Requests

React doesn't prescribe a specific approach to data fetching, but people commonly use either a library like [axios](https://github.com/axios/axios) or the [`fetch()` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provided by the browser.

The global `fetch` function allows to easily makes AJAX requests. It takes in a URL as an input and returns a `Promise` that resolves to a `Response` object. You can find more information about `fetch` [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

The client-side makes use of GET/POST fetch requests to the express server and uses returned `Promise` to display information.

You can learn more about making AJAX requests from React components in [the FAQ entry on the React website](https://reactjs.org/docs/faq-ajax.html).

## Integrating with an Express Backend

The root directory is the Express Server that contains all the endpoints that the client side requests. For development, i recomment running the Express server separately from the client React Server, allowing for easy development on both sides.

## Proxying API Requests in Development

To tell the development server to proxy any unknown requests to your API server in development, add a `proxy` field to your `package.json`, for example:

```js
  "proxy": "http://localhost:3001",
```

This way, when you `fetch('/api/todos')` in development, the development server will recognize that it’s not a static asset, and will proxy your request to `http://localhost:4000/api/todos` as a fallback. The development server will **only** attempt to send requests without `text/html` in its `Accept` header to the proxy.

Conveniently, this avoids [CORS issues](http://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations) and error messages like this in development:

```
Fetch API cannot load http://localhost:4000/api/todos. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

Keep in mind that `proxy` only has effect in development (with `npm start`), and it is up to you to ensure that URLs like `/api/todos` point to the right thing in production. You don’t have to use the `/api` prefix. Any unrecognized request without a `text/html` accept header will be redirected to the specified `proxy`.

The `proxy` option supports HTTP, HTTPS and WebSocket connections.<br>
If the `proxy` option is **not** flexible enough for you, alternatively you can:

* [Configure the proxy yourself](#configuring-the-proxy-manually)
* Enable CORS on your server ([here’s how to do it for Express](http://enable-cors.org/server_expressjs.html)).
* Use [environment variables](#adding-custom-environment-variables) to inject the right server host and port into your app.




