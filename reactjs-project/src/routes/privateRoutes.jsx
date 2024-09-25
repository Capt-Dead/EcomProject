import { Route, Routes } from "react-router-dom";
import { PaymentInvoice, Cart, DefaultPage, Product, Profile, Wishlist, Account, Purchase, Completed, Cancelled, ToPay, StartSelling, AddProduct, EditProduct, ViewProduct, Sale, AdminIndex, Dashboard, Users, Products, ViewOrders, HighTops, MidTops, LowTops, AboutUs, Error } from "../components";

const
    PrivateRoutes = () => {
        const routes = [
            {
                name: "Error Page",
                path: "/*",
                component: () => <Error page={"Error"} />,
            },
            {
                name: "About us Page",
                path: "/home/about-us",
                component: () => <AboutUs page={"About-us"} />,
            },
            {
                name: "High Tops Page",
                path: "/home/high-tops",
                component: () => <HighTops page={"High-Tops"} />,
            },
            {
                name: "Mid Tops Page",
                path: "/home/mid-tops",
                component: () => <MidTops page={"Mid-Tops"} />,
            },
            {
                name: "Low Tops Page",
                path: "/home/low-tops",
                component: () => <LowTops page={"Low-Tops"} />,
            },
            {
                name: "Default Page",
                path: "/home",
                component: () => <DefaultPage page={"home"} />,
            },
            {
                name: "Product Page",
                path: "/product/:id",
                component: () => <Product page={"product-view"} />,
            },
            {
                name: "Cart Page",
                path: "/shop-cart",
                component: () => <Cart page={"shop-cart"} />,
            },
            {
                name: "Wishlist Page",
                path: "/wishlist",
                component: () => <Wishlist page={"wishlist"} />,
            },
            {
                name: "Add Product Page",
                path: "/profile/start-sell/add-products",
                component: () => <Product page={"add-product"} />,
            },
            {
                name: "Payment Options",
                path: "/payment/success",
                component: () => <PaymentInvoice page={"payment"} />,
            },
        ];

        return (
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))
                }
                <Route path="/admin" element={<AdminIndex />} >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="sale" element={<Sale />} />
                    <Route path="user" element={<Users />} />
                    <Route path="products" element={<Products />} />
                </Route>
                <Route path="profile" element={<Profile />}>
                    <Route path="purchase" element={<Purchase />}>
                        <Route path="complete-purchases" element={<Completed />} />
                        <Route path="cancelled-orders" element={<Cancelled />} />
                        <Route path="checkout-items" element={<ToPay />} />
                    </Route>
                    <Route path="start-sell" element={<StartSelling />} />
                    <Route path="start-sell/add-product" element={<AddProduct />} />
                    <Route path="start-sell/view-product" element={<ViewProduct />} />
                    <Route path="start-sell/view-orders" element={<ViewOrders />} />
                    <Route path="start-sell/:id/edit" element={<EditProduct />} />

                    <Route path="account/:id/setting" element={<Account />} />
                </Route>
            </Routes>
        )
    }
export default PrivateRoutes;