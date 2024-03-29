const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate, incrementCounter } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');


const corsiSchema = mongoose.Schema(withRecordInfo({
    idEnte: {
        type: String,
        required: false,
        trim: true,
    },
    codice: {
        type: Number,
        required: false,
    },
    titolo: {
        type: String,
        required: false,
        trim: true,
    },
    dataInizio: {
        type: String,
        required: false,
        trim: true,
    },
    finanziatore: {
        type: String,
        required: false,
        trim: true,
    },
    ambito: {
        type: [],
        required: false,
    },
    durata: {
        type: Number,
        required: false,
    },
    sede: {
        type: String,
        required: false,
        trim: true,
    },
    coordinatore: {
        type: String,
        required: false,
        trim: true,
    },
    tutor: {
        type: String,
        required: false,
        trim: true,
    },
}));

// add plugin that converts mongoose to json
corsiSchema.plugin(toJSON);
corsiSchema.plugin(paginate);

// corsiSchema.statics.beforeServiceSave = async (Model, user, dataBody, id = 0) => {}

corsiSchema.pre('save', async function (next) {
    const corsi = this;
    this.codice= await incrementCounter('corsi' + corsi.idEnte);
    next();
});

/**
 * @typedef Modulo
 */
const Corsi = mongoose.model('Corsi', corsiSchema);

module.exports = Corsi;
