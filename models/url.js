const mongoose = require("mongoose")

//url schema
const UrlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    urlredirect: {
        type: String,
        require: true
    },
    visit: [{ timestamp: { type: Number } }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    
    }
}, { timestamp: true }
);


const url = mongoose.model('url', UrlSchema);
module.exports = url;
