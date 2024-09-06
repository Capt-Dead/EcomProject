import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

const AccountContext = createContext();

const initialForm = {
  name: "",
  email: "",
  address: "",
  city: "",
  postal: "",
  country: "",
  mobile: "",
};

export const AccountProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialForm);
  const [accountEdit, setAccountEdit] = useState([]);
  const [accountEdits, setAccountEdits] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cookies] = useCookies(["user"]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getUser = async (id) => {
    try {
      const response = await axios.get("user/" + cookies.user.user, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const Account = response.data;
      setFormValues({
        name: Account.name,
        email: Account.email,
        address: Account.address.address,
        city: Account.address.city,
        postal: Account.address.postal_code,
        country: Account.address.country,
        mobile: Account.address.mobile_no,
      });
    } catch (error) {
      return error?.response?.data?.message;
    }
  };

  const updateUser = async (data) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("postalcode", data.postalcode);
      formData.append("country", data.country);
      formData.append("mobile", data.mobile);
      await axios.post("user/" + cookies.user.user, formData, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
    } catch (e) {
      if (e.response.status === 200) {
        console.log(e.response.data);
        // setErrors();
      }
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  //   const deleteSkill = async (id) => {
  //     if (!window.confirm("Are your sure you to delete this data?")) {
  //       return;
  //     }
  //     await axios.delete("skills/" + id);
  //     getSkills();
  //   };
  return (
    <AccountContext.Provider
      value={{
        accountEdit,
        accountEdits,
        getUser,
        // getAccounts,
        updateUser,
        onChange,
        formValues,
        setErrors,
        errors,
        // updateSkill,
        // deleteSkill,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
