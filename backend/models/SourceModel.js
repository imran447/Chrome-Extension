var mongoose = require("mongoose");
var SourceSchema = new mongoose.Schema({
    source: {type: String, required: true},
    icon: {type: String, required: true},
}, {timestamps: true});
module.exports = mongoose.model("Source", SourceSchema);
