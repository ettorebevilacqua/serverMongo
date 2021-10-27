const { Modulo, QuestionModuli } = require('./modulo.model');

module.exports.Token = require('./token.model');
module.exports.User = require('./user.model');
module.exports.Question = require('./question.model');
module.exports.Corsi = require('./corsi.model');
module.exports.Docenti = require('./docenti.model');
module.exports.Ambiti = require('./ambiti.model');
module.exports.Lists = require('./lists.model');
module.exports.Modulo = Modulo;
module.exports.QuestionModuli = QuestionModuli;

const addFieldUser = (fieldName, fieldUser) => (data, user) => {
    return { ...data, [fieldName]: user[fieldUser] };
};

module.exports.addEnte = (fieldName = 'idEnte') => addFieldUser(fieldName, 'idEnte');
