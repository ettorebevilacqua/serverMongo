const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const entiSchema = mongoose.Schema(withRecordInfo({
    tipologia: {
        type: String,
        required: false,
        trim: false,
    },
    nome: {
        type: String,
        required: false,
        trim: true,
    },
    cognome: {
        type: String,
        required: false,
        trim: false,
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
        type: [],
        required: false,
    },
    cf: {
        type: String,
        required: false,
        trim: false,
    },
    pIva: {
        type: String,
        required: false,
        trim: true,
    },
    pianoId: {
        type: String,
        required: false,
        trim: true,
    },
    responsabili: [{
        nome: String,
        cognome: String,
        telefono: String,
        email: String,
        token: String,
        sendCount: Number,
        sent: Boolean,
    }],

}));

// add plugin that converts mongoose to json
entiSchema.plugin(toJSON);
entiSchema.plugin(paginate);

// entiSchema.statics.beforeServiceSave = async (Model, user, dataBody, id = 0) => {}

entiSchema.pre('save', async function (next) {
    // const corsi = this;
    // next();
});


/**
 * @typedef Modulo
 */
const Enti = mongoose.model('Enti', entiSchema);

module.exports = Enti;
