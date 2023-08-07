// outlet is basically what we want to return if we're logged in
import { Navigate, Outlet } from 'react-router-dom';
// userSelect 是用于在函数式组件中访问 Redux store 中的数据的一种方式。
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
