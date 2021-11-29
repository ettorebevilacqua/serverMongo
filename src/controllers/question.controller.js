const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');
const { Question, addEnte } = require('../models');

const getItems = catchAsync(async (req, res) => {
  const user = req.user;
  const state = req.query.state;
  const condParams = {
    open : { closeAt: null },
    close : { closeAt: { $ne: null } },
  };
  const condState = !state ? {} : condParams[state] || {};
  const _filter =pick(req.query, ['name', 'role']);
  const filter = user && user.idEnte ? { ..._filter, ...condState, idEnte: user.idEnte} : _filter;
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'state']);
  // console.log('condState xxx',state, filter);

  const result = await Question.paginate(filter, options, req.user);
  res.send(result);
});

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
  getItems,
  sendMail,
  getDocentiActivity,
  getQuestionsModuli,
}

getDocentiActivity({user:{idEnte:1}}, {send:()=>'test'})