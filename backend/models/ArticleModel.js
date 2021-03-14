var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {type: String, required: false},
    description: {type: String, required: false},
    source: {type: String, required: false},
    image:{type: String, required: false},
    link:{type: String, required: false},
    sportType:{type: String, required: false},
    team:{type: String, required: false},
    player:{type: String, required: false},
    language:{type: String, required: false},
    upvoteCounter:{type:Number,required:false,default:0},
    picks:{type: String, required: false},
    visitor:{type:Number,required:false,default : 0}
}, {timestamps: true});

module.exports = mongoose.model("Article", ArticleSchema);