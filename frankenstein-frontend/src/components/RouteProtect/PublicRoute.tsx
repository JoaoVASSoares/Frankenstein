// components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return null; // ou um loading
  console.log(isAuthenticated);
  // Se o usuário já estiver logado, redireciona pra home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
