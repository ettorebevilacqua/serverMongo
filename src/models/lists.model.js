const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const withRecordInfo = require('./withRecordInfo.schema');


const itemListSchema = mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true,
    },
    value: {
        type: String,
        trim: true,
    },
    position: {
        type: Number,
    },
    checked:{
        type: Boolean,
    },
});
const listsSchema = mongoose.Schema(withRecordInfo({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    list:[itemListSchema]
}));

// add plugin that converts mongoose to json
listsSchema.plugin(toJSON);
listsSchema.plugin(paginate);

// ambitiSchema.statics.beforeServiceSave = async (Model, user, dataBody, id = 0) => {}

listsSchema.pre('save', async function (next) {
    // const corsi = this;
    // next();
});

/**
 * @typedef Modulo
 */
const Lists = mongoose.model('Lists', listsSchema);

module.exports = Lists;
