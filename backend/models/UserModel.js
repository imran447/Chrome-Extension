var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	picture:{type:String,required:true},
}, {timestamps: true});
module.exports = mongoose.model("User", UserSchema);