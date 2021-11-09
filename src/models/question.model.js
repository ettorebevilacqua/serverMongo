const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const questionSchema = mongoose.Schema(withRecordInfo({
    idEnte: {
        type: String,
        required: false,
        trim: true,
    },
    idquestion: {
        type: mongoose.Schema.ObjectId,
        ref: 'QuestionModuli',
    },
    idcorso: {
        type: mongoose.Schema.ObjectId,
        ref: 'Corsi',
    },
    codiceCorso: {
        type: Number,
    },
    corso: {
        type: String,
        required: false,
        trim: true,
    },
    titolo: {
        type: String,
        required: true,
        trim: true,
    },
    titoloQuestion: {
        type: String,
        required: false,
        trim: true,
    },
    docenti: [{}],
    numPartecipanti: {
        type: Number,
        required: false,
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

    if (question && question.closeAt && !!closeAt) {
        return [null, ' ' + ' question has close '];
    }

    const found = await Model.findOne({ idquestion, idcorso });
    if (!!found && found._id != id) {
        return [null, 'idcorso ' + idcorso + ' è già presente '];
    }

    dataBody.idcorso = mongoose.Types.ObjectId(dataBody.idcorso);
    dataBody.idquestion = mongoose.Types.ObjectId(dataBody.idquestion);
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

/*
const { queryDocentiActivity } = require('../querys/');
const query = queryDocentiActivity.queryDocentiActivity(1);

Question.aggregate(query).exec(function (err, results) {
    // console.log('aggregate x', err, JSON.stringify(results,null, 3 ));
    // console.log('aggregate x', err, results.map(el => el.corsi));
    if (err) throw err;
    return results;
});
*/

