
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ModelService } = require('../services');

function modelController(modelService, options = {}) {
  const { filterByEnte, onCreate } = options || {};

  const create = catchAsync(async (req, res) => {
    const item = await modelService.create(req.body, req.user, onCreate && onCreate);
    res.status(httpStatus.CREATED).send(item);
  });

  const getItems = catchAsync(async (req, res) => {
    const user = req.user;
    const _filter = pick(req.query, ['name', 'role']);
    const filter = user && user.idEnte && filterByEnte ? { ..._filter, idEnte: user.idEnte} : _filter;
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const result = await modelService.query(filter, options, req.user);
    res.send(result);
  });

  const getItem = catchAsync(async (req, res) => {
    const item = await modelService.getById(req.params.id, options.filterByEnte);
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    res.send(item);
  });

  const update = catchAsync(async (req, res) => {
    const user = await modelService.update(req.params.id, req.body, null, req.user);
    res.send(user);
  });

  const deleteItem = catchAsync(async (req, res) => {
    await modelService.delete(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  });

  return {
    create,
    getItems,
    getItem,
    update,
    delete: deleteItem
  }
}

module.exports = (Model, _options) => {
  const service = ModelService(Model);
  return modelController(service, _options);
}