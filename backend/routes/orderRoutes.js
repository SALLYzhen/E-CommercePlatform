import express from 'express';
const router = express.Router(); // 用于创建模块化、可挂载的路由器的对象。
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// 在 Express 中，router.route() 是一个用于创建路由链式调用的方法。
// 它允许我们在同一个路径上添加多个 HTTP 方法的路由处理程序，从而实现路由的链式调用。
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
