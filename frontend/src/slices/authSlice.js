/**
 * 这是一个 Redux Toolkit 的 slice，用于管理用户认证（身份验证）的状态。
 */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    // 初始状态会从 localStorage 中获取保存的用户认证信息（如果有的话），否则设置为 null。
    // localStorage 是 Web 浏览器提供的一种用于存储客户端数据的 API。
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // 更新用户认证状态
            state.userInfo = action.payload;
            // 将用户认证信息保存到 localStorage 中，以便在刷新页面或关闭浏览器后，依然可以保留用户认证状态。
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            // NOTE: here we need to also remove the cart from storage so the next
            // logged in user doesn't inherit the previous users cart and shipping
            localStorage.clear();
        },
    }
})

// 导出 setCredentials action，以便在其他地方可以使用它来更新用户认证状态。
export const { setCredentials, logout } = authSlice.actions;

// 导出 authSlice.reducer，以便在 Redux store 中使用它来管理用户认证状态。
export default authSlice.reducer;