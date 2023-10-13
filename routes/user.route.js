const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

//for each request call the corresponding controller
router.get('/', userController.findAll);
router.get('/:username', userController.findOne); 
router.post('/', userController.create);
router.patch('/:username', userController.update);
router.delete('/:username', userController.delete);

module.exports = router;