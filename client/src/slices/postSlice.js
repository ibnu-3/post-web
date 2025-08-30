
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    const API_URL = '/api/posts';

    const initialState = {
        posts: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
    };

    // Create a new post
    export const createPost = createAsyncThunk(
        'posts/create',
        async (postData, thunkAPI) => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Important for cookies
                };

                const response = await axios.post(API_URL, postData, config);
                return response.data;
            } catch (error) {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                return thunkAPI.rejectWithValue(message);
            }
        }
    );

    // Get all posts
    export const getPosts = createAsyncThunk(
        'posts/getAll',
        async (_, thunkAPI) => {
            try {
                const response = await axios.get(API_URL);
                return response.data;
            } catch (error) {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                return thunkAPI.rejectWithValue(message);
            }
        }
    );

    // Update a post
    export const updatePost = createAsyncThunk(
        'posts/update',
        async ({ postId, postData }, thunkAPI) => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Important for cookies
                };

                const response = await axios.put(`${API_URL}/${postId}`, postData, config);
                return response.data;
            } catch (error) {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                return thunkAPI.rejectWithValue(message);
            }
        }
    );

    // Delete a post
    export const deletePost = createAsyncThunk(
        'posts/delete',
        async (postId, thunkAPI) => {
            try {
                const config = {
                    withCredentials: true, // Important for cookies
                };

                await axios.delete(`${API_URL}/${postId}`, config);
                return postId;
            } catch (error) {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                return thunkAPI.rejectWithValue(message);
            }
        }
    );

    export const postSlice = createSlice({
        name: 'posts',
        initialState,
        reducers: {
            reset: (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(createPost.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(createPost.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.posts.push(action.payload);
                })
                .addCase(createPost.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(getPosts.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getPosts.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.posts = action.payload;
                })
                .addCase(getPosts.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(updatePost.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(updatePost.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.posts = state.posts.map((post) =>
                        post._id === action.payload._id ? action.payload : post
                    );
                })
                .addCase(updatePost.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(deletePost.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(deletePost.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.posts = state.posts.filter((post) => post._id !== action.payload);
                })
                .addCase(deletePost.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                });
        },
    });

    export const { reset } = postSlice.actions;
    export default postSlice.reducer;
    