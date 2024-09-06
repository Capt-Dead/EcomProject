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
  const [productEdit, setProductEdit] = useState([]);
  const [errors, setErrors] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
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
        console.log(e);
        setErrors(e);
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
        console.log(e);
        setErrors(e);
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
      const data = response.data;
      // setProductEdit(data);
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
        console.log(error.all);
        setErrors(error);
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
      const response = await axios.post("product", formData, {
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
        toast.success("Success, product is added!", {
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
      console.log(e.response);
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
      const response = await axios.post("product/" + productEdit.id, formData, {
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

  const addCart = async (data) => {
    try {
      const newQuantity = formValues.stock_inventory - data.quantity;
      const formData = new FormData();
      formData.append("user_id", cookies.user.user);
      formData.append("products_id", formValues.id);
      formData.append("quantity", data.quantity);
      formData.append("size", data.size);
      formData.append("newQuantity", newQuantity);
      const response = await axios.post("cart", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.user.token}`,
        },
      });
      getEditProducts(formValues.id);
      if (response) {
        toast.success("Successfully added to cart", {
          position: "bottom-left",
        });
      }
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
        getSpecificUser,
        getEditProducts,
        productEdit,
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
      }}
    >
      {children}
    </ProductContxt.Provider>
  );
};

export default ProductContxt;
