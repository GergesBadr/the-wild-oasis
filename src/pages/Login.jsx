import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useGetUser";
import Logo from "../components/common/Logo";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  // Redirect to dashboard if user is already authenticated and tries to access login
  const { isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-100 p-6 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
      <div className="w-full space-y-8 md:max-w-[600px]">
        <Logo size="w-36" />
        <h1 className="heading-2 text-center">Log in to your account</h1>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
