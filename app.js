const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())

app.set('view engine', 'pug');

app.use((req, res, next) => {
  req.message = 'This mssg made it~~~!';
  next();
});

app.use((req, res, next) => {
  console.log(req.message)
  next();
})

app.get('/', (req, res) => {
  const name = req.cookies.username
  if (name) {
    res.render('index', {name: name})
  }
  else {
    res.redirect('/hello')
  }

  res.render('index', {name: name});
});

app.get('/cards', (req, res) => {
  res.render('card', {prompt: "Whos is buried in Eli's Tomb?"});
});

app.get('/hello', (req, res) => {
  res.render('hello');
});

//if there is a cookie, show button. button has clearCookie method

app.post('/hello', (req, res) => {
  const name = res.cookie('username', req.body.username)
  if (name) {
    res.redirect('/');

  }
  else {
    res.render('index')
  }

});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username')
  res.redirect('/hello')
});

app.listen(3000, () => {
  console.log('App is running on port 3000')
});
