var express = require('express');
var app = express();

var cors = require('express');

app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp', function(req, res) {
  res.json({ greeting: 'hello API' });
});

var listener = app.listen(process.env.PORT, function() {
  console.log(`App listening on port ${listener.address().port}.`);
});
