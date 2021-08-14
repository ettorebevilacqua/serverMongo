const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');

const sendMail = catchAsync(async (req, res) => {
    const sends = await questionService.questionSendMail(req.params.id, req.headers.host).then();
    if (!sends) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Error on send mail');
    }
    res.send(sends);
  });

module.exports = {
    sendMail
}