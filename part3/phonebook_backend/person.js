const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI);

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
        },
        number: {
            type: String,
            required: true,
            minLength: 8,
            validate: {
                validator: (value) => /^\d{2,3}-\d+$/.test(value),
                message: (props) =>
                    `${props.value} is not a valid phone number`,
            },
        },
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
