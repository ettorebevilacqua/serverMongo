const httpStatus = require('http-status');
const { Modul, QuestionModuli, Question } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for Moduli
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryModuli = async (filter, options) => {
  const Moduli = await Modulo.paginate(filter, options);
  return Moduli;
};

const getQuestionsModuli = async (filter) => {
  return await Question.findOne(filter).populate('idcorso')
    .populate({
      path: "idquestion", // populate blogs
      populate: {
        path: "moduli" // in blogs, populate comments
      }
    })
    .populate('idcorso');
};

const updateRisposte = async (id, mail, saveData) => {
  const question = await Question.findOne({ _id: id });

  if (!saveData){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'dati da modificare vuoto');
  }

  if (!question || !question.partecipanti || !question.partecipanti.findIndex || !saveData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'questione non trovata');
  }

  const idx = question.partecipanti.findIndex(el => el.email === mail);
  if (idx < 0) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email partecipante non trovata');
  }

  const questionNew = { ...question._doc };  // console.log('XXX update ', questionNew);
  const _partecipante = questionNew.partecipanti[idx];
  questionNew.partecipanti[idx]={ ..._partecipante, risposte: saveData };

  const up = await Question.findOneAndUpdate({ _id: id }, questionNew, { upsert: true }, function (err, doc) {
    // if (err) return res.send(500, { error: err });
    // return res.send('Succesfully saved.');
  });

  if (!up) return false ;

  const clone = { ...up._doc };
  clone.partecipanti = _partecipante;

  return { ...clone };

}

// updateRisposte('61820919f9ec12f4cef1fe0a','fe@hh.it', {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODIwOTE5ZjllYzEyZjRjZWYxZmUwYSIsImVtYWlsIjoiZmVAaGguaXQiLCJpYXQiOjE2MzYzODk5OTF9.R-kT_MNIsSO6U54-cpkPQHy7SB9vkA2LhOf_EHFfBiA","id":"61820919f9ec12f4cef1fe0a","risposte":[[[null,null],[null],[null,null],[null,null],[{"val":"as"}]]]} );

module.exports = {
  getQuestionsModuli, updateRisposte
};
