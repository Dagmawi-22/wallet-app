import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";
import Transactions from "./pages/protected/Transactions";
import { useAtom } from "jotai";
import { isValidAuthState, userAtom } from "./store/authStore";
import { Toaster } from "react-hot-toast";


const queryClient = new QueryClient();

const App: React.FC = () => {
  const [user] = useAtom(userAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user && isValidAuthState(user) ? (
                <Navigate to="/transactions" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route element={<GuestLayout />}>
            <Route
              path="/login"
              element={
                user && isValidAuthState(user) ? (
                  <Navigate to="/transactions" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={
                user && isValidAuthState(user) ? (
                  <Navigate to="/transactions" />
                ) : (
                  <Register />
                )
              }
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
