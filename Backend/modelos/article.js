"use strict";
const articleMongoose = require('mongoose');
var Schema = articleMongoose.Schema;
var articleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
});
module.exports = articleMongoose.model('Article', articleSchema);
// articles --> guarda documento con este nomrbe y estructura en la colección
