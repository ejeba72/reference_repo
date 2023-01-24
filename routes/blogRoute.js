const { Router } = require('express');
const { getListLogic, getByIdLogic } = require('../controllers/blogController');

const router = Router();

router.get('/', getListLogic);
router.get('/:id', getByIdLogic);

module.exports = { router };
