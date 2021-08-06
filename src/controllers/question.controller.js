const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');

request.headers.host

module.exports = (Model)=>{
    const service = ModelService(Model);
    return modelController(service);
}