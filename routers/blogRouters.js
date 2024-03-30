const express = require("express");

const blogController = require("../controllers/blogController");

const authController = require("../controllers/authController");

const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use(
  "/:blogId/reviews",
  (req, res, next) => {
    next();
  },
  reviewRouter
);

router
  .route("/")
  .get(blogController.getBlog)
  .patch(
    authController.protect,
    // authController.restrictTo("admin", "lead-guide"),
    blogController.updateBlog
  )
  .post(
    authController.protect,
    // authController.restrictTo("admin", "lead-guide"),
    blogController.createBlog
  );
router.get("/search", blogController.getAllBlogs);
router.get("/search/:slug", blogController.getSlugBlogs);
router
  .route("/:id")
  .get(blogController.searchBlog)
  .patch(
    authController.protect,
    // authController.restrictTo("admin", "lead-guide"),
    blogController.updateBlog
  )
  .delete(
    authController.protect,
    // authController.restrictTo("admin", "lead-guide"),
    blogController.deleteBlog
  );

module.exports = router;
