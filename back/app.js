const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const authRouter = require('./routes/auth/auth')

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/auth', authRouter);

app.get("/", (req,res) => {
  res.send("youhou");
})
/// dans le cas d'une route non trouvée, je retourne le code 404 'Not Found'
app.use(function(req, res, next) {
  var  err  =  new  Error('Not Found');
  err.status  =  404;
  next(err);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));

const server = app.listen (process.env.PORT || 5000, function(){
  console.log('Listening on port '  +  server.address().port);
})