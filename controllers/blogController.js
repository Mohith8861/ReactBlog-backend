const blog = require("../models/blogModels");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getSlugBlogs = catchAsync(async function (req, res) {
  const blogs = JSON.stringify(
    await blog
      .findOne({
        slug: req.params.slug,
      })
      .populate({ path: "reviews" })
  );

  res.status(200).json({
    status: "success",
    data: JSON.parse(blogs),
  });
});

exports.getAllBlogs = catchAsync(async function (req, res) {
  const blogs = await blog.find({
    $text: { $search: req.query.q },
  });
  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: blogs,
  });
});

exports.getBlog = factory.getAll(blog);

exports.updateBlog = factory.updateOne(blog);

exports.createBlog = factory.createOne(blog);

exports.searchBlog = factory.getOne(blog, { path: "reviews" });

exports.deleteBlog = factory.deleteOne(blog);
