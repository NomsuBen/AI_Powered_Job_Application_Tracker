const mongoos = require('mongoose');

const userSchema = new mongoos.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoos.model('user', userSchema);