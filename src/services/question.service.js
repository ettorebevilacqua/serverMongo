const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const { authService, tokenService: { generateToken }, emailService: { sendEmail } } = require('./');
const { tokenTypes } = require('../config/tokens');
const pick = require('../utils/pick');
const { generateQuestionToken, verifyQuestionToken } = require('../services/token.service');
const { queryDocentiActivity } = require('../querys/');

const getPathUrl = (host, token) => host + '/guest/compile/' + token;

// console.log('queryDocentiActivity', queryDocentiActivity.queryDocentiActivity('a'));

const msgQuestionario = ({ url, nome, cognome, titolo }) => `
<p>Gentile ${nome}, ${cognome}</p>
<P>il nuovo questionario ${titolo} è disponibile. :</p>
<p>
<a href="${url}" >Click qui per aprire il questionario </a>
</p>
<p>
La preghiamo di prestare attenzione nel rispondere a tutte le domande per l'invio dei risultati.
</p>
`;

const questionSendMail = async (_id, host) => {
    const question = await Question.findOne({ _id });
    const listPartecipanti = question.partecipanti;
    const idSent = [];
    const listPromise = [];

    const results = listPartecipanti.map(async (item, idx) => {
        const { email, id, nome } = item || {};

        if (!email || item.sent) {
            // return false;
        }
        // if (idx > 1) return true; // limit for test email send
        // console.log('questionSendMail part idquestion ', question.id);

        const tokenAccess = item.token ? item.token : generateQuestionToken(question.id, email);


        const pathUrl = getPathUrl(host, tokenAccess);
        const param = {
            url: pathUrl,
            titolo: question.titolo,
            nome: item.nome,
            cognome: item.cognome,
        };

        item.token = tokenAccess;
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
            result.map(res => {
                const status = res.status;
                // console.log('questionSendMail listPartecipanti', listPartecipanti);
                const mailSent = res && res.value && res.status && res.status === 'fulfilled' && res.value.accepted[0];
                const listPartecipantiClone = [...listPartecipanti];
                listPartecipantiClone.map((part, idx) => {
                    const partClone = { ...part._doc };
                    const sendCount = partClone.sendCount || 0;
                    const newPart = { ...partClone, sent: true, sendCount: sendCount + 1};
                    // console.log('set partec xxx ', newPart);
                    if (part.email === mailSent) {
                        question.partecipanti[idx] = newPart;
                    }  // && question.partecipanti.set(idx, newPart);
                    // console.log('set partec', question.partecipanti[idx]);

                });

                res.status === 'fulfilled'
            });
            // console.log('set partec xxxxxxxxxx', question._doc);

            try{
                question.save();
            } catch(e){
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'errore nel salvataggio');
            }

            return question;
        });
}

const getDocentiActivity = async (_id, idEnte) => {
    const query = queryDocentiActivity.queryDocentiActivity(idEnte);
    const list = await Question.aggregate(query); //.exec(function (err, results) {
    // console.log(query);
    return { results: list };
}

const getQuestionActivity = async (_id, idEnte) => {
    const query = queryDocentiActivity.queryQuestionActivity(idEnte);
    const list = await Question.aggregate(query); //.exec(function (err, results) {
    console.log('xxx2', JSON.stringify(list, null, 2));
    return { results: list };
}

module.exports = {
    questionSendMail,
    getDocentiActivity,
};

// getQuestionActivity(null, '1');

// questionSendMail('6107fcb1bf9939b6183f566e', 'local/');