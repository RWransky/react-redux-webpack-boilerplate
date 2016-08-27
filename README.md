# Project Shili
Honey bee education, research, and outreach.

## Running
1. Clone the repository.
2. `npm install`
3. If you want to see real data, `export ENV=production` (planning to add staging when that is set up) (`ENV` can equal `staging`, `development`, or `production`)
4. `gulp`

## Development
If `ENV` is `development`, you'll be able to use [redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). You can use it in other environments if you edit `src/app/stores/store.js` (set the devtools store initialization block to always run).

If you would like access to staging or production data you can use `ENV = staging` and `ENV = production`.

You may need to disable CORS checks in order for some of the calls to work.  The easiest way to do this is with a plugin:

Chrome: [https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

Firefox: [https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)

Make sure to re-enable the CORS checks afterwards or some sites (youtube, github, etc.) will break!

## Contributing
Branches named like: `yourname/feature-name` (i. e. `MWransky/my-feature`).

Let's keep linting errors down! run `gulp lint` before committing.

Merge to `develop`, then `master` once all is good on staging.

## Deploying
Merge to `master` to deploy to production.

Merge to `develop` to deploy to staging
