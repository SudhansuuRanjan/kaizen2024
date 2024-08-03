import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { session } = useAuth();

  if (!session) {
    const url = window.location.pathname;
    return <Navigate to={`/signin?redirect_url=${url}`} />;
  }

  return children;
};

export default PrivateRoute;