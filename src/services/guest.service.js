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
 const queryModuli= async (filter, options) => {
  const Moduli = await Modulo.paginate(filter, options);
  return Moduli;
};

const getQuestionsModuli = async (filter) => {
  return  await Question.findOne(filter).populate('idcorso')
  .populate({
    path: "idquestion", // populate blogs
    populate: {
       path: "moduli" // in blogs, populate comments
    }
 })
 .populate('idcorso');
};


module.exports = {
  getQuestionsModuli
};
