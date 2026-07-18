// C:\Users\Aman Raj\PMSSS\src\utils\SagProtectedRoute.tsx

import { Navigate } from "react-router-dom";

const SagProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("sag_token");

  if (!token) {
    return <Navigate to="/sag/login" replace />;
  }

  return children;
};

export default SagProtectedRoute;
