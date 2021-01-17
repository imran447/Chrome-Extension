var express = require("express");
const ArticleController = require("../controllers/ArticleController");
var router = express.Router();

router.get("/:id/:pageNo", ArticleController.articleList);
router.post("/add-visitor",ArticleController.addVisitor);
router.get("/filterArticle/:userId/:filter",ArticleController.filterArticle);
router.post("/favorite-article",ArticleController.favoriteArticle);
router.get("/favorite-article/:id",ArticleController.favoriteArticleList);
router.post("/", ArticleController.storeArticle);
router.put("/:id", ArticleController.articleUpdate);

module.exports = router;