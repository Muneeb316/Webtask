const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = new Schema({
    memory: {
        type: Object,
        required: true
    },
    disk: {
        type: Object
    },
    cpu: {
        type: Object,
        required: true
    }
});

const Data = mongoose.model('Data', data);
module.exports = Data;