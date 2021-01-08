var express = require("express");
const ArticleController = require("../controllers/ArticleController");
var router = express.Router();

router.get("/", ArticleController.articleList);
router.get("/:id", ArticleController.articleDetail);
router.post("/add-visitor",ArticleController.addVisitor);
router.post("/favorite-article",ArticleController.favoriteArticle);
router.get("/favorite-article/:id",ArticleController.favoriteArticleList);
router.post("/", ArticleController.storeArticle);
router.put("/:id", ArticleController.articleUpdate);

module.exports = router;