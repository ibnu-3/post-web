    import React from 'react';
    import { Provider } from 'react-redux';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Login from './pages/Login';
    import SignUp from './pages/SignUp';
    import Root from './pages/Root'; // Example layout component
    import Home from './pages/Home'; // Dashboard

    import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    

    import store from './store';
import CreatePost from './pages/CreatePost';
import EditPost from './components/EditPost';
import ViewPost from './components/ViewPost';

    const App = () => {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Root />} />
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/edit-post/:id" element={<EditPost />} />
                        <Route path="/view-post/:id" element={<ViewPost />} />

                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </Provider>
        );
    };

    export default App;