const UserModel = require("../models/UserModel");
const SourceModel = require("../models/SourceModel");
const ArticleModel=require("../models/ArticleModel");
const ChromeTopSitesModel = require("../models/TopChromeSites");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
exports.register = [
	// Validate fields.
	body("name").isLength({ min: 1 }).trim().withMessage("name must be specified."),
	body("provider").isLength({ min: 1 }).trim().withMessage("provider must be specified."),
	body("picture").isLength({ min: 1 }).trim().withMessage("Picture must be specified."),
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	sanitizeBody("*").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				SourceModel.distinct("source").then((data)=>{
					var user = new UserModel(
						{
							name: req.body.name,
							email: req.body.email,
							picture: req.body.picture,
							provider:req.body.provider,
							unSelectedSources:data,
							selectedSources:[]
						}
					);
					UserModel.findOne({email : req.body.email}).then((u) => {
						if (u) {
							let uData = {
								_id: u._id,
								name: u.name,
								email: u.email,
								picture:u.picture,
								provider:u.provider
							};
							return apiResponse.successResponseWithData(res, "Registration Success.", uData);
						}
						else
						{
							user.save(function (err) {
								if (err) { return apiResponse.ErrorResponse(res, err); }
								let userData = {
									_id: user._id,
									name: user.name,
									email: user.email,
									picture:user.picture
								};
								return apiResponse.successResponseWithData(res,"Registration Success.", userData);
							});
						}
					});
				});

			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.addChromeSites = [
	body("url").isLength({ min: 1 }).trim().withMessage("url must be specified."),
	body("userId").isLength({ min: 1 }).trim().withMessage("userId must be specified."),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {

				var chromeTopSitesModel = new ChromeTopSitesModel(
					{
						url: req.body.url,
						favicon: req.body.favicon,
						userId: req.body.userId,
					}
				);
				chromeTopSitesModel.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					return apiResponse.successResponseWithData(res,"add Chrome top sites Successfully.", chromeTopSitesModel);
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getUser=[
	(req, res) => {
		try {
			UserModel.findOne({_id:req.params.id}).then((data,err)=>{
				if (!data) { return apiResponse.ErrorResponse(res, err); }
				return apiResponse.successResponseWithData(res,"user", data);
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getChromeSites=[
	(req, res) => {
		try {
			ChromeTopSitesModel.find({userId:req.params.id}).then((data,err)=>{
				if (data.length===0) { return apiResponse.ErrorResponse(res, err); }
				return apiResponse.successResponseWithData(res,"chrome top sites", data);
			});
	} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.userunSelectedSources=[
	(req,res)=>{
	try{
		UserModel.findOne({_id:req.params.userId}).then((data)=>{
			if(data){
				return apiResponse.successResponseWithData(res,"success",data.unSelectedSources);
			}else{
				return apiResponse.successResponse(res,"success");
			}
		});
	}catch (e) {
		return apiResponse.ErrorResponse(res,e);
	}
}];
exports.getSource=[
	(req,res)=>{
		try{
			SourceModel.find({}).then((data)=>{
				if(data)
					return apiResponse.successResponseWithData(res,"sources",data);
				return apiResponse.successResponse(res,"not found");
			})
		}catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.sourceStore=[
	body("source").isLength({ min: 1 }).trim().withMessage("source must be specified."),
	body("icon").isLength({ min: 1 }).trim().withMessage("icon must be specified."),

	sanitizeBody("*").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				let source= new SourceModel({
					source:req.body.source,
					icon:req.body.icon
				});
				source.save(function (err) {
					if(!err)
						return apiResponse.successResponseWithData(res,"sources",source);
					return apiResponse.successResponse(res,"not store");
				})
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.userSelectedSources=[
	(req,res)=>{
		try{
			UserModel.findOne({_id:req.params.userId}).then((data)=>{
				if(data){

					return apiResponse.successResponseWithData(res,"success",data.selectedSources);
				}else{
					return apiResponse.successResponse(res,"success");
				}
			});
		}catch (e) {
			return apiResponse.ErrorResponse(res,e);
		}
	}];
exports.selectSources=[
	(req,res)=> {
		try {
			UserModel.findOne({_id: req.params.userId}).then((data) => {
				if (data) {
					var selectedArray=data.selectedSources;
					var unSelectedArray=data.unSelectedSources;
					var arry=[];
					selectedArray.push(req.params.source);
					for(let j=0;j<unSelectedArray.length;j++){
						if(unSelectedArray[j]!=req.params.source)
							arry.push(unSelectedArray[j]);
					}

					UserModel.findOneAndUpdate({_id:req.params.userId},
						{
							selectedSources:selectedArray ,unSelectedSources:arry}).then((data)=>{
								if(data){
									return  apiResponse.successResponse(res,"success");
								}
							})
				} else {
					return apiResponse.successResponse(res, "not found");
				}
			});
		} catch (e) {
			return apiResponse.ErrorResponse(res, e);
		}
}];

exports.unSelectSources=[
	(req,res)=> {
		try {
			UserModel.findOne({_id: req.params.userId}).then((data) => {
				if (data) {

					var selectedArray=[];
					var unSelectedArray=data.unSelectedSources;
					for(let i=0;i<data.selectedSources.length;i++){
						if(data.selectedSources[i]!=req.params.source)
							selectedArray.push(data.selectedSources[i]);
					}
					unSelectedArray.push(req.params.source);
					UserModel.findOneAndUpdate({_id:req.params.userId},
						{
							selectedSources:selectedArray,unSelectedSources:unSelectedArray}).then((data)=>{
						if(data){
							return  apiResponse.successResponse(res,"success");
						}
					})
				} else {
					return apiResponse.successResponse(res, "not found");
				}
			});
		} catch (e) {
			return apiResponse.ErrorResponse(res, e);
		}
	}];
exports.upvoteArticle=[
  // body("userId").isLength({ min: 1 }).trim().withMessage("name must be specified."),
  // sanitizeBody("*").escape(),
  (req, res) => {
    try {
        let query;
        let upvotesArticles;
        UserModel.findOne({_id:req.params.userId}).then((data)=> {
            let upvotes = data.upvoteArticle;
            upvotesArticles=upvotes;
            let flag=0;
            for(let i=0;i<upvotes.length;i++){
                if(upvotes[i].articleId==req.params.id){
                    flag=1;
                    break;
                }
            }
            if(flag==0){
                let upvote={
                    articleId:req.params.id,
                    flag:1
                }
                UserModel.findOneAndUpdate({_id:req.params.userId},
                    {$push:{upvoteArticle:upvote}}).then((data)=>{
                    if(data){
                        ArticleModel.findOne({_id:req.params.id}).then((article)=>{
                            if(article) {
                                query = ++(article.upvoteCounter);
                                ArticleModel.findOneAndUpdate({_id:req.params.id},
                                    {$set:{upvoteCounter:query}}).then((response)=>{
                                    if(response){
                                        ArticleModel.findOne({_id:req.params.id}).then((data)=>{
                                            return apiResponse.successResponseWithData(res,"update successfully.",data);
                                        });
                                    }
                                    else{
                                        return apiResponse.successResponse(res,"errors");
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else{
            	console.log("here");
                for(let i=0;i<upvotesArticles.length;i++){
                    if(upvotesArticles[i].articleId==req.params.id){
                    	console.log("hello");
						if(upvotes[i].flag==0){
							upvotesArticles[i].flag=1;
							query=1;
						}
						else if(upvotes[i].flag==1){
							query=0;
							upvotesArticles[i].flag=0;
						}
						break;
					}
                }
                console.log(upvotesArticles);
                UserModel.findOneAndUpdate({_id:req.params.userId},
                    {$set:{upvoteArticle:upvotesArticles}}).then((data)=>{
                    if(data){
                        ArticleModel.findOne({_id:req.params.id}).then((article)=>{
                            if(article) {
                            	if(query==1)
                                	query = ++(article.upvoteCounter);
                            	if(query==0)
									query = --(article.upvoteCounter);
                                ArticleModel.findOneAndUpdate({_id:req.params.id},
                                    {$set:{upvoteCounter:query}}).then((response)=>{
                                    if(response){
                                        ArticleModel.findOne({_id:req.params.id}).then((data)=>{
                                            return apiResponse.successResponseWithData(res,"update successfully.",data);
                                        });
                                    }
                                    else{
                                        return apiResponse.successResponse(res,"errors");
                                    }
                                });
                            }
                        });
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
exports.hideArticle=[
	body("userId").isLength({ min: 1 }).trim().withMessage("name must be specified."),
	sanitizeBody("*").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			UserModel.findByIdAndUpdate(
				{_id:req.body.userId},
				{ $push: { hideArticle: req.params.id }}).then((data)=>{
				if (!data) {
					return apiResponse.ErrorResponse(res,);
				}else{
					return apiResponse.successResponse(res,"update successfully.");
				}
			});


		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.deleteChromeSites=[
	(req, res) => {
		try {
			ChromeTopSitesModel.findOne({_id:req.params.id}).then((data)=>{

				if (data){
					ChromeTopSitesModel.findByIdAndRemove(req.params.id,function (err) {
						if (err) {
							return apiResponse.ErrorResponse(res, err);
						}else{
							return apiResponse.successResponse(res,"delete successfully.");
						}
					});
				}
				else{
					return apiResponse.successResponse(res, 'not found');s
				}

			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
