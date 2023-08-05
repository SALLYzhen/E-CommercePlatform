/**
 * 这段代码是React应用程序的入口文件。
 * 通过createBrowserRouter和createRoutesFromElements函数创建了一个React Router的路由配置。
 * 定义了两个页面组件HomeScreen和ProductScreen，
 * 它们将分别作为根路由（/）和产品详情路由（/product/:id）的处理组件。
 * 
 * 通过ReactDOM.createRoot创建了一个根React根节点，
 * 并使用root.render()将路由配置包裹在<RouterProvider>组件中，
 * 然后将整个应用程序渲染到名为root的DOM元素上。
 * 
 * 这是一个典型的React应用程序的入口文件，它用于设置路由和渲染根组件，从而启动整个React应用。
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
