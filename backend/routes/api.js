var express = require("express");
var authRouter = require("./auth");
var articleRouter=require("./Article");

var app = express();

app.use("/auth/", authRouter);
app.use("/article/", articleRouter);

module.exports = app;