const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");

exports.register = [
	// Validate fields.
	body("name").isLength({ min: 1 }).trim().withMessage("name must be specified.")
		.isAlphanumeric().withMessage("name has non-alphanumeric characters."),
	body("picture").isLength({ min: 1 }).trim().withMessage("Picture must be specified."),
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return UserModel.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),

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
				//hash input password
				bcrypt.hash(req.body.password,10,function(err, hash) {
					// generate OTP for confirmation
					let otp = utility.randomNumber(4);
					// Create User object with escaped and trimmed data
					var user = new UserModel(
						{
							name: req.body.name,
							email: req.body.email,
							picture: req.body.picture,
						}
					);
					user.save(function (err) {
						if (err) { return apiResponse.ErrorResponse(res, err); }
						let userData = {
							_id: user._id,
							name: user.name,
							email: user.email
						};
						return apiResponse.successResponseWithData(res,"Registration Success.", userData);
					});

				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.login = [
];
