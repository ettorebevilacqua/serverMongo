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

const authGuest = (...requiredRights) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
      resolve();
    })
      .then(() => next())
      .catch((err) => next());
  };

module.exports = { getDataFromToken, authGuest };