const UserModel = require("../models/UserModel");
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

				var user = new UserModel(
					{
						name: req.body.name,
						email: req.body.email,
						picture: req.body.picture,
						provider:req.body.provider
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
