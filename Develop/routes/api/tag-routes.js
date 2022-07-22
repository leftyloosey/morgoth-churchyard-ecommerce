const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }


});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tag_id = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tag_id) {
      res.status(404).json({ message: 'No such tag.' });
      return;
    }

    res.status(200).json(tag_id);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    
    if (!updateTag) {
      res.status(404).json({ message: 'No such tag to update.' });
      return;
    }

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delTag) {
      res.status(404).json({ message: 'No such tag to delete.' });
      return;
    }

    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
