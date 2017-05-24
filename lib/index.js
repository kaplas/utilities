const { send } = require('micro');
const { router, get } = require('microrouter');
const sendRedirect = require('micro-redirect');

const redirect = (req, res) => {
  const host = req.headers.host.match(/:/g)
    ? req.headers.host.slice(0, req.headers.host.indexOf(':'))
    : req.headers.host;

  switch (host) {
    case 'www.kaplas.fi':
      sendRedirect(res, 301, 'https://kaplas.fi/');
      break;
    case 'www.kaplas.net':
      sendRedirect(res, 301, 'https://kaplas.net/');
      break;
    default:
      send(res, 200, 'OK');
  }
};

const notFound = (req, res) =>
  send(res, 404, 'This is not the URL you are looking for');

module.exports = router(
  get('/', redirect),
  get('/*', notFound),
);
