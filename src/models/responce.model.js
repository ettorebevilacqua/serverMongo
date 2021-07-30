const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const rispostaSchema = mongoose.Schema({
    val: {
        type: String,
        required: true,
        trim: true,
    },
});

const risposte =mongoose.Schema(withRecordInfo({
    idmodulo: {
        type: String,
        required: true,
        trim: true,
    },
    iddomanda: {
        type: String,
        required: true,
        trim: true,
    },
    iduser: {
        type: String,
        required: true,
        trim: true,
    },
    risposte: [rispostaSchema],
}));


// add plugin that converts mongoose to json
moduloSchema.plugin(toJSON);
moduloSchema.plugin(paginate);

moduloSchema.pre('save', async function (next) {
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
const Responce = mongoose.model('Responce', moduloSchema);

module.exports = Responce;
