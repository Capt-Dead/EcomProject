import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

const LoginAuth = createContext();

export const LoginAuthProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const getUser = async (data) => {
    try {
      const user = await axios.post("login", data);
      setCookie("user", user?.data);
      navigate({ replace: true, state: { loginSuccess: true } });
      toast.success("Welcome to our Shop!", {
        position: "bottom-left",
      });
    } catch (e) {
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e.response?.status === 401) {
        setErrors([data, "Incorrect email or password. Please try again"]);
      }
    }
  };

  return (
    <LoginAuth.Provider
      value={{
        cookies,
        errors,
        setErrors,
        getUser,
      }}
    >
      {children}
    </LoginAuth.Provider>
  );
};
export default LoginAuth;
