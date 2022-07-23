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


Product.belongsToMany(Tag, {
  through: "productTag",
  // as: "products",
  foreignKey: "product_id",
});
Tag.belongsToMany(Product, {
  through: "productTag",
  // as: "tags",
  foreignKey: "tag_id",
});


// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
