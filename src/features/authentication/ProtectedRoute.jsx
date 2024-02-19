import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUser } from "./useGetUser";
import PageLoader from "../../components/common/PageLoader";

function ProtectedRoute({ children }) {
  // Get authenticated user
  const { isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  // If there is NO authenticated user and data is NOT loading or fetching, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loader while loading
  if (isLoading) return <PageLoader />;

  // if there is an authenticated user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
