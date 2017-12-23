// Install `babel` hook for ES6
require('babel-register');
require('babel-polyfill');

// ignore style imports
require('ignore-styles');

// Start the server
require('./app');
