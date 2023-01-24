const { Blog } = require('../Models/BlogModel');

// GET LIST LOGIC
async function getListLogic(req, res) {
  try {
    const {
      p = 1,
      lim = 20,
      author,
      title,
      tags,
      sortKey,
      sortOrder,
    } = req.query; // Pagination is defaulted to 20 blogs per page.

    const searchQuery = { state: 'published' };

    if (author)
      searchQuery.author = {
        $regex: decodeURIComponent(author),
        $options: 'i',
      };

    if (title)
      searchQuery.title = {
        $regex: decodeURIComponent(title),
        $options: 'i',
      };

    if (tags) searchQuery.tags = decodeURIComponent(tags);

    console.log(searchQuery);

    const sortQuery = {};

    const order =
      (sortOrder?.toLowerCase() === 'asc' && 1) ||
      (sortOrder?.toLowerCase() === 'desc' && -1);

    if (sortKey === 'readCount' && order) sortQuery.readCount = order;
    if (sortKey === 'readingTime' && order) sortQuery.readingTime = order;
    if (sortKey === 'timestamp' && order) sortQuery.createdAt = order;

    const blog = await Blog.find(searchQuery)
      .sort(sortQuery)
      .limit(lim)
      .skip((p - 1) * lim);

    const blogList = blog.map(article => {
      return {
        title: article.title,
        author: article.author,
      };
    });

    console.log(blogList);
    res.status(200).send(blogList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

// GET BY ID LOGIC
async function getByIdLogic(req, res) {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { readCount: 1 } },
      { new: true }
    );

    if (blog.state === 'draft') {
      return res.status(403).send(`403 Forbidden`);
    }

    const blogPost = {
      title: blog.title,
      author: blog.author,
      readCount: blog.readCount,
      body: blog.body,
    };

    console.log(blogPost);
    res.send(blogPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

module.exports = {
  getListLogic,
  getByIdLogic,
};
