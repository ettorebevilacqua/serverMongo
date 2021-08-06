const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const configLocal2 = {
  "domains": [
    "yahoo.com"
  ],
  "host": "smtp.mail.yahoo.it",
  "port": 587,
  "secure": true,

  auth: {
    user: 'ettorebevilacqua@gmail.com', // generated ethereal user
    pass: 'pdjwgyidqnqbgeug', // generated ethereal password
  },
}

const configLocal3 = {
  service: "gmail",
  auth: {
    user: 'shukeenkel@gmail.com', // generated ethereal user
    pass: 'qwer23portare!aCasaSempre', // generated ethereal password
  },
}

const configLocal = {
  /* name:'localhost',
   host: "smtp.ethereal.email",
   port: 465,
   secure: true, // true for 465, false for other ports 587
   */
  service: 'gmail', // no need to set host or port etc.
  auth: {
    user: 'shukeenkel@gmail.com', // generated ethereal user
    pass: 'qwer23portare!aCasaSempre', // generated ethereal password
  },
}


const transport = nodemailer.createTransport(configLocal);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => {
      // sendVerificationEmail('ettorebevilacqua@gmail.com', 'ddd');
      logger.info('Connected to email server')
    })
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  try {
    const res = await transport.sendMail(msg);

    console.log('send', res);
    return res;
  } catch (error) {
    console.log('error send mail ', error);
    throw new ApiError(httpStatus.CONFLICT, '------>' + JSON.stringify(error));
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  const dsn = {
    id: 'some random message specific id',
    return: 'headers',
    notify: ['failure', 'delay'],
    recipient: 'shukeenkel@gmail.com'
  }

  return await sendEmail({ to, subject, text, dsn });
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  const res = await sendEmail(to, subject, text);
  console.log(res)
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};

// sendEmail('ettorebevilacqua@gmail.com', 'text xx', 'xxx');