const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
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
  try {
    const data = await Category.findByPk(req.params.id, 
      { include: [{ model: Product }],
    });
    if (!data) {
      res.status(404).json({
        message: 'That id is not associated with any category'
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({
        message: 'That id is not associated with any category'
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Product.destroy({
      where: {
        category_id: req.params.id
      }
    });
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({
        message: 'That id is not associated with any category'
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
