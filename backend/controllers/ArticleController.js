const Article = require("../models/ArticleModel");
const UserModel = require("../models/UserModel");
const FavoriteArticle = require("../models/FavoriteArticleModel");
const {body, validationResult} = require("express-validator");
const {sanitizeBody} = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

exports.articleList = [
    function (req, res) {
        try {
            UserModel.findOne({_id:req.params.id}).then((data)=>{
                var articleArry=data.hideArticle;
                if(data.selectedSources.length>0){
                    Article.find({ $and:[
                    {"_id":{$nin:articleArry}},
                    {"source":{$in:data.selectedSources}}
                            ]}
                    ).skip(req.params.pageNo*30).limit(30).sort({created_date:-1}).then((articles) => {
                      if(articles.length>0){
                            return apiResponse.successResponseWithData(res, "Operation success", articles);
                        } else {
                            return apiResponse.successResponseWithData(res, "Operation success", []);
                        }
                    });
                }
                else{
                    Article.find({"_id":{$nin:articleArry}}).skip(req.params.pageNo*30).limit(30).sort({created_date:-1}).then((articles) => {
                        if(articles.length>0){
                            return apiResponse.successResponseWithData(res, "Operation success", articles);
                        } else {
                            return apiResponse.successResponseWithData(res, "Operation success", []);
                        }
                    });
                }

            })
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.filterArticle =[
    function (req, res) {
        try {
            UserModel.findOne({_id:req.params.userId}).then((data)=>{
                var articleArry=data.hideArticle;
                Article.find({"_id":{$nin:articleArry},"game":req.params.filter}).then((articles) => {
                    if (articles.length > 0) {
                        return apiResponse.successResponseWithData(res, "Operation success", articles);
                    } else {
                        return apiResponse.successResponseWithData(res, "Operation success", []);
                    }
                });

            })

        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.mostUpvote=[
    function (req, res) {
        try {
            var articleArry=[];
            UserModel.findOne({_id:req.params.userId}).then((data)=>{
                if(data.hideArticle!=null)
                 articleArry=data.hideArticle;
                if(data.selectedSources.length>0){
                    Article.find({ $and:[
                            {"_id":{$nin:articleArry}},
                            {"source":{$in:data.selectedSources}}
                        ]}
                    ).skip(req.params.pageNo*30).limit(30).sort({upvoteCounter:-1}).then((articles) => {
                        if(articles.length>0){
                            return apiResponse.successResponseWithData(res, "Operation success", articles);
                        } else {
                            return apiResponse.successResponseWithData(res, "Operation success", []);
                        }
                    });
                }
                else{
                    Article.find({"_id":{$nin:articleArry}}).skip(req.params.pageNo*30).limit(30).sort({upvoteCounter:-1}).then((articles) => {
                        console.log(articles.length);

                        if(articles.length>0){
                            return apiResponse.successResponseWithData(res, "Operation success", articles);
                        } else {
                            return apiResponse.successResponseWithData(res, "Operation success", []);
                        }
                    });
                }


            })

        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
exports.mostViewed=[
    function (req, res) {
        try {
            var articleArry=[];
            UserModel.findOne({_id:req.params.userId}).then((data)=>{
                if(data.hideArticle!=null)
                    articleArry=data.hideArticle;
                if(data.selectedSources.length>0){
                    Article.find({ $and:[
                            {"_id":{$nin:articleArry}},
                            {"source":{$in:data.selectedSources}}
                        ]}
                    ).skip(req.params.pageNo*30).limit(30).sort({visitor:-1}).then((articles) => {
                        if(articles.length>0){
                            return apiResponse.successResponseWithData(res, "Operation success", articles);
                        } else {
                            return apiResponse.successResponseWithData(res, "Operation success", []);
                        }
                    });
                }
                else{
                    Article.find({"_id":{$nin:articleArry}}).skip(req.params.pageNo*30).limit(30).sort({visitor:-1}).then((articles) => {
                        if(articles.length>0){
                            return apiResponse.successResponseWithData(res, "Operation success", articles);
                        } else {
                            return apiResponse.successResponseWithData(res, "Operation success", []);
                        }
                    });
                }


            })

        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
exports.filterSourceArticle =[
    function (req, res) {
        try {
            UserModel.findOne({_id:req.params.userId}).then((data)=>{
                var articleArry=data.hideArticle;
                Article.find({"_id":{$nin:articleArry},"source":req.params.filter}).sort({created_date:-1}).then((articles) => {
                    if (articles.length > 0) {
                        return apiResponse.successResponseWithData(res, "Operation success", articles);
                    } else {
                        return apiResponse.successResponseWithData(res, "Operation success", []);
                    }
                });

            })

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
                if(data){
                    return apiResponse.successResponse(res,"Already Add.");
                }
                else{
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
            });

        }
        catch (e) {
            return apiResponse.ErrorResponse(res, e);
        }
    }
];
exports.getHigherArticle=[
    (req,res)=>{
        try{
            Article.find().sort({"visitor":"desc"}).limit(7).then((favArticle)=> {
                if (!favArticle) {
                    return apiResponse.successResponse(res, "hi");
                }
                return apiResponse.successResponseWithData(res, "Favorite Articles.", favArticle);
            });

        }
        catch (e) {
            return apiResponse.ErrorResponse(res, e);
        }
    }
];

exports.uniqueSource = [
    (req,res)=>{
        try{
            Article.distinct("source").then((data)=>{
                if(data){
                    return apiResponse.successResponseWithData(res, "Sources",data);
                }
            })
        }
        catch (e) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
    exports.uniqueSourceArticle = [
     async (req,res)=>{
        try{
            var arry=[];
            var data= await  Article.distinct("source").exec();
            for(var i=0;i<data.length;i++){
             var result=  await Article.findOne({source:data[i]}).exec();
             let source={
                 source:result.source,
                 link:result.link
             }
                arry.push(source);
            }
            return apiResponse.successResponseWithData(res, "Sources",arry);

        }
        catch (e) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.favoriteArticleList =[
    (req,res)=>{
        try{

            UserModel.findOne({_id:req.params.userId}).then((data)=>{
                var articleArry=data.hideArticle;
                FavoriteArticle.find({user:req.params.userId}).populate("article").then((favArticle)=> {
                   var data=[];
                   var flag=0;
                   for(var i=0;i<favArticle.length;i++){
                       console.log(favArticle[i]);
                       flag=0;
                       for(var j=0;j<articleArry.length;j++){
                           if(favArticle[i].article._id==articleArry[j]){
                               flag=1;
                               break;
                           }
                       }
                       if(flag==0){
                           data.push(favArticle[i]);
                       }
                   }
                    if (!favArticle) {
                        return apiResponse.ErrorResponse(res, err);
                    }
                    return apiResponse.successResponseWithData(res, "Favorite Articles.", data);
                });
            })
        }
        catch (e) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.removeFavorite =[
    (req,res)=>{
        try{

                FavoriteArticle.findOneAndRemove({user:req.params.userId,article:req.params.articleId}).then((favArticle)=> {
                    if (!favArticle) {
                        return apiResponse.ErrorResponse(res, "error");
                    }
                    return apiResponse.successResponse(res, "remove article");
                });
        }
        catch (e) {
            return apiResponse.ErrorResponse(res, e);
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


