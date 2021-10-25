const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const moduliRoute = require('./moduli.route');
const questionRoute = require('./question.route');
const viewRoute = require('./view.route');
const docsRoute = require('./docs.route');
const corsiRoute = require('./corsi.route');
const docentiRoute = require('./docenti.route');
const ambitiRoute = require('./ambiti.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/moduli',
    route: moduliRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
  {
    path: '/view',
    route: viewRoute,
  },
  {
    path: '/corsi',
    route: corsiRoute,
  },
  {
    path: '/docenti',
    route: docentiRoute,
  },
  {
    path: '/ambiti',
    route: ambitiRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

