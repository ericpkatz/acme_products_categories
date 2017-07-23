const express = require('express'),
      db = require('./db'),
      nunjucks = require('nunjucks'),
      path = require('path'),
      categories = require('./routes/categories');

var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.use('/vendors', express.static(path.join(__dirname, 'node_modules')));
app.use(require('body-parser').urlencoded( {extended: false} ));
app.use(require('method-override')('_method'));

app.get('/', function(req, res, next){
  res.render('index.html', {categories: db.getCategoryNames(), nav: 'Home', data: JSON.stringify(db.getDB(), null, ' ')});
});


app.use('/categories', categories);

app.use('/categories/:category/products', function(err, req, res, next){
  res.render('errorProd.html', { error: err, products: db.getProductsByCategory(req.params.category), catName: req.params.category, categories: db.getCategoryNames(), data: JSON.stringify(db.getDB(), null, ' ') });
});


app.post('/', function(req, res, next){
  db.createCategory(req.body);
  res.redirect(`/categories/${ req.body.name }/products`);
});

app.use('/', function(err, req, res, next){
  res.render('errorCat.html', { error: err, products: db.getProductsByCategory(req.params.category), catName: req.params.category, categories: db.getCategoryNames(), data: JSON.stringify(db.getDB(), null, ' ') });
});


var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`listening on port ${ port }`);
});
