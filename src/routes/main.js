// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); ///cambiado
router.get('/search', mainController.search); ///cambiado

module.exports = router;
