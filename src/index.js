const morgan = require('morgan');
const { table, getBorderCharacters } = require('table');
const { cyan, green, blue, yellow, red, magenta, dim } = require('colorette');

function createHttpLogger({
  showTimestamp = true,
  showMethod = true,
  showUrl = true,
  showStatus = true,
  showResponseTime = true,
  showClientIP = true,
  showUserAgent = true,
  showReferrer = true,
  showResponseSize = true,
  showHttpVersion = true,
  timeFormat = 'iso',
}) {
  return morgan((tokens, req, res) => {
    try {
      const timestamp = showTimestamp
        ? (timeFormat === 'iso'
          ? green(new Date().toISOString())
          : green(new Date().toLocaleTimeString()))
        : '';

      const logData = [
        [
          showTimestamp && cyan('Timestamp'),
          showMethod && cyan('Method'),
          showUrl && cyan('URL'),
          showStatus && cyan('Status'),
          showResponseTime && cyan('Response Time'),
          showClientIP && cyan('Client IP'),
          showUserAgent && cyan('User-Agent'),
          showReferrer && cyan('Referrer'),
          showResponseSize && cyan('Response Size'),
          showHttpVersion && cyan('HTTP Version'),
        ].filter(Boolean), // Remove any falsy values (hidden items)
        [
          timestamp,
          showMethod && blue(tokens.method(req, res)),
          showUrl && yellow(tokens.url(req, res)),
          showStatus && (tokens.status(req, res).startsWith('2')
            ? green(tokens.status(req, res))
            : red(tokens.status(req, res))),
          showResponseTime && magenta(tokens['response-time'](req, res) + ' ms'),
          showClientIP && cyan(tokens['remote-addr'](req, res)),
          showUserAgent && (tokens['user-agent'](req, res) || 'Unknown'),
          showReferrer && yellow(tokens.referrer(req, res) || 'N/A'),
          showResponseSize && cyan(tokens.res(req, res, 'content-length') || '0 B'),
          showHttpVersion && blue(`HTTP/${req.httpVersion}`),
        ].filter(Boolean), // Remove any falsy values (hidden items)
      ];

      const tableOutput = table(logData, {
        border: {
          topBody: dim(getBorderCharacters('norc').topBody),
          topJoin: dim(getBorderCharacters('norc').topJoin),
          topLeft: dim(getBorderCharacters('norc').topLeft),
          topRight: dim(getBorderCharacters('norc').topRight),
          bottomBody: dim(getBorderCharacters('norc').bottomBody),
          bottomJoin: dim(getBorderCharacters('norc').bottomJoin),
          bottomLeft: dim(getBorderCharacters('norc').bottomLeft),
          bottomRight: dim(getBorderCharacters('norc').bottomRight),
          bodyLeft: dim(getBorderCharacters('norc').bodyLeft),
          bodyRight: dim(getBorderCharacters('norc').bodyRight),
          bodyJoin: dim(getBorderCharacters('norc').bodyJoin),
          joinBody: dim(getBorderCharacters('norc').joinBody),
          joinLeft: dim(getBorderCharacters('norc').joinLeft),
          joinRight: dim(getBorderCharacters('norc').joinRight),
          joinJoin: dim(getBorderCharacters('norc').joinJoin),
        },
        columns: {
          0: { width: 30 },
          1: { width: 10 },
          2: { width: 40 },
          3: { width: 10 },
          4: { width: 15 },
          5: { width: 20 },
          6: { width: 50 },
        },
      });

      console.log(tableOutput);
      return '';
    } catch (error) {
      console.error('Error generating HTTP log:', error);
      return '';
    }
  });
}

module.exports = { createHttpLogger };
