import axios from "axios";
import { useCookies } from "react-cookie";
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductContxt from "./ProductContext";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { getCart } = useContext(ProductContxt);
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  const getAllCart = async () => {
    try {
      const response = await axios.get("cart/" + cookies.user.user, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const data = response.data.cart;
      setCart(data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getCartPaid = async () => {
    try {
      const response = await axios.get("cart/" + cookies.user.user + "/paid", {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const data = response.data;
      setCart(data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const payment = async (data) => {
    try {
      const response = await axios.post("payment/" + cookies.user.user, data, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      if (response && data.options === "0") {
        navigate("/");
        getCartPaid();
        toast.success("Checkout Successfully", {
          position: "bottom-left",
        });
      }
      if (response && data.options === "1") {
        toast.loading("Payment is processing", {
          position: "bottom-left",
        });
        window.location.replace(response?.data?.url);
      }
    } catch (e) {
      if (e.response.status === 422) {
        toast.error(e.response.data.data, {
          position: "bottom-left",
        });
      }

      if (e.response.status === 500) {
        toast.error("Please add items to cart", {
          position: "bottom-left",
        });
      }
    }
  };

  const deleteCart = async (id) => {
    await axios.delete("cart/" + id, {
      headers: {
        Authorization: `Bearer ${cookies.user.token}`,
      },
    });
    toast.warn("Product is remove from the cart", {
      position: "bottom-left",
    });
    getCart();
    getAllCart();
  };

  const cancelOrder = async (id) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      const cancel = await axios.post("order/" + id + "/cancel", formData, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      if (cancel) {
        toast.warn("You cancelled your order", {
          position: "bottom-left",
        });
        getCartPaid();
      }
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const completeOrder = async (id) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      const complete = await axios.post("order/" + id + "/complete", formData, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      if (complete) {
        toast.success("You revieced the item! Thank you and shop again ", {
          position: "bottom-left",
        });
        getCartPaid();
      }
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getAllCart,
        getCartPaid,
        cancelOrder,
        completeOrder,
        payment,
        deleteCart,
        errors,
        setErrors,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
