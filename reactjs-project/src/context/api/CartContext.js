import axios from "axios";
import { useCookies } from "react-cookie";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cookies] = useCookies(["user"]);

  const getCart = async () => {
    try {
      const response = await axios.get("cart/" + cookies.user.user, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });

      const data = response.data;
      setCart(data);
    } catch (error) {
      if (error.all.status === 500) {
        console.log(error.all);
        setErrors(error);
      }
    }
  };

  const payment = async (data) => {
    const response = await axios.post("payment/" + cookies.user.user, {
      headers: {
        Authorization: `Bearer ${cookies.user.token}`,
      },
    });
    window.location.replace(response?.data?.url);
    toast.loading("Payment is processing", {
      position: "bottom-left",
    });
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
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
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
