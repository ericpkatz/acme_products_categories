const app = require('express').Router(),
      db = require('../db');

app.get('/:category/products', function(req, res, next){
  res.render('category.html', {products: db.getProductsByCategory(req.params.category), catName: req.params.category, categories: db.getCategoryNames(), data: JSON.stringify(db.getDB(), null, ' ')});
});


app.post('/:category/products', function(req, res, next){
  var category = req.params.category;
  db.createProduct(req.body, category);
  res.redirect(`/categories/${ category }/products`);
});

app.delete('/:category/products/:id', function(req, res, next){
  var category = req.params.category;
  db.deleteProduct(req.params.id * 1, category);
  res.redirect(`/categories/${ category }/products`);
});

app.delete('/:category/products', function(req, res, next){
  var category = req.params.category;
  db.deleteCategory(category);
  res.redirect('/');
});


module.exports = app;
