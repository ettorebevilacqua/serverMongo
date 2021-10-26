const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const ambitiSchema = mongoose.Schema(withRecordInfo({
    ambito: {
        type: String,
        required: false,
        trim: true,
    },
    idEnte: {
        type: String,
        required: false,
        trim: true,
    },
    descr: {
        type: String,
        required: false,
        trim: true,
    },
}));

// add plugin that converts mongoose to json
ambitiSchema.plugin(toJSON);
ambitiSchema.plugin(paginate);

// ambitiSchema.statics.beforeServiceSave = async (Model, user, dataBody, id = 0) => {}

ambitiSchema.pre('save', async function (next) {
    // const corsi = this;
    // next();
});


/**
 * @typedef Modulo
 */
const Ambiti = mongoose.model('Ambiti', ambitiSchema);

module.exports = Ambiti;
