const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model:Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const newTag = await Tag.create(req.body);
      res.status(201).json(newTag);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.put('/:id', async (req, res) => {
    try {
      const updatedTag = await Tag.update(req.body, {
        where: { id: req.params.id }
      });
      res.json(updatedTag);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deletedTag = await Tag.destroy({
        where: { id: req.params.id }
      });
      res.json({ message: 'Tag deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
