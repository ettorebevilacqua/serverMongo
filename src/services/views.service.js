const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { User, Question, Modulo } = require('../models');
const ApiError = require('../utils/ApiError');

function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

const toObjectId = ids => ids.constructor === Array ?
    ids.map(mongoose.Types.ObjectId)
    : mongoose.Types.ObjectId(ids);

const isValidId = value => value.match(/^[0-9a-fA-F]{24}$/);

const fullQuestion = async (docs) => {
    var ids = toObjectId(uniq(docs.filter(doc => !!doc.idquestion && isValidId(doc.idquestion))
        .map(doc => doc.idquestion)));
    const moduli = await Modulo.find({ _id: { $in: ids } });
    const getTitle = (id) => {
        const find = moduli.find(modulo => modulo.id === id);
        // id === '60ed63411cd3367bdfccfa23' && console.log('vvvv', find ? find.title : '');
        return find ? find.title : null;
    }
    return docs.reduce((acc, question) => {
        const titleIndagine = !question.idquestion ? null : getTitle(question.idquestion);
        if (titleIndagine === null) return acc;

        const {_id, ...newQuestion} = question
        newQuestion.id = _id;
        newQuestion.titleIndagine = titleIndagine;
        // console.log('xxxxx question.idquestion', newQuestion, question.titleIndagine );
        acc.push(newQuestion);
        return acc;
    }, []);
}

const getQuestions = async (filter, options) => {

    const { idUser, idquestion, idcorso, id } = { ...filter };
    const byId = !id ? null : await Question.findOne({ _id: id });
    const idquestionQuery = byId ? byId.idquestion : idquestion;
    const modulo = await Modulo.findOne({ _id: idquestionQuery });
    // console.log('xxx options ', options);
    const isFull = options && options.full && options.full === 'true';

    // const questionsRes = !isFull  ? await Question.paginate(filter, options) : await Question.find(filter, options)
    const questionsRes = !!byId ? { results: [byId] } : await Question.paginate(filter, options);
    const questionArray = questionsRes.results.map(val => val._doc); // converte in js array (from mongodb array)
    const questions = isFull ?
        await fullQuestion(questionArray) : questionsRes;
    // console.log(questions);
    // console.log('xxxx', idquestionQuery);
    return { questions, modulo };
};

module.exports = {
    getQuestions
}

// getQuestions({id: '6107fc75bf9939b6183f566b'});