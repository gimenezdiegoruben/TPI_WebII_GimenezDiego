const express = require('express');
const router = express.Router();
const postController = require('../controller/post');

router.get('/', postController.index);
router.get('/new', postController.newForm);
router.get('/:id', postController.show);
router.post('/', postController.create);

module.exports = router;