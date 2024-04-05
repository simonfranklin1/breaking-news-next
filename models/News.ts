import { Schema, models, model } from "mongoose";
import User from "./User";

const NewsSchema = new Schema({
    title: {
        type: String,
        require: [true, "Title is required"]
    },
    text: {
        type: String,
        require: [ true, "Text is required"]
    },
    banner: {
        type: String,
        require: [ true, "Image is required"]
    },
    category: {
        type: String,
        require: [true, "Select One category"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: User,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Array,
        require: true
    },
    comments: {
        type: Array,
        require: true
    }
})

const News = models.News || model("News", NewsSchema);

export default News;