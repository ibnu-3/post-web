    import React, { useState, useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { useNavigate, useParams } from 'react-router-dom';
    import { updatePost } from '../slices/postSlice';
    import axios from 'axios';
    import { toast } from 'react-toastify';

    const EditPost = () => {
        const { id } = useParams();
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isLoading, isError, message } = useSelector((state) => state.posts);
        const [loadingPost, setLoadingPost] = useState(true);

        useEffect(() => {
            const fetchPost = async () => {
                setLoadingPost(true);
                try {
                    const response = await axios.get(`/api/posts/${id}`); // Replace with your API endpoint
                    setTitle(response.data.title);
                    setContent(response.data.content);
                } catch (error) {
                    console.error("Failed to fetch post:", error);
                    toast.error("Failed to load post for editing.");
                } finally {
                    setLoadingPost(false);
                }
            };

            fetchPost();
        }, [id]);

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(updatePost({ postId: id, postData: { title, content } }))
                .then(() => {
                    toast.success('Post updated successfully!');
                    navigate('/dashboard');
                })
                .catch(() => {
                    toast.error(isError ? message : 'Failed to update post');
                });
        };

        if (loadingPost) {
            return <div className="container mx-auto p-4">Loading post data...</div>;
        }

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
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
                        {isLoading ? 'Updating...' : 'Update Post'}
                    </button>
                </form>
            </div>
        );
    };

    export default EditPost;