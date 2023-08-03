/**
 * 创建一个专门用于获取产品数据的 API slice，
 * 并通过 useGetProductsQuery hook 将其暴露给组件，
 * 从而实现了在应用中更方便、高效地获取产品数据。
 */
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,// 表示在请求结果未被使用的情况下，保持结果的缓存时间
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        })
    }),
});
//通过 productsApiSlice 对象导出了 useGetProductsQuery 方法，
//它是根据 getProducts 请求自动生成的一个 hook。
// 在组件中可以使用 useGetProductsQuery() 来发起 getProducts 请求，并获取产品数据的结果。
export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
