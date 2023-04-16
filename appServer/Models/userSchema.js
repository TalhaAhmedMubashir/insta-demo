const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            unique: [true, 'email is already exists'],
            lowercase: true,
            trim: true,
            required: [true, 'email is required'],
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
                },
                message: '{VALUE} is not a valid email address'
            }
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Password is required'],
        },
        following: [
            {
                email: {
                    type: String
                },
                name: {
                    type: String,
                }
            }
        ],
        followers: [
            {
                email: {
                    type: String
                },
                name: {
                    type: String,
                }
            }
        ],
        notification: [
            {
                name: {
                    type: String,
                },
                message: {
                    type: String,
                },
                seen: {
                    type: Boolean,
                }
            }
        ],
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('UserUpdatedSchema', userSchema);  
