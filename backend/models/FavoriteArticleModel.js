var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var FavriteArticleSchema = new mongoose.Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    article:{ type: Schema.ObjectId, ref: "Article" }
}, {timestamps: true});
module.exports = mongoose.model("FavoriteArticle", FavriteArticleSchema);