import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    data: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userLikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    userDislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

export default mongoose.model('Post', postSchema);
