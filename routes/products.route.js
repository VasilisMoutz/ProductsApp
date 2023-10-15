const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.findAll);
router.get('/:product', productController.findOne);
router.post('/', productController.create);
router.patch('/:product', productController.update);
router.delete('/:product', productController.delete);

module.exports = router;