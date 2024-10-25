import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const hasRun = useRef(false); // useRef doesn’t trigger re-renders

  useEffect(() => {
    if (!hasRun.current) {
      localStorage.clear();
      toast.success("Logout Successfully");
      hasRun.current = true;
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);

  return null;
};

export default Logout;
