import { Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./common/AuthenticatedLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const AuthenticatedRoutes = () => {
  return (
    <AuthenticatedLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthenticatedLayout>
  );
};

export default AuthenticatedRoutes;
