import { Fragment } from "react/jsx-runtime";
import ToastifyContainer from "./common/ToastifyContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <Fragment>
      <ToastifyContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
