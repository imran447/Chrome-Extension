var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var upvoteSchema=new mongoose.Schema({
  articleId:{type: Schema.ObjectId, ref: "Article"},
  flag:{type: Number,default:0},
})
var UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	picture:{type:String,required:true},
	provider:{type:String,required:true},
	hideArticle:{type:Array},
	selectedSources:{type:Array},
	unSelectedSources:{type:Array},
    upvoteArticle:[upvoteSchema],
	upvote:{type:Number,default:0}
}, {timestamps: true});
module.exports = mongoose.model("User", UserSchema);
