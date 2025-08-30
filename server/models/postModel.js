    import mongoose from 'mongoose';

    const postSchema = mongoose.Schema(
        {
            title: { type: String, required: true },
            content: { type: String, required: true },
            image: { type: String },  // URL to the image, optional
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            },
        },
        {
            timestamps: true,
        }
    );

    const Post = mongoose.model('Post', postSchema);

    export default Post;