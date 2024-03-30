const mongoose = require("mongoose");
const slugify = require("slugify");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  author: { type: String, required: true },
  stars: { type: Number, default: 0 },
  premium: { type: Boolean, required: true, default: false },
  content: [
    {
      heading: String,
      img: String,
      subtext: [
        {
          title: String,
          text: String,
          img: String,
          imgcap: String,
        },
      ],
      subimg: [
        {
          img: String,
          imgcap: String,
          title: String,
        },
      ],
      imgcap: String,
      text: String,
    },
  ],
  category_name: { type: String },
  publishedDate: { type: Date },
});
blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.publishedDate = Date.now();
  next();
});
blogSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "blog",
  localField: "_id",
});
const blog = mongoose.model("Blog", blogSchema);

module.exports = blog;
