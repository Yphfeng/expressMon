var mongoose = require('mongoose');

var time = Date.parse(new Date());
var lifeSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: {
        createAt: {
            type: String,
            default: time
        },
        updateAt: {
            type: String,
            default: time
        },
        allUpdateAt: {
            type: String,
            default: time
        }
    },
});


mongoose.model('life', lifeSchema);
