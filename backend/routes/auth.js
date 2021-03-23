var express = require("express");
const AuthController = require("../controllers/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.get("/:id",AuthController.getUser);
router.post("/addChromeSites",AuthController.addChromeSites);
router.get("/getChromeSites/:id",AuthController.getChromeSites);
router.delete("/deleteChromeSites/:id",AuthController.deleteChromeSites);
router.put("/hideArticle/:id",AuthController.hideArticle);
router.get("/upvoteArticle/:id/:userId",AuthController.upvoteArticle);
router.get("/userunSelectedSources/:userId",AuthController.userunSelectedSources);
router.get("/userSelectedSources/:userId",AuthController.userSelectedSources);
router.put("/selectSources/:userId/:source",AuthController.selectSources);
router.post("/sourceStore",AuthController.sourceStore);
router.get("/source/Store",AuthController.getSource);

router.put("/unSelectSources/:userId/:source",AuthController.unSelectSources);

module.exports = router;
