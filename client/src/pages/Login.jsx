    import React, { useState, useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { useNavigate } from 'react-router-dom';
    import { login, reset } from '../slices/authSlice';
    import { toast } from 'react-toastify';

    const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const { user, isLoading, isError, isSuccess, message } = useSelector(
            (state) => state.auth
        );

        useEffect(() => {
            if (isError) {
                toast.error(message);
            }

            if (isSuccess || user) {
                navigate('/dashboard');
            }

            dispatch(reset());
        }, [user, isError, isSuccess, message, navigate, dispatch]);

        const handleSubmit = (e) => {
            e.preventDefault();

            const userData = {
                email,
                password,
            };

            dispatch(login(userData));
        };

        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                    <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-8">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging In...' : 'Login'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default Login;