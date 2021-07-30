const httpStatus = require('http-status');
const { User, Question, Modulo } = require('../models');
const ApiError = require('../utils/ApiError');

const getQuestions = async (filter, options) => {

    const { idUser, idmodulo, idcorso } = { ...filter };
    const modulo = await Modulo.findOne({ _id: idmodulo });
    const test = { idmodulo: "60ed63411cd3367bdfccfa23," };
    const questions = await Question.paginate(test, options);
    return { questions, modulo };
};

module.exports = {
    getQuestions
}