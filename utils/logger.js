var Logger = require('bunyan');
var fs = require('fs');
//var strftime = require('strftime');

//var cur_date=strftime('%d-%m-%Y');
// Logger /
var log_path="./logs/";


if (!fs.existsSync(log_path))
{
    fs.mkdir(log_path);
}

var log = Logger.createLogger({
	name: 'generator-mern',
	streams: [{ path: log_path+'/generator-mern.log'}],
	serializers: {
    	req: Logger.stdSerializers.req
    }
});

module.exports = log