    import React, { useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { logout } from '../slices/authSlice';
    import { getPosts } from '../slices/postSlice';
    import { toast } from 'react-toastify';

    const Home = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { user } = useSelector((state) => state.auth);
        const { posts, isLoading, isError, message } = useSelector((state) => state.posts);

        useEffect(() => {
            if (!user) {
                navigate('/login');
            } else {
                dispatch(getPosts());
            }
        }, [user, navigate, dispatch]);

        const handleLogout = () => {
            dispatch(logout())
                .then(() => {
                    navigate('/login');
                    toast.success('Logged out');
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Logout failed');
                });
        };

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isError) {
            return <div>Error: {message}</div>;
        }

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Welcome, {user?.name}!</p>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Logout
                </button>

                <h2 className="text-2xl font-semibold mt-6">Posts</h2>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-white shadow-md rounded p-4">
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
        );
    };

    export default Home;