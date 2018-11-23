import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../common/App';

const app = express();

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', function(req, res) {
  const script =
    app.get('env') === 'production'
      ? 'client.js'
      : 'http://localhost:4001/client.js';

  const application = renderToString(<App />);

  const html = `<!doctype html>
  <html class="no-js" lang="">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Timestamp Microservice | freeCodeCamp</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width,  initial-scale=1">
    </head>
    <body>
      <div id="root">${application}</div>
      <script src="${script}"></script>
    </body>
  </html>`;

  res.send(html);
});

app.get('/api/timestamp/:input', function(req, res) {
  const { input } = req.params;

  // convert numeric string to number
  const date = input == +input ? new Date(+input) : new Date(input);

  if (date instanceof Date && !isNaN(date)) {
    // Valid date string or timestamp
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    // Invalid date
    res.json({ unix: null, utc: 'Invalid Date' });
  }
});

app.get('/api/timestamp', function(req, res) {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

export default app;
