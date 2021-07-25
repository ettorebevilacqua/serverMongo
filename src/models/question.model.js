const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const questionSchema = mongoose.Schema({
    titolo: {
        type: String,
        required: true,
        trim: true,
    },
    idcorso: {
        type: String,
        required: true,
        trim: true,
    },
    titoloModulo: {
        type: String,
        required: false,
        trim: true,
    },
    idmodulo: {
        type: String,
        required: true,
        trim: true,
    },
    docenti: {
        type: String,
        required: false,
        trim: true,
    },
    NumPartecipanti: {
        type: String,
        required: false,
        trim: true,
    },
    partecipanti: [{}],
});




// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

questionSchema.pre('save', async function (next) {
    const modulo = this;
    /* if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    */
    next();
});

/**
 * @typedef Modulo
 */
const Question = mongoose.model('question', questionSchema);

module.exports = Question;
