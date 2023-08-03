/**
 * 这段代码是一个完整的 Redux store 配置代码
 * 在 Redux 中，所有的状态都存储在一个单一的 JavaScript 对象中，这个对象就是 Redux store。
 * Store 是一个不可变的状态树，其中包含了应用程序的所有状态信息。
 */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    // 当 API 请求发生时，apiSlice.reducer 将负责处理相关的状态更新。
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // 使用 getDefaultMiddleware 函数来获取默认的中间件列表，
    // 并使用 concat 方法将 apiSlice.middleware 添加到默认中间件的末尾。
    // apiSlice.middleware 用于处理网络请求并自动更新状态。
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // 启用 Redux DevTools 来方便地调试和查看状态变化
    devTools: true,
});

export default store;
