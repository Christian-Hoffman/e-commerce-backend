const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
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
  try {
    const data = await Tag.findByPk(req.params.id , 
      {
        include: [{ model: Product }],
      });
    if (!data) {
      res.status(404).json({
        message: 'That id is not associated with any tag'
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({
        message: 'That id is not associated with any tag'
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({
        message: 'That id is not associated with any tag'
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
