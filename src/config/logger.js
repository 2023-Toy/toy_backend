const winston = require('winston')
require('winston-daily-rotate-file');
//require('date-utils');

const format = winston.format.combine(
    winston.format.timestamp({ format : ' YYYY-MM-DD HH:mm:ss ||'}),
    winston.format.printf(
        (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`,
    ),
)

const logger = winston.createLogger({
    //level : 'debug', //err, warn, info, http, verbose, devug log 출력
    transports:[
        new winston.transports.DailyRotateFile({
            level : 'error', //err가 우선순위가 가장 높기 때문에 err 로그만 저장됨
            datePattern : 'YYYY-MM-DD',
            filename : `log/error/err.%DATE%.log`,
            maxFiles: '30d', //최근 30일치 로그 파일을 남김
            zippedArchive: true, //gzip 압축 여부
            handleExceptions : true,
            format: format
            
        }),
        new winston.transports.DailyRotateFile({
            level : 'info',
            datePattern : 'YYYY-MM-DD',
            filename : `log/info/info.%DATE%.log`, //info보다 우선순위가 높은 err, warn도 함께 저장됨
            maxFiles: '15d', //최근 15일치 로그 파일을 남김
            zippedArchive: true, //gzip 압축 여부
            handleExceptions : true,
            format: format
            
        }),
        new winston.transports.Console({
            level : 'debug',
            handleExceptions : true,
            format:winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        })
    ]
})

module.exports = logger