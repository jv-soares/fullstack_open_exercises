const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI);

const schema = new mongoose.Schema(
    {
        name: String,
        number: String,
    },
    {
        toJSON: {
            transform: (document, returnedObj, _) => {
                returnedObj.id = returnedObj._id.toString();
                delete returnedObj._id;
                delete returnedObj.__v;
            },
        },
    }
);

module.exports = mongoose.model('Person', schema);
