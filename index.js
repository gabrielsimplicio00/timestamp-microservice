
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", (req, res) => {
  res.send({unix: new Date().getTime(), utc: new Date().toUTCString()})
})


app.get("/api/:date?", (req, res) => {
  const regexhyphen = /[-]/;
  let date = req.params.date
  let unix;
  
  if(!Date.parse(req.params.date) && !Number(req.params.date)){
    return res.send({ error : "Invalid Date" })
  }
  
  if(!regexhyphen.test(date) && Number(date)){
    date = Number(req.params.date)
    unix = new Date(date).getTime()
    return res.send({unix: unix, utc: new Date(Number(req.params.date)).toUTCString()})
  }
  
  let newDate = new Date(date)
  
  res.send({unix: newDate.getTime(), utc: newDate.toUTCString()})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
