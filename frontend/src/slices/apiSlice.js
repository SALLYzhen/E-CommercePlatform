/**
 * API slice 是 Redux Toolkit Query 中用于定义和管理网络请求的一个重要概念。
 * 一个 API slice 是一个包含了一组请求的集合。
 * 1/ 每个请求在 API slice 中都被定义为一个 endpoint，包含了 query（查询）和 mutation（变更）。
 * 2/ 一个 API slice 可以由 createApi 函数来创建，该函数接收一个配置对象，其中包含了 baseQuery 和 endpoints 字段。
 *   2.1/ baseQuery 是用于发送网络请求的基本查询对象，它通常是由 fetchBaseQuery 函数创建的。
 *   2.2/ endpoints 是一个函数，用于定义 API slice 中的各个请求（endpoints）。
 *        在这个函数中，我们可以使用 builder 对象来定义每个请求的 query（查询）和 mutation（变更）。
 * 
 * 通过创建 API slice，我们可以在应用程序中更方便地进行数据获取和管理，而无需手动编写复杂的网络请求代码。
 * API slice 可以帮助我们自动处理网络请求、数据缓存和错误处理，从而提高了开发效率和应用程序的性能。
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'], // 用于定义 API 的标签类型
    endpoints: (builder) => ({}),
});