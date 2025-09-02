import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <div className='flex justify-between items-center  text-cyan-800 text-3xl'>
                <h1 className="text-3xl font-bold mb-4 italic">Dashboard</h1>

                <button onClick={handleLogout} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Logout
                </button>
            </div>
            <p className='mt-10 text-xl font-bold '>Welcome, {user?.name.toUpperCase()}!</p>
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
                <>
                <p>No posts found.</p>
                <Link to={'/create-post'} className='px-5 py-2.5 bg-green-500 text-white rounded'>Create Post</Link></>
            )}
            <button className='px-5 py-2.5 bg-green-500 text-white rounded-full  font-extrabold text-4xl bottom-4 right-4 fixed' onClick={()=>navigate('/create-post')}>+</button>
        </div>
    );
};

export default Home;