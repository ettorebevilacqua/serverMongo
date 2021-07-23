const httpStatus = require('http-status');
const { Modulo } = require('../models');
const ApiError = require('../utils/ApiError');

const createModulo= async (dataBody) => {
  /* if (await Modulo.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  } */
  return Modulo.create(dataBody);
};

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

const getModuloById = async (id) => {
  return Modulo.findById(id);
};


module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
