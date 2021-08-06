const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const { authService, tokenService: { generateToken }, emailService: { sendEmail } } = require('./');
const { tokenTypes } = require('../config/tokens');

const  getPathUrl = (host, token) => host + '/app/user/compile/' + token;

const msgQuesgetPathUrltionario1 = host => (url, { nome, titolo }) => `
Gentile ${nome},
il nuovo questionario ${titolo} è disponibile a questo indirizzo :

${url}

La preghiamo di prestare attenzione nel rispondere a tutte le domande per l'invio dei risultati.
`;

const questionSendMail = async (_id, host) => {
    const question = await Question.findOne({ _id });
    const list = question.partecipanti;
    const msgSender = msgQuestionario(host);

    const results = list.map(async (item) => {
        const email = item && item.email;
        if (email) {
            const accessTokenExpires = moment().add(60, 'days');
            const pathUrl = getPathUrl(path, accessTokenExpires);
            const tokenAccess = generateToken(email+'/'+id, accessTokenExpires, tokenTypes.GUEST_QUESTION);
            const res = await sendEmail(email, 'Questionario ', msgSender(item));
            return res;
            // const {accepted, messageId, response, rejected} = res;

        }
        return null;
    })
}

module.exports = {
    questionSendMail
};