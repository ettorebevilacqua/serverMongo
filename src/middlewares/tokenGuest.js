const { generateQuestionToken, verifyQuestionToken } = require('../services/token.service');


const getDataFromToken = (...requiredRights) => async (req, res, next) => {

    const token = req.params.token;
    const { id, email } = verifyQuestionToken(token);
    const item = await modelService.getById(id);

    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};


module.exports = { getDataFromToken };