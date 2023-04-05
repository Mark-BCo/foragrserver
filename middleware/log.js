const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const logEvents = async(message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join('__dirname', '..', 'logs'))) {
            await fsPromise.mkdir('__dirname', '..', 'logs');
        }
        fsPromise.appendFile(path.join('__dirname', '..', 'logs', logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
}

// This will log every request that comes in
// It may be useful to add conditions in here - for example only log it if 
// the request is notcoming from our own url or if it's specific requests
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    //console log the requests
    console.log(`${req.method}${req.path}`);

    next();
}

module.exports = {logEvents, logger};
