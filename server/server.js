    import express from 'express';
    import colors from 'colors'
    import dotenv from 'dotenv';
    import cors from 'cors';
    import cookieParser from 'cookie-parser';
    import connectDB from './config/db.js';
    import userRoutes from './routes/userRoutes.js';
    import postRoutes from './routes/postRoutes.js';
    import { errorHandler, notFound } from './middleware/errorMiddleware.js';

    dotenv.config();

    connectDB();

    const app = express();

    // CORS configuration
    const corsOptions = {
    
        origin: process.env.FRONTEND_URL,
         methods:['POST','GET','PUT','OPTIONS','DELETE','HEAD'],
         allowedHeaders:['Content-Type','Authorization','X-Custom-Head'],
        credentials: true,
    };
    app.use(cors(corsOptions));

    app.use(express.json()); // To parse JSON data
    app.use(cookieParser()); // To parse cookies

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/posts', postRoutes);

    app.get('/', (req, res) => {
        res.send('API is running...');
    });

    // Error handling middleware
    app.use(notFound);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`.yellow.bold.underline);
    });