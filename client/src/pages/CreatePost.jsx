    import React, { useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { createPost } from '../slices/postSlice';
    import { useNavigate } from 'react-router-dom';
    import { toast } from 'react-toastify';

    const CreatePost = () => {
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isLoading, isError, message } = useSelector((state) => state.posts);

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(createPost({ title, content }))
                .then(() => {
                    toast.success('Post created successfully!');
                    navigate('/dashboard');
                })
                .catch(() => {
                    toast.error(isError ? message : 'Failed to create post');
                });
        };

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>
                <form onSubmit={handleSubmit} className="max-w-lg">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="5"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Post'}
                    </button>
                </form>
            </div>
        );
    };

    export default CreatePost;