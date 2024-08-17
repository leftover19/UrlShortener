import mongoose from "mongoose";
import shortId from 'shortid';
const shortUrlsSchema = new mongoose.Schema({
    full:{
        type : String,
        required : true
    },
    short:{
        type : String,
        required : true,
        unique : true,
        default : shortId.generate
    },
    clicks:{
        type : Number,
        required : true,
        default : 0
    }

})

const ShortUrl = mongoose.model('ShortUrl', shortUrlsSchema);
export default ShortUrl;