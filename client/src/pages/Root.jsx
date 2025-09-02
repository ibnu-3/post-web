    import React from 'react';
    import { Link } from 'react-router-dom';

    const Root = () => {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Blog Website</h1>
                <nav className="mb-4 drop-shadow-lg border-b p-3 flex justify-between items-center ">
                    <Link to="/" className="mr-4 hover:text-blue-500">Home</Link>
                    <Link to="/login" className="mr-4 hover:text-blue-500">Login</Link>
                    <Link to="/signup" className="mr-4 hover:text-blue-500">Sign Up</Link>
                    <Link to="/dashboard" className="mr-4 hover:text-blue-500">Dashboard</Link>
                </nav>
                <p className='mt-16 text-center text-cyan-600 text-3xl'>Welcome to the Blog!</p>
            </div>
        );
    };

    export default Root;