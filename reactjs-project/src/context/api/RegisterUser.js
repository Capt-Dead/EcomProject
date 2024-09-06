import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

const RegisterAuth = createContext();

export const RegisterAuthProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const registerUser = async (data) => {
    try {
      await axios.post("register", data);
      navigate("/login");
      toast.success("Successfully Registered", {
        position: "bottom-left",
      });
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  return (
    <RegisterAuth.Provider
      value={{
        registerUser,
        errors,
        setErrors,
      }}
    >
      {children}
    </RegisterAuth.Provider>
  );
};
export default RegisterAuth;
