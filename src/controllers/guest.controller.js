const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { auth, viewService } = require('../services');

const { roles } = require('../config/roles');

const trowError = (status, msgText) => {
    throw new ApiError(status, msgText);
}

const getQuestions = catchAsync(async (req, res) => {
    const user = req.user;
    const filterPick = pick(req.query, ['idquestion', 'idcorso', 'id', 'iduser', 'closeAt']);
    const options = pick(req.query, ['sortBy', 'limit', 'page', 'full']);
    const hasRoleAuth = !filterPick.iduser ? false : auth.isUserRoleRight(user, ['super', 'admin']);

    const iduser = !hasRoleAuth ? user.id : filterPick.iduser || false;
    const iduserFilter = iduser ? { iduser } : {};
    const idQuestion = filterPick.id ? { _id: filterPick.id } : {};
    const closeAt = filterPick.closeAt;
    const closeAtFilter = closeAt === undefined ? {}
        : closeAt === '' || closeAt === 'null' || closeAt === 'false' ? { closeAt: null }
            : closeAt === 'true' ?
                { closeAt: { $exists: true } }
                : { closeAt: { $exists: true } }; // TODO : filtro per data
    const filter = { ...idQuestion, ...filterPick, ...iduserFilter, ...closeAtFilter };
    const question = await viewService.getQuestions(filter, options);
    res.send(question);
    console.log('getQuestions filter', filter);
});

module.exports = { getQuestions, };
