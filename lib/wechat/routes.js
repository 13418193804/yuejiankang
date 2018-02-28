'use strict';

module.exports = function(app) {
	app.use('/weixintoken', require('./index'));
}