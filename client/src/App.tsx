import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest routes */}
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/transactions" element={<div>Transactions Page</div>} />
          <Route path="/" element={<div>Dashboard Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
