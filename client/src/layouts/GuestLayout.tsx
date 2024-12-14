import { Outlet } from "react-router-dom";

const GuestLayout: React.FC = () => {
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
