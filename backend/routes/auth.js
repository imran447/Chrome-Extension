var express = require("express");
const AuthController = require("../controllers/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.get("/:id",AuthController.getUser);
router.post("/addChromeSites",AuthController.addChromeSites);
router.get("/getChromeSites/:id",AuthController.getChromeSites);
router.delete("/deleteChromeSites/:id",AuthController.deleteChromeSites);
router.put("/hideArticle/:id",AuthController.hideArticle);

module.exports = router;