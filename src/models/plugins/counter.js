const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const counterSchema = mongoose.Schema({
    _id: String,
    count: {
        type: Number, default: 1,
    }
});

const Counter = mongoose.model('Counter', counterSchema);

async function incrementCounter(schemaName, callback) {
    const cb = callback || (() => { });
    try {
        const res = await Counter.findOneAndUpdate({ _id: schemaName },
            { $inc: { count: 1 } }, { returnOriginal: false, upsert: true });
        console.log('ris xxx', res);
        return res.count;
    } catch (err) {
        console.log('eee', err);
        return null;
    }
    /*  , function (err, result) {
          if (err) {
              cb(err)
          } else {
              cb(null, result.count);
          }
      }); */
};

module.exports = incrementCounter;
module.exports.schema = Counter;

