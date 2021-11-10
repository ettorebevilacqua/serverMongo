const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { auth, viewService, tokenService, guestService } = require('../services');

const { roles } = require('../config/roles');

const trowError = (status, msgText) => {
    throw new ApiError(status, msgText);
}

const getGuestFromToken = (token) => {
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'partecipante non autorizzato');
    }
    // console.log('token ppppppppppp', token);
    let param = null;
    try {
        param = tokenService.verifyQuestionToken(token);
    } catch (e) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'bad token');
    }

    return param;
};

const getQuestion = catchAsync(async (req, res) => {
    const { id, email } = getGuestFromToken(req.params && req.params.token);
    const item = await guestService.getQuestionsModuli({ _id: id });
    // console.log('item xxx ', JSON.stringify(item, null, 2));
    if (!item) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'questionario not found');
    }

    const partecipante = item && item.partecipanti && item.partecipanti
        .filter(part => part.email === email);

    if (!partecipante || !partecipante[0]) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'partecipante non trovato');
    }

    const toSend = { ...item._doc, partecipanti: partecipante[0] };
    // console.log('item xxx ', JSON.stringify(item._doc, null, 2));
    res.send(toSend);
});

const getQuestionsOld = catchAsync(async (req, res) => {
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
});

const upDateRisposte = catchAsync(async (req, res) => {
    const { id, email } = getGuestFromToken(req.params && req.params.token);
    const item = await guestService.getQuestionsModuli({ _id: id });
    const risposte = req.body && req.body.risposte;

    if (!item || !risposte) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'questionario not found');
    }

    const partecipante = item && item.partecipanti && item.partecipanti
        .find(part => part.email === email)

    if (!partecipante) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'partecipante non trovato');
    }

    // console.log('XXXx update ', req.body);

    const up = await guestService.updateRisposte(id, email, risposte);

    if (!up) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'error on update');
    }

    res.send(up);

});

module.exports = { getQuestion, upDateRisposte };
