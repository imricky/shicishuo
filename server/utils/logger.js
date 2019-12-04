const winston = require('winston');
require('winston-daily-rotate-file');

const { transports, format } = winston;
const { Console, DailyRotateFile } = transports;
const {
  combine, timestamp, label, prettyPrint, json,
} = format;

const logger = winston.createLogger({
  transports: [
    new Console(),
    new DailyRotateFile({
      name: 'base_logger',
      filename: './logs/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      // zippedArchive: true,
      prepend: false,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
      format: combine(
        label({ info: 'right meow!' }),
        timestamp(),
        prettyPrint(),
        json(),
      ),
    }),
    new DailyRotateFile({
      name: 'error_logger',
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      // zippedArchive: true,
      prepend: false,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      format: combine(
        timestamp(),
        prettyPrint(),
        json(),
      ),
    }),
  ],
});

logger.exceptions.handle(
  new transports.File(
    { filename: './logs/exceptions.log' },
  ),
);

logger.info('测试数据');

module.exports = { logger };
