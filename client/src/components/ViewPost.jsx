    import React, { useEffect, useState } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import axios from 'axios';

    const ViewPost = () => {
        const { id } = useParams();
        const [post, setPost] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`/api/posts/${id}`); // Replace with your API endpoint
                    setPost(response.data);
                } catch (err) {
                    setError(err.message || 'Failed to load post');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }, [id]);

        if (loading) {
            return <div className="container mx-auto p-4">Loading...</div>;
        }

        if (error) {
            return <div className="container mx-auto p-4">Error: {error}</div>;
        }

        if (!post) {
            return <div className="container mx-auto p-4">Post not found.</div>;
        }

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-700 mb-4">{post.content}</p>
                {post.image && (
                    <img src={post.image} alt={post.title} className="max-w-full h-auto mb-4 rounded" />
                )}
                <p className="text-sm text-gray-500">
                    Posted by {post.user.name} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link to="/dashboard" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Back to Dashboard
                </Link>
            </div>
        );
    };

    export default ViewPost;