const express = require('express');
const { create, getAll, update, remove } = require('../Controllers/characterController');
const authenticate = require('../Middlewares/authenticate'); 

const router = express.Router();

router.post('/create', authenticate, create);


router.get('/', authenticate, getAll);

router.put('/update', authenticate, update);

router.delete('/:characterId', authenticate, remove);

module.exports = router;
