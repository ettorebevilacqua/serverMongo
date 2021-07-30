
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ModelService } = require('../services');

function modelController(modelService){

    const create = catchAsync(async (req, res) => {
        const item = await modelService.create(req.body, req.user);
        res.status(httpStatus.CREATED).send(item);
      });

    const getItems = catchAsync(async (req, res) => {
        const filter = pick(req.query, ['name', 'role']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await modelService.query(filter, options);
        res.send(result);
      });

      const getItem = catchAsync(async (req, res) => {
        const item = await modelService.getById(req.params.id);
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
        delete:deleteItem
      }
}

module.exports = (Model)=>{
    const service = ModelService(Model);
    return modelController(service);
}