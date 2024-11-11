import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subTitle: {
        type: String,
        required: true,
        trim: true
    },
    overView: {
        type: String,
        required: true
    },
    image: {
        location: {
            type: String,
        },
        key: {
            type: String,
        },
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

const Article = mongoose.model('article', articleSchema);

export { Article };
