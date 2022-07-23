const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

    try {
      const categories = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try {
      const category_id = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });

      if (!category_id) {
        res.status(404).json({ message: 'No such category.' });
        return;
      }

      res.status(200).json(category_id);
    } catch (err) {
      res.status(500).json(err);
    }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', (req, res) => {
  // update a category by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const updateCat = await Category.update(req.body, {
        where: {
          id: req.params.id}
        }
      )
  
      if (!updateCat) {
        res.status(404).json({ message: 'No such category to delete.' });
        return;
      }
  
      res.status(200).json(updateCat);
    } catch (err) {
      res.status(500).json(err);
    }
  
  });
  

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delCategory) {
      res.status(404).json({ message: 'No such category to delete.' });
      return;
    }

    res.status(200).json(delCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
