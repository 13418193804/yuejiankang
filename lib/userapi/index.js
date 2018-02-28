'use strict';

let controller = require('./userdata');

module.exports = function(app) {
   //app.get('/userdata/:username', controller.getUserInfo);
   app.get('/userdata/geocoderaddress',controller.getGeocoderAddress)
}