const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const { authService, tokenService: { generateToken }, emailService: { sendEmail } } = require('./');
const { tokenTypes } = require('../config/tokens');
const pick = require('../utils/pick');

const getPathUrl = (host, token) => host + '/app/user/compile/' + token;

const msgQuestionario = ({ url, nome, titolo }) => `
Gentile ${nome},
il nuovo questionario ${titolo} è disponibile. :

<a href="${url}" >click Qui per aprire il questionario </a>

La preghiamo di prestare attenzione nel rispondere a tutte le domande per l'invio dei risultati.

`;

const questionSendMail = async (_id, host) => {
    const question = await Question.findOne({ _id });
    const listPartecipanti = question.partecipanti;
    const idSent = [];
    const listPromise = [];
    // console.log('listPartecipanti xxx ', listPartecipanti);
    const results = listPartecipanti.map(async (item, idx) => {
        const { email, id, nome } = item || {};
        if (!email || !item.sent) {
            return false;
        }
        // if (idx > 1) return true; // limit for test email send

        const tokenAccess = item.token ? item.token : generateQuestionToken(id, email );
        const pathUrl = getPathUrl(host, tokenAccess);
        const param = {
            url: pathUrl,
            titolo: question.titolo,
            nome: item.nome,
        };
        item.token = tokenAccess;
        item.sendCount = (item.sendCount || 0) +1;
        const msgToSend = msgQuestionario(param);
        listPromise.push(sendEmail(email, 'Questionario ', msgToSend, true));

        //const mailSent = await sendEmail(email, 'Questionario ', msgToSend);
        // idSent.push({ email, messageId: mailSent.messageId });
        // console.log('idSent xxx', idSent);
        // return 1 //{ email, messageId: mailSent.messageId };
        //return [res, null];


        // const {accepted, messageId, response, rejected} = res;

        return null;
    })

    return await Promise.allSettled(listPromise)
        .then((result) => {
         console.log(result[0]);
            result.map(res => {
                const status = res.status;
                const mailSent = res && res.value && res.status && res.status === 'fulfilled' && res.value.accepted[0];
                listPartecipanti.map((part, idx) => {
                    part.email === mailSent && question.partecipanti.set(idx, { ...part, sent:true });
                    // console.log('set partec', question.partecipanti[idx]);

                });
                // console.log('result mail, ');
                res.status === 'fulfilled'
            });
            question.save();
            return result;
        }) // .then(data=>console.log('dddddd'));;

}

module.exports = {
    questionSendMail
};

// questionSendMail('6107fcb1bf9939b6183f566e', 'local/');