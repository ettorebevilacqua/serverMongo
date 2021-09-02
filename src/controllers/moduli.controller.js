const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService, ModelService, moduliService } = require('../services');

const getModuloGuest = catchAsync(async (req, res) => {
    const { id, email } = tokenService.verifyQuestionToken(req.params.token);
    const item = await modelService.getById(id);
    const partecipante = item && item.partecipanti && item.partecipanti
        .find(part => part.email === email)
    if (!partecipante) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'partecipante non trovato');
    }
    res.send(item);
});

const pathcModuloGuest = catchAsync(async (req, res) => {
    const { id, email } = verifyQuestionToken(req.params.token);
    const item = await modelService.getById(id);
    const partecipante = item && item.partecipanti && item.partecipanti
        .find(part => part.email === email)
    if (!partecipante) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'partecipante non trovato');
    }
    res.send(item);
});


const getQuestionsModuli = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['title', 'isPublic']);
    if (filter && filter.hasOwnProperty('isPublic') && filter.isPublic === false) {
        filter.isPublic = { $exists: false, $eq: null };
    }

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const item = await moduliService.getQuestionsModuli(filter, options);
    res.send(item);
});

module.exports = {
    getModuloGuest,
    pathcModuloGuest,
    getQuestionsModuli,
};
