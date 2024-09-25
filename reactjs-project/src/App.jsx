import "./App.css";
import { Route, Routes } from "react-router-dom";
import { DefaultPage, Login, Register, AboutUs, HighTops, MidTops, LowTops } from "./components";
import NoAuth from "./context/NoAuth";
import RequireAuth from "./context/RequireAuth";
import PrivateRoutes from "./routes/privateRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<NoAuth />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/high-tops" element={<HighTops />} />
          <Route path="/mid-tops" element={<MidTops />} />
          <Route path="/low-tops" element={<LowTops />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<DefaultPage />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Route>
      </Routes >
    </>
  );
}

export default App;
