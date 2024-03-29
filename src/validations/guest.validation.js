const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const create = {
  body: Joi.any(),
};

const getItems = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    name: Joi.string()
  }),
};

const getGuestToken = {
  params: Joi.object().keys({
    token: Joi.string(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    token: Joi.string(),
  }),
};

const deleteModel = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  create,
  getItems,
  getItem,
  update,
  delete: deleteModel,
  getGuestToken,
};
