import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors({ optionSuccessStatus: 200 }));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

app.get('/api/timestamp', function(req, res) {
  res.json({ greeting: 'HELLO API WORLD' });
});

export default app;
