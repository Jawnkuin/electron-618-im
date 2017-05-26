const getLocalDb = require('./localDb');
const getGlobalDb = require('./globalDb');
const getAccountConfigDb = require('./accountConfig');
const getGlobalConfigDb = require('./globalConfig');

// local database, manange data of users, departments and sessions
exports.getLocalDb = getLocalDb;
// global database, manange data of images
exports.getGlobalDb = getGlobalDb;
// local account settings
exports.getAccountConfigDb = getAccountConfigDb;
// global configs
exports.getGlobalConfigDb = getGlobalConfigDb;
