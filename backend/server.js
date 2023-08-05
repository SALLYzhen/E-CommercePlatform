/**
 * 这是一个 Express 应用程序。
 * Express 是一个用于构建后端 Web 应用程序和 API 的 Node.js 框架。
 * Express 应用程序可以作为后端服务提供数据和功能，
 * 而前端可以使用 React 等框架来构建用户界面和交互逻辑。
 * 前端和后端可以相互配合，通过 API 进行通信，实现前后端分离的开发方式。
 * ------------------------------------------------------------
 * Express 应用程序的主要功能是提供产品信息的 API，
 * 通过 /api/products 路径来处理关于产品的请求。
 * 具体的产品处理逻辑被封装在 productRoutes.js 中的路由处理器中。
 */
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
});

//当收到 /api/products 这个路径的请求时，应该使用 productRoutes 路由模块来处理这个请求。
app.use('/api/products', productRoutes); 

app.use('/api/users', userRoutes); 

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));