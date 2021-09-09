const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const domandaSchema = mongoose.Schema({
    domanda: {
        type: String,
        required: false,
        trim: true,
    },
    tipo: {
        type: Number,
        required: false,
        trim: true,
    },
    risposte: [{}],
});

const moduloSchema = mongoose.Schema(withRecordInfo({
    title: {
        type: String,
        required: false,
        trim: true,
    },
    domande: [domandaSchema],
    questionModuli: [{
        type: mongoose.Schema.Types.ObjectId, ref: "QuestionModuli"
    }]
}));

const questionModuliSchema = mongoose.Schema(withRecordInfo({
    title: {
        type: String,
        required: false,
        trim: true,
    },
    isPublic: {
        type: Boolean,
        required: false,
    },
    moduli: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Modulo"
    }],
}));

// add plugin that converts mongoose to json
moduloSchema.plugin(toJSON);
moduloSchema.plugin(paginate);

questionModuliSchema.plugin(toJSON);
questionModuliSchema.plugin(paginate);

moduloSchema.pre('save', async function (next) {
    const modulo = this;
    /* if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    */
    next();
});

questionModuliSchema.pre('save', async function (next) {
    if (!this.isPublic) {
        this.isPublic = false;
    }
});

/**
 * @typedef Modulo
 */

const Modulo = mongoose.model('Modulo', moduloSchema);

/**
 * @typedef QuestionModuli
 */

const QuestionModuli = mongoose.model('QuestionModuli', questionModuliSchema);

module.exports = { Modulo, QuestionModuli };
