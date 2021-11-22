const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');
const { QuestionModuli } = require('./modulo.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

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
    partecipanti: [{
        nome: String,
        cognome: String,
        telefono: String,
        email: String,
        token: String,
        sendCount: Number,
        sent: Boolean,
        risposte: [{}]
    }],
}));

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);


const empityRisposteDomandaModulo = idmodulo => (acc, domanda) => {
    const iddomanda = domanda._id;
    const risposte = domanda.risposte;
    const domandaKey = {
        idmodulo,
        iddomanda,
        risposte : risposte.map((risp, pos) => ({ pos, val: null })),
    }
   /* const list = risposte.map(risposta => ({
        idmodulo,
        iddomanda,
        val: null,
    })); */
    return [...acc, domandaKey];
    // console.log('aaaa cc', list);
}

const getDomandeModuli = async (idquestion) => {
    let moduli = null;

    try {
        moduli = await QuestionModuli.findOne({ _id: idquestion }).populate('moduli');
        if (!moduli) return false;
    } catch (e) {
        console.log('error xx', e);
        return false;
    }
    if (!moduli.moduli) return [];
    // console.log('xxxx getDomandeModuli', moduli.moduli);
    return moduli.moduli.reduce((acc, modulo) => {
        // console.log('aaaa cc', modulo);
        const idModulo = modulo._id;
        const domande = modulo.domande;
        const empityRisposteDomanda = empityRisposteDomandaModulo(idModulo);
        const list = domande.reduce(empityRisposteDomanda, acc);
        return list;
    }, []);
}

// questionSchema.statics.beforeServiceSave

// addconst beforeServiceSave = async (Model, user, dataBody, id = 0) => {
const beforeServiceSave = async (Model, user, dataBody, id = 0) => {
    const question = Model;
    const { idquestion, idcorso, closeAt, _info, iduser } = { ...dataBody };

    if (question && question.closeAt && !!closeAt) {
        return [null, ' ' + ' question has close '];
    }

    // const found = await Model.constructor.findOne({ idquestion: '6191f87432b898ed1265f519', idcorso : '6191f87432b898ed1265f518'});
    const found = await Model.constructor.findOne({ idquestion, idcorso });
    if (!!found && found._id != id) {
        return [null, 'il corso è già presente '];
    }

    if (!question.idquestion) {
        return [dataBody, null];
    }

    dataBody.idcorso = mongoose.Types.ObjectId(question.idcorso);
    dataBody.idquestion = mongoose.Types.ObjectId(question.idquestion);

    // console.log('xxxx to save idquestion', question.idquestion);
    const domandeModuli = await getDomandeModuli(question.idquestion);

    if (!domandeModuli) return [null, 'questionModuli not found id=' + idquestion];
    const partecipanti = !question.partecipanti ? [] : question.partecipanti.map(el=>({ ...el }));
    // console.log('xxxx to save partecipanti', domandeModuli);

    const risposteToInsert = rispPart => domandeModuli.reduce((acc, risp) => {
        const compareIds = el => el && el.idmodulo && el.iddomanda && el.idmodulo.toString() === risp.idmodulo.toString() && el.iddomanda.toString() === risp.iddomanda.toString();
        const compiled = rispPart.find(compareIds);

        if (compiled) return acc;
        const idxAcc = acc.findIndex(compareIds);
        console.log('xxxx risposteToInsert idxAcc', acc);
        acc = idxAcc > -1 ? acc :  [...acc, risp];
        // console.log('xxxx risposteToInsert', acc);
        return acc;
    }, []);

    const partecipantiRisposte = partecipanti.map(partecipante => {
        const part = { ...partecipante._doc };
        const rispPart = [...part.risposte];

        if (!rispPart) return { ...part, risposte };
        console.log('xxxx partecipantiRisposte rispPart', rispPart);
        const compiled = risposteToInsert(rispPart);
        console.log('xxxx partecipantiRisposte', compiled);
        const newRisposte = [...rispPart, ...compiled];
        // console.log('xxxx partecipantiRisposte', [ ...rispPart, ...newRisposte ]);

        return { ...part, risposte: newRisposte };
    });
    // console.log('xxxx to save partecipantiRisposte', partecipantiRisposte[0].risposte);
    return [partecipantiRisposte, null];
}

questionSchema.pre('save', async function (next, done) {
    const question = this;
    // if (!!question._id) return  next();
    const idquestion = question.idquestion;
    // console.log('xxxx to save partecipanti', question);
    const [partecipanti, err] = await beforeServiceSave(question, null, question, question._id);

    if (err) {
        question.invalidate("idcorso", err);
        next(new ApiError(httpStatus.NOT_FOUND, err));
        return false;
    }
    question.partecipanti=partecipanti;

    next();

    // console.log('moduli ris', err);
});


/**
 * @typedef Modulo
 */
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

// getDomandeModuli('614d613684df521016d5f515').then(risp=>console.log('xxxx to save moduli',risp));

 // getQuestionsModuli({_id: '618c2a96ca03116ab9d8f0c1'});
// const { questionModuli } = require('../querys/');

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

