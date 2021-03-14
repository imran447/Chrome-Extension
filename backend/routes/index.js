var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	res.render(path.join(__dirname,'public/index.html'));
});

module.exports = router;
