const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const questionSchema = mongoose.Schema(withRecordInfo({
    iduser: {
        type: String,
        required: true,
        trim: true,
    },
    idmodulo: {
        type: String,
        required: true,
        trim: true,
    },
    idcorso: {
        type: String,
        required: true,
        trim: true,
    },
    titolo: {
        type: String,
        required: true,
        trim: true,
    },
    titoloModulo: {
        type: String,
        required: false,
        trim: true,
    },
    docenti: {
        type: String,
        required: false,
        trim: true,
    },
    numPartecipanti: {
        type: String,
        required: false,
        trim: true,
    },
    partecipanti: [{}],
}));

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

questionSchema.statics.beforeServiceSave = (dataBody) => {
    const question = this;
    if (dataBody && dataBody._info && dataBody._info.uc && (!question || !question.iduser)) {
        dataBody.iduser = question && question._info && question._info.uc ? question._info.uc  : dataBody._info.uc;
    }
    return dataBody;
}
questionSchema.pre('save', async function (next) {
    const question = this;
    next();
});


/**
 * @typedef Modulo
 */
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
