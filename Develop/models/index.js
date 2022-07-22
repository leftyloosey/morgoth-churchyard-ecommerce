// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',

});


// Categories have many Products
Category.hasMany(Product, {
  // foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)

// Product.hasOne(Category, {
//   c
//   onDelete: 'CASCADE'
// });

// Category.belongsTo(Product, {
  // foreignKey: 'category_id'
// });

Product.belongsToMany(Tag, { through: 'product_tag' });
Tag.belongsToMany(Product, { through: 'product_tag' });


// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
