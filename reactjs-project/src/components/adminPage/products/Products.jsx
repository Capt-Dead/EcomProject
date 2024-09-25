import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import AdminContext from "../../../context/api/AdminContext";

export const Products = () => {
    const { allProducts, getProducts, setPage, page } = useContext(AdminContext);
    useEffect(() => {
        getProducts();
    }, [page]);
    const paginateLink = async (link) => {
        try {
            const url = new URL(link);
            setPage(url.searchParams.get('page'));
        } catch (e) {
            toast.warn("Invalid Command", {
                position: "bottom-left",
            });
        }
    }
    return (
        <>
            <div className="w-4/5 mt-10 ml-72 ">
                <div className="mb-4">
                    <div className="flex">
                        <h1 className="text-2xl font-bold font-mono">Products</h1>
                        <button className="text-2xl font-bold font-mono ml-2" onClick={() => setPage(1)} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                    </div>
                </div>
                <table className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Owner
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                SKU
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.data?.map((allProducts) => {
                            return (

                                <tr
                                    key={allProducts.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {allProducts.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {allProducts.name}
                                    </td>
                                    {/* <td className="px-6 py-4">{allProducts.user_id}</td> */}
                                    <td className="px-6 py-4">{allProducts.SKU}</td>
                                    <td className="px-6 py-4">{allProducts.stock_inventory}</td>
                                    <td className="px-6 py-4">${allProducts.price}</td>
                                    <td className="px-6 py-4">
                                        <img className="w-16" src={`http://laravel-project.test:8080/storage/${allProducts.image}`} alt="" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example" className="my-4 flex justify-end">
                    <ul className="flex items-center -space-x-px h-10 text-base">
                        {
                            allProducts.links?.map(allSales => (
                                <li key={allSales.label} onClick={() => paginateLink(allSales.url)} className="hover:cursor-pointer">
                                    <p className={allSales.active === true ? "flex items-center justify-center px-4 h-10 leading-tight text-white bg-black border border-gray-300 hover:bg-gray-100 hover:text-gray-700 " : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "}>
                                        {allSales.label.replace('&laquo;', '<').replace('&raquo;', '>')}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div >
        </>
    );
};
