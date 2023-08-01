const winston = require('winston')
require('winston-daily-rotate-file');
require('date-utils');

const format = winston.format.combine(
    winston.format.timestamp({ format : ' YYYY-MM-DD HH:MM:SS ||'}),
    winston.format.printf(
        (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`,
    ),
)

const logger = winston.createLogger({
    level : 'debug', //err, warn, info, http, verbose, devug log 출력
    transports:[
        new winston.transports.DailyRotateFile({
            datePattern : 'YYYY-MM-DD',
            filename : `log/system.%DATE%.log`,
            maxFiles: 30, //최근 30일치 로그 파일을 남김
            zippedArchive: true, //gzip 압축 여부
            handleExceptions : true,
            format: format
            
        }),
        new winston.transports.Console({
            handleExceptions : true,
            format:winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        })
    ]
})

module.exports = logger