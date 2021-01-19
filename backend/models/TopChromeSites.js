var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TopChromeSitesSchema = new mongoose.Schema({
    url: {type: String},
    userId:{type: Schema.ObjectId, ref: "User"},
}, {timestamps: true});
module.exports = mongoose.model("TopChromeSites", TopChromeSitesSchema);