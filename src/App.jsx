import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./contexts/ThemeContext";

const AppLayout = lazy(() => import("./components/AppLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const BookingDetails = lazy(() => import("./features/bookings/BookingDetails"));
const Checkin = lazy(() => import("./features/check-in-out/Checkin"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Guests = lazy(() => import("./pages/Guests"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PageLoader = lazy(() => import("./components/common/PageLoader"));
const ProtectedRoute = lazy(
  () => import("./features/authentication/ProtectedRoute"),
);

// Setting up react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set 15 sec stale time for all queries.
      staleTime: 1000 * 15,
    },
  },
});

function App() {
  const { theme } = useTheme();
  const toastStyleInDarkMode =
    theme === "dark"
      ? {
          backgroundColor: "#111827",
          color: "#f3f4f6",
        }
      : {};

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            element={
              // Every page in AppLayout will be shown or not, based on login logic of the user
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:bookingId" element={<BookingDetails />} />
            <Route path="/checkin/:bookingId" element={<Checkin />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      {/* React-query devtools => won't be shown in production*/}
      <ReactQueryDevtools />
      {/* Customize toasts notifications */}
      <Toaster
        toastOptions={{
          duration: 4000,
          ariaProps: { "aria-live": "polite", role: "status" },
          style: {
            padding: "14px 18px",
            marginTop: "18px",
            boxShadow: "0px 5px 12px 1px rgb(0, 0, 0, 0.1)",
            ...toastStyleInDarkMode,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
