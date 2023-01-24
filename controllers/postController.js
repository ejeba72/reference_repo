const mongoose = require('mongoose');
const { estimateReadingTime } = require('../helpers/utilities');
const { Blog } = require('../Models/BlogModel');

// GET ALL LOGIC
async function getAllLogic(req, res) {
  try {
    const { p = 1, lim = 20 } = req.query; // Pagination is defaulted to 20 blogs per page.
    const allBlogs = await Blog.find({ user: req.user })
      .limit(lim)
      .skip((p - 1) * lim);

    console.log(allBlogs);
    res.status(200).send(allBlogs);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

// GET LIST LOGIC
async function getListLogic(req, res) {
  try {
    const { p = 1, lim = 20 } = req.query; // Pagination is defaulted to 20 blogs per page.
    const blog = await Blog.find({
      user: req.user,
    })
      .limit(lim)
      .skip((p - 1) * lim);

    const blogList = blog.map(article => {
      return {
        title: article.title,
        state: article.state,
      };
    });

    console.log(blogList);
    res.status(200).send(blogList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

// CREATE POST LOGIC
async function createPostLogic(req, res) {
  try {
    const readingTime = estimateReadingTime(req.body.body);
    const newBlog = new Blog({ ...req.body, user: req.user, readingTime });

    savedBlog = await newBlog.save();

    const successMsg = {
      status: 'Your blog post has been created successfully',
      Blog: savedBlog,
    };

    console.log(successMsg);
    res.status(201).send(successMsg);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

// UPDATE POST LOGIC
async function updatePostLogic(req, res) {
  try {
    const { id } = req.params;

    const { title, description, state, tags, body } = req.body;

    const blog = await Blog.findOne({
      _id: mongoose.Types.ObjectId(id),
      user: req.user,
    });

    if (!blog) {
      return res.status(404).send(`404 Not Found`);
    }

    // console.log(req.body, blog);

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.state = state || blog.state;
    blog.tags = tags || blog.tags;
    blog.body = body || blog.body;
    blog.readingTime = estimateReadingTime(blog.body);

    await blog.save();

    console.log(blog);
    res.status(200).send(blog);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
}

// DELETE POST LOGIC
async function deletePostLogic(req, res) {
  try {
    const { id } = req.params;

    await Blog.deleteOne({ _id: mongoose.Types.ObjectId(id), user: req.user });

    return res.status(200).send(`Your blog was deleted successfully`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllLogic,
  getListLogic,
  createPostLogic,
  updatePostLogic,
  deletePostLogic,
};
