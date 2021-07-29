const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const domandaSchema = mongoose.Schema({
    domanda: {
        type: String,
        required: true,
        trim: true,
    },
    tipo: {
        type: String,
        required: true,
        trim: true,
    },
    risposte: [{}],
});

const moduloSchema = mongoose.Schema(withRecordInfo({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    domande: [domandaSchema],
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
const modulo = mongoose.model('modulo', moduloSchema);

module.exports = modulo;
