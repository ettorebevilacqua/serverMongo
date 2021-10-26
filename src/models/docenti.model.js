const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const docentiSchema = mongoose.Schema(withRecordInfo({
    idEnte: {
        type: String,
        required: false,
    },
    nome: {
        type: String,
        required: false,
        trim: true,
    },
    cognome: {
        type: String,
        required: false,
        trim: true,
    },
    cap: {
        type: String,
        required: false,
        trim: true,
    },
    prov: {
        type: String,
        required: false,
        trim: true,
    },
    country: {
        type: String,
        required: false,
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    dateBorn: {
        type: String,
        required: false,
        trim: true,
    },
    ambito: {
        type: String,
        required: false,
        trim: true,
    },
    cf: {
        type: String,
        required: false,
        trim: true,
    },
}));

// add plugin that converts mongoose to json
docentiSchema.plugin(toJSON);
docentiSchema.plugin(paginate);

// docentiSchema.statics.beforeServiceSave = async (Model, user, dataBody, id = 0) => {}

docentiSchema.pre('save', async function (next) {
    // const corsi = this;
    // next();
});


/**
 * @typedef Modulo
 */
const Docenti = mongoose.model('Docenti', docentiSchema);

module.exports = Docenti;
