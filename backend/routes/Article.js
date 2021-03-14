var express = require("express");
const ArticleController = require("../controllers/ArticleController");
var router = express.Router();

router.get("/:id/:pageNo", ArticleController.articleList);
router.post("/add-visitor",ArticleController.addVisitor);
router.get("/filterArticle/:userId/:filter",ArticleController.filterArticle);
router.get("/filterSourceArticle/:userId/:filter",ArticleController.filterSourceArticle);
router.get("/most/Upvote/:userId/:pageNo",ArticleController.mostUpvote);
router.get("/most/Viewed/:userId/:pageNo",ArticleController.mostViewed);
router.post("/favorite-article",ArticleController.favoriteArticle);
router.post("/", ArticleController.storeArticle);
router.get("/getHigherArticle",ArticleController.getHigherArticle);
router.get("/favorite/article/:userId",ArticleController.favoriteArticleList);
router.get("/uniqueSource",ArticleController.uniqueSource);
router.get("/uniqueSourceArticle",ArticleController.uniqueSourceArticle);

router.put("/:id", ArticleController.articleUpdate);

module.exports = router;
