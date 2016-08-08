require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Project Shili',
    description: 'Only the things that are hard are worth doing.',
    head: {
      titleTemplate: 'Project Shili: %s',
      meta: [
        {name: 'description', content: 'Only the things that are hard are worth doing.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Project Shili'},
        //{property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Project Shili'},
        {property: 'og:description', content: 'Only the things that are hard are worth doing.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@MWransky'},
        {property: 'og:creator', content: '@MWransky'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
