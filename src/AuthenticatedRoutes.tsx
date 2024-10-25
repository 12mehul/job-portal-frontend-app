import { Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./common/AuthenticatedLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateJobs from "./pages/recruiter/CreateJobs";
import MyJobs from "./pages/recruiter/MyJobs";
import Applications from "./pages/Applications";
import JobApplications from "./pages/recruiter/JobApplications";

const AuthenticatedRoutes = () => {
  return (
    <AuthenticatedLayout>
      <Routes>
        {/* Common Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* Recruiter Routes */}
        <Route path="/jobs/create" element={<CreateJobs />} />
        <Route path="/jobs/mylists" element={<MyJobs />} />
        <Route path="/job/applications/:jobId" element={<JobApplications />} />
        {/* Applicant Routes */}
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </AuthenticatedLayout>
  );
};

export default AuthenticatedRoutes;
