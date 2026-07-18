// 📂 src/utils/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: JSX.Element;
  role?: "USER" | "SAG" | "FINANCE";
}

function ProtectedRoute({ children, role }: ProtectedProps) {
  let token: string | null = null;

  if (role === "SAG") token = localStorage.getItem("sag_token");
  else if (role === "FINANCE") token = localStorage.getItem("finance_token");
  else token = localStorage.getItem("token"); // default USER

  if (!token) {
    if (role === "SAG") return <Navigate to="/login/sag" replace />;
    if (role === "FINANCE") return <Navigate to="/login/finance" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
