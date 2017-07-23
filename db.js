var categories = {
  'Foo Category': [
    {
      name: 'foo 1',
      id: 1
    },
    {
      name: 'foo 2',
      id: 2
    }
  ],
  'Bar Category': [
    {
      name: 'bar 1',
      id: 1
    },
    {
      name: 'bar 2',
      id: 2
    }
  ]
};

module.exports = {
  getDB: function(){
    return categories;
  },
  getCategoryNames: function(){
    return Object.keys(categories);
  },
  getProductsByCategory: function(categoryName){
    return categories[categoryName];
  },
  createProduct: function(product, catName){
    if (!product.name){
      throw 'Product name required!';
    }
    var products = categories[catName];
    if (products.length > 0){
      product.id = products[products.length - 1].id + 1;
    } else {
      product.id = 1;
    }
    products.push(product);

  },
  deleteProduct: function(id, catName){
    categories[catName] = categories[catName].filter(function(product){
      return product.id !== id;
    });
  },
  deleteCategory: function(category){
    categories = Object.keys(categories).filter(function(key){
        return key !== category;
      }).reduce(function(obj, key){
        obj[key] = categories[key];
        return obj;
      }, {});
  },
  createCategory: function(obj){
    if (!obj.name){
      throw 'Category name required!';
    }
    if (!categories[obj.name]){
      categories[obj.name] = [];
    }
  }
};

