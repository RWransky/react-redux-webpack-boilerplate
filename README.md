# React Redux Webpack Boilerplate
This is a fully out-of-the-box working react/redux webpack app! Ready and set with es6 and support for continuous integration via Circle CI!

## Features NPM Packages:
* react
* react-redux
* react-router-redux
* sass-loader
* less-loader
* bluebird
* es6-promise

## Globally accessible functions within `/src/app`:
* `$`:         jquery,
* `_`:         lodash,
* `React`:     react,
* `Redux`:     redux,
* `Promise`:   es6-promise,
* `fetch`:     whatwg-fetch

## Repo Structure
```
`gulp`:		All things gulp related needed to run `gulpfile.js`
`public`:	You can replace fonts, icon, favicon, etc. here
`src/app`:	Where all the magic happens :p
	`/actions`:		A place for all things that will make calls to API's or result in a dispatch being called
	`/assets`:		A place to customize global styling stuff, icons, and more
	`/components`:	Shared React classes go here
	`/containers`:	Where all your base webpages will reside (think for each `app.com/something` that `something` is a contaier)
	`/reducers`:	Specify how data is transferred to your Redux store
	`/services`:	A place for things like an auth service
	`/stores`:		Basic setup for your Redux store
	`/utils`:		Shared space for helper functions
	`app.jsx`:		Rendering your app to the DOM
	`app.scss`:		Fancy styles
	`config.js`:	See Development Section
	`routes.jsx`:	Specify new routes in here
```
## Running
1. Clone the repository.
2. `npm install`
3. `export ENV=development`
4. `gulp`

## Development
If `ENV` is `development`, you'll be able to use [redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). You can use it in other environments if you edit `src/app/stores/store.js` (set the devtools store initialization block to always run).

If you are interested in making calls to external API's you can use the URL's field in the plugin section of `webpack.config.js` and add the correct API endpoint per environment in your `config.json`. So if in your webpack plugin specifies
```
'URLS': {
  exampleApiServer: JSON.stringify(CONFIG.exampleApiServer)
},
```
your `config.json` would look like this
```
{
  "development": {
  	"exampleApiServer": "http://dev.api.com"
  },
  "staging": {
  	"exampleApiServer": "http://staging.api.com"
  },
  "production": {
  	"exampleApiServer": "http://production.api.com"
  }
}
```
Be sure to finally load them in your `app/config.js` file using something like this:
```
/* global URLS */
export const API_URL = URLS.exampleApiServer;
```

If you would like access to staging or production server while running locally you can use `ENV=staging gulp` and `ENV=production gulp`.

You may need to disable CORS checks in order for some API calls to work.  The easiest way to do this is with a plugin:

Chrome: [https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

Firefox: [https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)

Make sure to re-enable the CORS checks afterwards or some sites (youtube, github, etc.) will break!

## Contributing
Branches named like: `yourname/feature-name` (i. e. `MWransky/my-feature`).

Let's keep linting errors down! run `gulp lint` before committing.

Assign MWransky when you are set for me to look at your updates!
