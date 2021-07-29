const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');

const questionSchema = mongoose.Schema(withRecordInfo({
    iduser: {
        type: String,
        required: true,
        trim: true,
    },
    idmodulo: {
        type: String,
        required: true,
        trim: true,
    },
    idcorso: {
        type: String,
        required: true,
        trim: true,
    },
    titolo: {
        type: String,
        required: true,
        trim: true,
    },
    titoloModulo: {
        type: String,
        required: false,
        trim: true,
    },
    docenti: {
        type: String,
        required: false,
        trim: true,
    },
    numPartecipanti: {
        type: String,
        required: false,
        trim: true,
    },
    partecipanti: [{}],
}));

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

questionSchema.statics.createWithUser = async function (body, user) {
   //  body.iduser=
  //  const user = await this.create({ email, _id: { $ne: excludeUserId } });
    return !!user;
  };

questionSchema.pre('save', async function (next) {
    const modulo = this;
    /* if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    */
    next();
});

/**
 * @typedef Modulo
 */
const Question = mongoose.model('question', questionSchema);

module.exports = Question;
