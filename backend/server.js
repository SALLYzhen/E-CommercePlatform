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
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

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

app.use('/api/products', productRoutes); //当收到 /api/products 这个路径的请求时，应该使用 productRoutes 路由模块来处理这个请求。
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// 提供一个 API 接口 /api/config/paypal，用于客户端获取 PayPal 的客户端 ID。
// 在客户端发起支付时需要使用这个 ID 来和 PayPal 进行通信。
app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID})); 

// 将上传的文件（通常存储在 /uploads 目录中）通过 Express 的静态文件服务暴露出来，
// 以便在浏览器中可以通过 URL 访问这些文件。例如，如果上传的图片名为 my-image.jpg，
// 那么可以通过访问 /uploads/my-image.jpg 来获取并显示该图片。
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));