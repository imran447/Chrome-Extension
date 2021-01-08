const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");

exports.register = [
	// Validate fields.
	body("name").isLength({ min: 1 }).trim().withMessage("name must be specified."),
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
					}
				);
				 UserModel.findOne({email : req.body.email}).then((u) => {
					 if (u) {
						 let uData = {
							 _id: u._id,
							 name: u.name,
							 email: u.email,
							 picture:u.picture
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

exports.login = [
];
