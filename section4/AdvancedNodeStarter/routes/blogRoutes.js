const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {

    // Basic Cahsing Setup Using Redis Node
    // If data exits in redis based on th eus er id than we are gonna go through sending it other wise we are gonna send the direct mongo db thing
    // const redis = require('redis');
    // const redisUrl = 'redis://127.0.0.1:6379'

    // const client = redis.createClient(redisUrl);
    // const util = require('util');
    // client.get = util.promisify(client.get);
    // const data = await client.get(req.user.id)

    // if (data) {
    //   console.log("Returning From Cashed Data");
    //   return res.json(JSON.parse(data));
    // }

    const blogs = await Blog.find({ _user: req.user.id });
    // client.set(req.user.id, JSON.stringify(blogs));
    // console.log("Returning From Mongo DB");
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
