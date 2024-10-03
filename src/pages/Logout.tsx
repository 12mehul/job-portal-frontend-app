import { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  useEffect(() => {
    console.log("@@@@@@@@");
    localStorage.clear();
    toast.success("Logout Successfully");
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 2000);
  }, []);

  return null;
};

export default Logout;
