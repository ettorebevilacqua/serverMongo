const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { viewService } = require('../services');

const trowError = (status, msgText) =>{
    throw new ApiError(status, msgText);
}

const getQuestions = catchAsync(async (req, res) => {
    const user = req.user;
    
    const filter = pick(req.query, ['idmodulo', 'idcorso']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    !user && trowError(httpStatus.NOT_FOUND, 'User not found');
    console.log('xxxx2', req.query, viewService );
    const question = await viewService.getQuestions(filter, options);
    res.send(question);
});

module.exports = { getQuestions, };
