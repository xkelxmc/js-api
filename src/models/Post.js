import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    data: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Post', postSchema);
