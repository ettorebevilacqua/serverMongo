const httpStatus = require('http-status');
const { User, Question, Modulo } = require('../models');
const ApiError = require('../utils/ApiError');

const getQuestions = async (filter, options) => {

    const { idUser, idmodulo, idcorso, id } = { ...filter };
    const modulo = await Modulo.findOne({ _id: idmodulo });
    const test = { idmodulo: "60ed63411cd3367bdfccfa23," };
    const test2 = { id: '6107b8d70ef2d786e348b967' };
    if (filter.id) {
        delete filter.id;
        filter._id = id;
    }

    const questions = await Question.paginate(filter, options);
    return { questions, modulo };
};

module.exports = {
    getQuestions
}