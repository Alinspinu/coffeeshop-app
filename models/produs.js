const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('../models/user')

const imagineSchema = new Schema({
    path: String,
    filename: String
});

imagineSchema.virtual('thumb').get(function () {
    return this.path.replace('/upload', '/upload/w_250');
})

const produsSchema = new Schema({
    nume: String,
    gramaj: String,
    imagine:
    {
        path: String,
        filename: String
    },
    video: String,
    pret: String,
    descriere: String,
    categorie:
    {
        type: Schema.Types.ObjectId,
        ref: 'categorie'
    },
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})




module.exports = mongoose.model('Produs', produsSchema)
