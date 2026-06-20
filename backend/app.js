import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import configs & routes
import logger from './config/logger.js';
import apiRouter from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: true, // In production, replace with specific trusted origins
  credentials: true,
}));

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Morgan HTTP request logging (directed to Winston)
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
  stream: logger.stream,
}));

// API Routes
app.use('/api/v1', apiRouter);

// Root endpoint test
app.get('/', (req, res) => {
  res.status(200).json({ status: 'online', message: 'Mini ERP API Server' });
});

// Catch 404 (Route not found)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use(errorHandler);

export default app;
