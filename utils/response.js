var log = require('../utils/logger');

var Util = function () {};

Util.prototype.success = function (payload, message) {
    log.info("res: " + JSON.stringify( payload))
    return {success: true, message: message, result: payload}

}
Util.prototype.error = function (payload, message) {
    log.error("err: " + JSON.stringify( payload))
    return {success: false, message: message, result: {}}

}
Util.prototype.error1 = function (payload, message) 
{
    log.error("err: " + JSON.stringify( payload))
    return {success: false, message: message, result: payload}
}

module.exports =new Util();