/* 
PURPOSE OF THE POST ROUTE
This route is written to enable a user (ie author) to be able to perform CRUD operations on only the posts that belong to him.
 */

const { Router } = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getAllLogic,
  getListLogic,
  createPostLogic,
  updatePostLogic,
  deletePostLogic,
} = require('../controllers/postController');

const router = Router();

router.use('/', verifyToken);

router.route('/').get(getAllLogic).post(createPostLogic);
router.route('/:id').patch(updatePostLogic).delete(deletePostLogic);
router.route('/post_list').get(getListLogic);

module.exports = { router };
