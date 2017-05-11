const mongoose = require('mongoose');
const config = require('../config/mongo-config');
mongoose.Promise = global.Promise;
const db = mongoose.connect("mongodb://" + config.HOST + ":" + config.PORT + "/" + config.NAME);

module.exports = db;