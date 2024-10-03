import { Fragment } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToastifyContainer from "./common/ToastifyContainer";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Logout from "./pages/Logout";

function App() {
  return (
    <Fragment>
      <ToastifyContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AuthenticatedRoutes />} />
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
