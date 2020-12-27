const Article = require("../models/ArticleModel");
const {body, validationResult} = require("express-validator");
const {sanitizeBody} = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

exports.articleList = [
    auth,
    function (req, res) {
        try {
            Article.find({user: req.user._id}, "_id title description isbn createdAt").then((articles) => {
                if (articles.length > 0) {
                    return apiResponse.successResponseWithData(res, "Operation success", articles);
                } else {
                    return apiResponse.successResponseWithData(res, "Operation success", []);
                }
            });
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.articleDetail = [
    auth,
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.successResponseWithData(res, "Operation success", {});
        }
        try {
            Article.findOne({_id: req.params.id, user: req.user._id},).then((article) => {
                if (article !== null) {
                    return apiResponse.successResponseWithData(res, "Operation success", article);
                } else {
                    return apiResponse.successResponseWithData(res, "Operation success", {});
                }
            });
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


exports.storeArticle = [
    auth,
    body("title", "Title must not be empty.").isLength({min: 1}).trim(),
    body("description", "Description must not be empty.").isLength({min: 1}).trim(),
    body("source", "source must not be empty").isLength({min: 1}).trim(),
    body("image", "image must not be empty").isLength({min: 1}).trim(),
    body("links", "link must not be empty").isLength({min: 1}).trim(),
    body("sportType", "sportType must not be empty").isLength({min: 1}).trim(),
    body("team", "team must not be empty").isLength({min: 1}).trim(),
    body("player", "player must not be empty").isLength({min: 1}).trim(),
    body("language", "language must not be empty").isLength({min: 1}).trim(),


    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var article = new Article(
                {
                    title: req.body.title,
                    user: req.user,
                    description: req.body.description,
                    source: req.body.source,
                    image: req.body.image,
                    language: req.body.language,
                    link: req.body.links,
                    sportType: req.body.sportType,
                    player: req.body.player,
                    team: req.body.team

                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                article.save(function (err) {
                    if (err) {
                        return apiResponse.ErrorResponse(res, err);
                    }
                    return apiResponse.successResponseWithData(res, "Article add Success.", article);
                });
            }
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.articleUpdate = [
    auth,
    body("title", "Title must not be empty.").isLength({min: 1}).trim(),
    body("description", "Description must not be empty.").isLength({min: 1}).trim(),
    body("source", "source must not be empty").isLength({min: 1}).trim(),
    body("image", "image must not be empty").isLength({min: 1}).trim(),
    body("links", "link must not be empty").isLength({min: 1}).trim(),
    body("sportType", "sportType must not be empty").isLength({min: 1}).trim(),
    body("team", "team must not be empty").isLength({min: 1}).trim(),
    body("player", "player must not be empty").isLength({min: 1}).trim(),
    body("language", "language must not be empty").isLength({min: 1}).trim(),

    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var article = new Article(
                {
                    title: req.body.title,
                    user: req.user,
                    description: req.body.description,
                    source: req.body.source,
                    image: req.body.image,
                    language: req.body.language,
                    link: req.body.links,
                    sportType: req.body.sportType,
                    player: req.body.player,
                    team: req.body.team
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                } else {
                    Article.findById(req.params.id, function (err, article) {
                        if (article === null) {
                            return apiResponse.notFoundResponse(res, "article not exists with this id");
                        } else {
                            //Check authorized user
                            if (article.user.toString() !== req.user._id) {
                                return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
                            } else {
                                article.findByIdAndUpdate(req.params.id, article, {}, function (err) {
                                    if (err) {
                                        return apiResponse.ErrorResponse(res, err);
                                    } else {
                                        return apiResponse.successResponseWithData(res, "article update Success.", article);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


exports.articleDelete = [
    auth,
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Article.findById(req.params.id, function (err, article) {
                if (article === null) {
                    return apiResponse.notFoundResponse(res, "Article not exists with this id");
                } else {
                    //Check authorized user
                    if (article.user.toString() !== req.user._id) {
                        return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
                    } else {
                        article.findByIdAndRemove(req.params.id, function (err) {
                            if (err) {
                                return apiResponse.ErrorResponse(res, err);
                            } else {
                                return apiResponse.successResponse(res, "Article delete Success.");
                            }
                        });
                    }
                }
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];