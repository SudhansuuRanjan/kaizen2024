import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import supabase from '../../config/supabase';

const PrivateRoute = ({ children }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;