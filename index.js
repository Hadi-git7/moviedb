const express = require('express');
const app = express();

const PORT = 3000;

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

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

app.post('/movies/create', (req, res) => {
  // TODO: Add code to handle movie creation
});

app.get('/movies/read', (req, res) => {
  res.json({status: 200, data: movies});
});

app.put('/movies/update', (req, res) => {
  // TODO: Add code to handle movie update
});

app.delete('/movies/delete', (req, res) => {
  // TODO: Add code to handle movie delete
});

app.get('/movies/read/by-date', (req, res) => {
  const moviesByDate = movies.sort((a, b) => a.year - b.year);
  res.json({status: 200, data: moviesByDate});
});

app.get('/movies/read/by-rating', (req, res) => {
  const moviesByRating = movies.sort((a, b) => b.rating - a.rating);
  res.json({status: 200, data: moviesByRating});
});

app.get('/movies/read/by-title', (req, res) => {
  const moviesByTitle = movies.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  res.json({status: 200, data: moviesByTitle});
});

app.get('/movies/read/id/:ID', (req, res) => {
  const ID = req.params.ID;
  const movie = movies.find(movie => movie.ID == ID);
  if (movie) {
    res.json({status: 200, data: movie});
  } else {
    res.status(404).json({status: 404, error: true, message:`the movie ${ID} does not exist`});
  }
});

app.get('/movies/add', (req, res) => {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.rating || 4; // default rating if not provided

  if (!title || !year || year.length !== 4 || isNaN(year)) {
    res.status(403).json({status: 403, error: true, message: "you cannot create a movie without providing a title and a year"});
    return;
  }

  const newMovie = {title, year, rating};
  movies.push(newMovie);
  res.json({status: 200, data: movies});
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});