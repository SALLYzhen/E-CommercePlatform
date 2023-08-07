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
            providesTags: ['Product'],
            keepUnusedDataFor: 5,// 表示在请求结果未被使用的情况下，保持结果的缓存时间
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        // createProduct 是一个 mutation，它用于创建新的产品。
        createProduct: builder.mutation({
            query: () => ({
              url: `${PRODUCTS_URL}`,
              method: 'POST',
            }),
            // 当调用 createProduct 成功后，相关的 Product 缓存标签将失效，
            // 意味着与产品有关的数据将被标记为过期，当下次获取产品数据时，将重新从服务器获取最新的数据而不是使用缓存。
            invalidatesTags: ['Product'],
          }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
          }),
    }),
});
//通过 productsApiSlice 对象导出了 useGetProductsQuery 方法，
//它是根据 getProducts 请求自动生成的一个 hook。
// 在组件中可以使用 useGetProductsQuery() 来发起 getProducts 请求，并获取产品数据的结果。
export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
} = productsApiSlice;
