import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// 通过 localStorage.getItem("cart") 来尝试获取本地存储中的购物车数据。
// 如果本地存储中存在购物车数据，
// 则使用 JSON.parse() 方法将其解析为 JavaScript 对象，并将其作为 initialState 的初始值。
// 如果本地存储中没有购物车数据或者数据解析失败，
// 则使用一个初始的空购物车对象 {cartItems: []} 作为 initialState 的初始值。
const initialState = localStorage.getItem("cart") ? 
        JSON.parse (localStorage.getItem("cart")) :
        {cartItems: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const item = action.payload;

        const existItem = state.cartItems.find((x) => x._id === item._id);

        if (existItem) {
            state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
        } else {
            state.cartItems = [...state.cartItems, item];
        }

        return updateCart(state);
      },
      removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

        return updateCart(state);
      }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

