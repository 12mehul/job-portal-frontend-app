import { Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./common/AuthenticatedLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateJobs from "./pages/CreateJobs";
import MyJobs from "./pages/MyJobs";

const AuthenticatedRoutes = () => {
  return (
    <AuthenticatedLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs/create" element={<CreateJobs />} />
        <Route path="/jobs/mylists" element={<MyJobs />} />
      </Routes>
    </AuthenticatedLayout>
  );
};

export default AuthenticatedRoutes;
