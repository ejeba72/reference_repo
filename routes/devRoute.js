// ATTENTION: THIS FILE EXIST FOR DEVELOPMENT PURPOSE ONLY!  ;)

const { Router } = require('express');
const { Blog } = require('../Models/BlogModel');
const { User } = require('../Models/UserModel');

const router = Router();

router.get('/all_users/', async (req, res) => {
  try {
    const { password, ...allUsers } = await User.find();

    console.log(allUsers);
    res.send(allUsers);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});

router.get('/all_blogs/', async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    console.log(allBlogs);
    res.send(allBlogs);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});

module.exports = { router };

/* 
{
  "tags": [],
  "_id": "6363876a1eff2246bdcc235e",
  "title": "my fifth post",
  "description": "my fifth desc",
  "author": "Kelvin Umukoro",
  "state": "published",
  "body": "Hello readers, This is my fifth blog post",
  "timestamp": "2022-11-03T09:18:34.776Z",
  "__v": 0
}
*/

/* 
 {
    "_id": "636677e8183b50f59c89f454",
    "title": "The seventh post",
    "description": "An exciting article",
    "author": "Joshua Olusanya",
    "state": "published",
    "tags": [],
    "body": "Hello readers, This is a very awesome blog post",
    "createdAt": "2022-11-05T14:49:12.777Z",
    "updatedAt": "2022-11-05T14:49:12.777Z",
    "__v": 0
  }
*/

/* 
{
  "title": "The eight post",
  "description": "An exciting article",
  "author": "Joseph Omoruyi",
  "body": "hello, world! Great to meet you.",
  "state": "draft"
}
*/

/* 
{
  "title": "The 9th post",
  "description": "A fantastic article",
  "author": "Jackson Adebayo",
  "body": "hello, world! Great to meet you.",
  "state": "draft"
}
*/
