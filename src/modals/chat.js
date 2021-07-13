const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

// eslint-disable-next-line func-names
ObjectId.prototype.valueOf = () => this.toString();

const chatSchema = new mongoose.Schema(
  {
    personId: {
        type: String,
    },
    roomId:{
        type: String
    },
    message: {
        type: String,
    },
    time: {
        type: String,
    },
    isMedia: {
        type: Boolean,
        default:false
    },
    isMessageInfo:{
        type: Boolean,
        default:false
    },
    mediaDetails:{
        type: Object
    },
    mediaType: {
        type: String
    },
    senderName: {
        type: String
    },
    isPersonal:{
        type: Boolean,
        default:false
    }
  },
  { strict: false, timestamps: true,collection: 'chat' }
);

const model = mongoose.model("chat", chatSchema);

module.exports = model;