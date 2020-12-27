var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    source: {type: String, required: true},
    image:{type: String, required: true},
    link:{type: String, required: true},
    sportType:{type: String, required: true},
    team:{type: String, required: true},
    player:{type: String, required: true},
    language:{type: String, required: true},
    picks:{type: String, required: false},
    user: {type: Schema.ObjectId, ref: "User", required: true},
}, {timestamps: true});

module.exports = mongoose.model("Article", ArticleSchema);