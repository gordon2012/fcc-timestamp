import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors({ optionSuccessStatus: 200 }));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
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
    res.json({ error: 'Invalid Date' });
  }
});

app.get('/api/timestamp', function(req, res) {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

export default app;
