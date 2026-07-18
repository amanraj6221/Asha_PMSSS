import { Navigate } from "react-router-dom";

const FinanceProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("finance_token");
  const role = localStorage.getItem("role");

  if (!token || role !== "FINANCE") {
    return <Navigate to="/login/finance" replace />;
  }

  return <>{children}</>;
};

export default FinanceProtectedRoute;