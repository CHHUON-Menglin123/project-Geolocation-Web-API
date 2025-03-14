const express = require('express');
const path = require('path')
const Datastore = require('nedb');

const app = express();

const port = process.env.PORT ||  8080;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hi Dad"});
});
})
app.use(express.static('public'));
app.use(express.json());
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      response.json(data);
    });
  });


app.post('/api', (request, response) =>{
    console.log(request.body);
    const data = request.body;
    const timeRecording = Date.now();
    data.timeRecording = timeRecording;
    database.insert(data);
    console.log(database);
    response.json({
      status: "Success",
      timeRecording:timeRecording,
      latitude: data.lat,
      longitude:data.lon,
    });
});
