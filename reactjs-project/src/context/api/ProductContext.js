import axios from "axios";
import { useCookies } from "react-cookie";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

const ProductContxt = createContext();

const initialForm = {
  name: "",
  image: "",
  descs: "",
  price: "",
  quantity: "",
  stock_inventory: "",
};

export const ProductProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialForm);
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [size1, setSize1] = useState(0);
  const [size2, setSize2] = useState(0);
  const [size3, setSize3] = useState(0);
  const [size4, setSize4] = useState(0);
  const [size5, setSize5] = useState(0);
  const [size6, setSize6] = useState(0);
  const [errors, setErrors] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [reviewProduct, setReviewProduct] = useState(0);
  const [review, setReview] = useState([]);
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getProducts = async () => {
    try {
      const all = await axios.get("product");
      setAllProducts(all.data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getHighTops = async () => {
    try {
      const all = await axios.get("product-hightops");
      setAllProducts(all.data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getMidTops = async () => {
    try {
      const all = await axios.get("product-midtops");
      setAllProducts(all.data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getLowTops = async () => {
    try {
      const all = await axios.get("product-lowtops");
      setAllProducts(all.data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const getSpecificUser = async () => {
    try {
      const all = await axios.get("product-user/" + cookies.user.user, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      setProducts(all.data);
    } catch (e) {
      if (e.all.status === 500) {
        return e?.response?.data?.message;
      }
    }
  };

  const newReview = async (data) => {
    try {
      const formData = new FormData();
      formData.append("user_id", cookies.user.user);
      formData.append("products_id", reviewProduct);
      formData.append("comment", data.comment);
      const response = await axios.post("new-review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      if (response) {
        toast.success("Success, review is added!", {
          position: "bottom-left",
        });
      }
    } catch (e) {
      if (e.response.status === 422) {
        console.log(e.response.data.errors);
        setErrors(e.response.data.errors);
        toast.error("Something Went Wrong", {
          position: "bottom-left",
        });
      }
    }
  };

  const getEditProducts = async (id) => {
    try {
      const response = await axios.get("product/" + id + "/view", {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });

      const all = await axios.get("review/" + id, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      setReview(all.data);

      const data = response.data;
      setFormValues({
        id: data.id,
        name: data.name,
        descs: data.descs,
        image: data.image,
        price: data.price,
        stock_inventory: data.stock_inventory,
        gender: data.gender,
        size_1: data.shoe_size.size_1,
        size_2: data.shoe_size.size_2,
        size_3: data.shoe_size.size_3,
        size_4: data.shoe_size.size_4,
        size_5: data.shoe_size.size_5,
        size_6: data.shoe_size.size_6,
      });
    } catch (error) {
      if (error.all.status === 500) {
        return error?.response?.data?.message;
      }
    }
  };

  const addProducts = async (data) => {
    try {
      const formData = new FormData();
      formData.append("user_id", cookies.user.user);
      formData.append("name", data.name);
      formData.append("descs", data.description);
      formData.append("gender", data.category);
      formData.append("image", file);
      formData.append("price", data.price);
      formData.append("stock_inventory", data.stock);
      formData.append("size1", size1);
      formData.append("size2", size2);
      formData.append("size3", size3);
      formData.append("size4", size4);
      formData.append("size5", size5);
      formData.append("size6", size6);
      await axios.post("product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      navigate("/profile/start-sell/view-product");
      setFormValues(initialForm);
      setSize1("");
      setSize2("");
      setSize3("");
      setSize4("");
      setSize6("");
      setFile("");
      toast.success("Success, product is added!", {
        position: "bottom-left",
      });
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
        toast.error("Something Went Wrong", {
          position: "bottom-left",
        });
      }
    }
  };

  const updateProducts = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      formData.append("_method", "PUT");
      formData.append("user_id", cookies.user.user);
      formData.append("name", formValues.name);
      formData.append("descs", formValues.descs);
      formData.append("category", category);
      formData.append("price", formValues.price);
      formData.append("stock_inventory", formValues.stock_inventory);
      formData.append("size1", size1);
      formData.append("size2", size2);
      formData.append("size3", size3);
      formData.append("size4", size4);
      formData.append("size5", size5);
      formData.append("size6", size6);
      const response = await axios.post("product/" + formValues.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      if (response) {
        navigate("/profile/start-sell/view-product");
        setFormValues(initialForm);
        setSize1("");
        setSize2("");
        setSize3("");
        setSize4("");
        setSize6("");
        setFile("");
        setCategory("");
        toast.success("Success, product is updated!", {
          position: "bottom-left",
        });
      }
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
      if (e.response.status === 500) {
        toast.error("Please complete empty fields", {
          position: "bottom-left",
        });
      }
    }
  };

  const getCart = async () => {
    try {
      const response = await axios.get("cart/" + cookies.user.user, {
        headers: {
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      const data = response.data.cartCount;
      setCartCount(data);
    } catch (error) {
      return error?.response?.data?.message;
    }
  };

  const addCart = async (data) => {
    try {
      const newQuantity = formValues.stock_inventory - data.quantity;
      const formData = new FormData();
      formData.append("user_id", cookies.user.user);
      formData.append("products_id", formValues.id);
      formData.append("quantity", data.quantity);
      formData.append("size", data.size);
      formData.append("payment", 0);
      formData.append("newQuantity", newQuantity);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("postalcode", data.postal);
      formData.append("country", data.country);
      formData.append("mobile", data.mobile);
      const response = await axios.post("cart", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      if (response) {
        toast.success("Successfully added to cart", {
          position: "bottom-left",
        });
      }
      getCart();
    } catch (e) {
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
      setErrors(errors.response.data);
    }
  };

  return (
    <ProductContxt.Provider
      value={{
        addCart,
        allProducts,
        setAllProducts,
        products,
        setProducts,
        getProducts,
        getHighTops,
        getMidTops,
        getLowTops,
        getSpecificUser,
        getEditProducts,
        getCart,
        cartCount,
        addProducts,
        updateProducts,
        onChange,
        formValues,
        errors,
        setErrors,
        file,
        setFile,
        category,
        setCategory,
        size1,
        setSize1,
        size2,
        setSize2,
        size3,
        setSize3,
        size4,
        setSize4,
        size5,
        setSize5,
        size6,
        setSize6,
        review,
        newReview,
        setReviewProduct,
        setCartCount,
      }}
    >
      {children}
    </ProductContxt.Provider>
  );
};

export default ProductContxt;
