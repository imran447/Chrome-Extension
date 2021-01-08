const Article = require("../models/ArticleModel");
const FavoriteArticle = require("../models/FavoriteArticleModel");
const {body, validationResult} = require("express-validator");
const {sanitizeBody} = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

exports.articleList = [
    function (req, res) {
        try {
            Article.find({}).then((articles) => {
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
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.successResponseWithData(res, "Operation success", {});
        }
        try {
            Article.findOne({_id: req.params.id}).then((article) => {
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
exports.addVisitor = [
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            Article.findById(req.body.id, function (err, article) {
                console.log(article);
                if (article === null) {
                    return apiResponse.notFoundResponse(res, "article not exists with this id");
                } else {
                    Article.findByIdAndUpdate(req.body.id, {visitor:(++article.visitor)}, function (err,data) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        } else {
                            return apiResponse.successResponseWithData(res, "article update Success.", data);
                        }
                    });
                    
                }
            });
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.favoriteArticle =[
    sanitizeBody("*").escape(),
    (req,res)=>{
        try{
            FavoriteArticle.findOne({user:req.body.userId,article:req.body.article}).then((data)=>{
                if(!data){
                    var article = new FavoriteArticle({
                        user: req.body.userId,
                        article: req.body.article,
                    });

                    article.save(function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        }
                        return apiResponse.successResponseWithData(res, "Favorite Article add Success.", article);
                    });
                }
                return apiResponse.successResponse(res,"Favorite Article add Success.");
            });

        }
        catch (e) {
            return apiResponse.ErrorResponse(res, e);
        }
    }
];
exports.favoriteArticleList =[
    (req,res)=>{
        try{
          FavoriteArticle.find({user:req.params.id}).populate("article").
          exec(function (err,favArticle) {
              if (err) {
                  return apiResponse.ErrorResponse(res, err);
              }
              return apiResponse.successResponseWithData(res, "Favorite Article add Success.", favArticle);
          });
        }
        catch (e) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.storeArticle = [
    body("title", "Title must not be empty.").trim(),
    body("description", "Description must not be empty.").trim(),
    body("source", "source must not be empty").trim(),
    body("image", "image must not be empty").trim(),
    body("links", "link must not be empty").trim(),
    body("sportType", "sportType must not be empty").trim(),
    body("team", "team must not be empty").trim(),
    body("player", "player must not be empty").trim(),
    body("language", "language must not be empty").trim(),


    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var article = new Article(
                {
                    title: req.body.title,
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
    body("title", "Title must not be empty.").trim(),
    body("description", "Description must not be empty.").trim(),
    body("source", "source must not be empty").trim(),
    body("image", "image must not be empty").trim(),
    body("links", "link must not be empty").trim(),
    body("sportType", "sportType must not be empty").trim(),
    body("team", "team must not be empty").trim(),
    body("player", "player must not be empty").trim(),
    body("language", "language must not be empty").trim(),

    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var article = new Article(
                {
                    title: req.body.title,
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
                                article.findByIdAndUpdate(req.params.id, article, {}, function (err) {
                                    if (err) {
                                        return apiResponse.ErrorResponse(res, err);
                                    } else {
                                        return apiResponse.successResponseWithData(res, "article update Success.", article);
                                    }
                                });

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


