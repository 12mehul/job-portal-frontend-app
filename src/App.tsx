import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ToastifyContainer from "./common/ToastifyContainer";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Logout from "./pages/Logout";

function App() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (
      token &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/register")
    ) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <Fragment>
      <ToastifyContainer />
      <Routes>
        {/* Unauthenticated Routes */}
        <Route path="/" element={<Signin />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AuthenticatedRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
