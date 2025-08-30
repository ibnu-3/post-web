    import express from 'express';
    import asyncHandler from 'express-async-handler';
    import Post from '../models/postModel.js';
    import { protect } from '../middleware/authMiddleware.js';

    const router = express.Router();

    // @desc    Create a new post
    // @route   POST /api/posts
    // @access  Private
    router.post(
        '/',
        protect,
        asyncHandler(async (req, res) => {
            const { title, content, image } = req.body;

            const post = await Post.create({
                title,
                content,
                image,
                user: req.user._id,
            });

            if (post) {
                res.status(201).json(post);
            } else {
                res.status(400);
                throw new Error('Invalid post data');
            }
        })
    );

    // @desc    Get all posts
    // @route   GET /api/posts
    // @access  Public
    router.get(
        '/',
        asyncHandler(async (req, res) => {
            const posts = await Post.find({}).populate('user', 'name email'); // Populate user info
            res.json(posts);
        })
    );

    // @desc    Get post by ID
    // @route   GET /api/posts/:id
    // @access  Public
    router.get(
        '/:id',
        asyncHandler(async (req, res) => {
            const post = await Post.findById(req.params.id).populate('user', 'name email');

            if (post) {
                res.json(post);
            } else {
                res.status(404);
                throw new Error('Post not found');
            }
        })
    );

    // @desc    Update a post
    // @route   PUT /api/posts/:id
    // @access  Private
    router.put(
        '/:id',
        protect,
        asyncHandler(async (req, res) => {
            const { title, content, image } = req.body;

            const post = await Post.findById(req.params.id);

            if (post) {
                if (post.user.toString() !== req.user._id.toString()) {
                    res.status(403); // Forbidden
                    throw new Error('Not authorized to update this post');
                }

                post.title = title || post.title;
                post.content = content || post.content;
                post.image = image || post.image;

                const updatedPost = await post.save();
                res.json(updatedPost);
            } else {
                res.status(404);
                throw new Error('Post not found');
            }
        })
    );

    // @desc    Delete a post
    // @route   DELETE /api/posts/:id
    // @access  Private
    router.delete(
        '/:id',
        protect,
        asyncHandler(async (req, res) => {
            const post = await Post.findById(req.params.id);

            if (post) {
                if (post.user.toString() !== req.user._id.toString()) {
                    res.status(403); // Forbidden
                    throw new Error('Not authorized to delete this post');
                }

                await post.remove();
                res.json({ message: 'Post removed' });
            } else {
                res.status(404);
                throw new Error('Post not found');
            }
        })
    );

    export default router;