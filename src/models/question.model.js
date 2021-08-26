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
        key: true,
    },
    idquestion: {
        type: String,
        required: true,
        key: true,
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
    docenti: [{}],
    numPartecipanti: {
        type: Number,
        required: false,
        trim: true,
    },
    closeAt: {
        type: Date,
        required: false,
    },
    partecipanti: [{}],
}));

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

questionSchema.statics.beforeServiceSave = async (Model, user, dataBody, id = 0) => {
    const question = this;
    const { idquestion, idcorso, closeAt, _info, iduser } = { ...dataBody };

    if(question && question.closeAt && !!closeAt){
        return [null, ' ' + ' question has close '];
    }

    const found = await Model.findOne({ idquestion, idcorso });
    if (!!found && found._id != id) {
        return [null, 'idcorso ' + idcorso + ' è già presente '];
    }
    // console.log('xxxx to save dataBody', dataBody);

    if (_info && _info.uc) { // && (!question || !iduser)) {
        dataBody.iduser = question && question._info && question._info.uc ? question._info.uc : dataBody._info.uc;
    }
    return [dataBody, null];
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
