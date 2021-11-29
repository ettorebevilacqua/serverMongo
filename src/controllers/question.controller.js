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

const getDocentiActivity = catchAsync(async (req, res) => {
  const user = req.user;
  const idEnte = user.idEnte;
  const sends = await questionService.getDocentiActivity(req.user, idEnte);
  if (!sends) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error on send mail');
  }
  res.send(sends);
});

const getQuestionsModuli = catchAsync(async (req, res) =>{
  const _id = req.params.id;
  const data = await questionService.getQuestionsModuli({ _id } );
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  res.send(data);
});

module.exports = {
  sendMail,
  getDocentiActivity,
  getQuestionsModuli,
}

getDocentiActivity({user:{idEnte:1}}, {send:()=>'test'})