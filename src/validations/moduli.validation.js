const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const create = {
  body: Joi.any(),
};

const getItems = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
    idquestion: Joi.string(),
    idcorso: Joi.string(),
    iduser: Joi.string(),
    closeAt: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    full: Joi.string(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getItemToken = {
  params: Joi.object().keys({
    token: Joi.string(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
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
  getItemToken,
};
