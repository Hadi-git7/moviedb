const express = require('express');
const app = express();

const PORT = 3000;

app.get('/test', (req, res) => {
  res.json({status: 200, message: 'ok'});
});

app.get('/time', (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.json({status: 200, message: currentTime});
});

app.get(`/hello/:ID`, (req,res) =>{
  const ID = req.params.ID;
  res.json({status: 200, message : `Hello, ${ID}`})
});

app.get('/hello', (req, res) => {
  res.json({status: 200, message: 'Hello, world'});
});

app.get('/search', (req, res) => {
  const search = req.query.s;
  if (search) {
    res.json({status: 200, message: "ok", data: search});
  } else {
    res.status(500).json({status: 500, error: true, message: "you have to provide a search"});
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});