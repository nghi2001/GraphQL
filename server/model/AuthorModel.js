const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: String,
    age: Number,
},{
    timestamps: true
})

module.exports = new mongoose.model("Author", AuthorSchema)
