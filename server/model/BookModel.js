const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorid: String
},{
    timestamps: true
})

module.exports = new mongoose.model("Book", BookSchema)
