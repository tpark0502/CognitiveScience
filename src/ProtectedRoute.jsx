import { Navigate } from "react-router-dom";
import useAuth from "./sections/Auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
