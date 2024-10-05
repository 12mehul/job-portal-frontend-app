import { Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./common/AuthenticatedLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateJobs from "./pages/CreateJobs";

const AuthenticatedRoutes = () => {
  return (
    <AuthenticatedLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs/create" element={<CreateJobs />} />
      </Routes>
    </AuthenticatedLayout>
  );
};

export default AuthenticatedRoutes;
