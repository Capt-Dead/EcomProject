import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

const AdminContext = createContext();

export const AdminProdvider = ({ children }) => {
  const [cookies] = useCookies(["user"]);
  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [completePage, setCompletePage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const [status, setStatus] = useState();
  const [errors, setErrors] = useState([]);

  const getData = async (data) => {
    try {
      const response = await axios.post("admin", data, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const all = response.data;
      const users = response.data.allUser;
      setData(all);
      setAllUsers(users);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getSale = async (status) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      const saleData = await axios.post("sale?page=" + page, formData, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const data = saleData.data;
      setAllSales(data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getProducts = async () => {
    try {
      const productsData = await axios.get("all-products?page=" + page, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const data = productsData.data;
      setAllProducts(data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getCompleteOrders = async () => {
    try {
      const complete = await axios.get("complete-orders?page=" + completePage, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const data = complete.data;
      setCompleteOrders(data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getPendingOrders = async () => {
    try {
      const pending = await axios.get("pending-orders?page=" + pendingPage, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const data = pending.data;
      setPendingOrders(data);
      setAllSales(data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const updateStatus = async (id) => {
    try {
      if (status) {
        if (status === 0)
          toast.success("Status updated, Product is on Delivery", {
            position: "bottom-left",
          });
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("status", status);
        const update = await axios.post("update-status/" + id, formData, {
          headers: {
            Authorization: `Bearer ${cookies.user.token}`,
          },
        });
        getData();
      }
    } catch (e) {
      if (e.all.status === 422) {
        console.log(e?.response?.data?.message);
        return e?.response?.data?.message;
      }
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getData,
        getSale,
        getProducts,
        updateStatus,
        getCompleteOrders,
        getPendingOrders,
        pendingOrders,
        completeOrders,
        page,
        pendingPage,
        completePage,
        data,
        allProducts,
        allUsers,
        allSales,
        errors,
        setAllSales,
        setPendingPage,
        setCompletePage,
        setPage,
        setStatus,
        setErrors,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
