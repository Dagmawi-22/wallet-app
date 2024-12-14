import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout: React.FC = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="w-full mx-auto">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
