import { useEffect, useContext } from 'react';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import AdminContext from '../../../context/api/AdminContext';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

export const Dashboard = () => {
    const { data, getData, getCompleteOrders, getPendingOrders, pendingOrders, completeOrders, setPendingPage, pendingPage, setCompletePage, completePage } = useContext(AdminContext);
    moment.tz.setDefault("Asia/Manila");
    useEffect(() => {
        getData();
        getCompleteOrders();
        getPendingOrders();
    }, [completePage, pendingPage]);
    const completeLink = async (link) => {
        try {
            const url = new URL(link);
            setCompletePage(url.searchParams.get('page'));
        } catch (e) {
            toast.warn("Invalid Command", {
                position: "bottom-left",
            });
        }
    }
    const pendingLink = async (link) => {
        try {
            const url = new URL(link);
            setPendingPage(url.searchParams.get('page'));
        } catch (e) {
            toast.warn("Invalid Command", {
                position: "bottom-left",
            });
        }
    }
    const doc = new jsPDF();
    const total = data.revenue;
    const exportPdfHandler = async () => {
        doc.autoTable({
            html: '#complete-orders',
            didDrawPage: function (data) {
                doc.text("Report: Total Revenue = $" + total, data.settings.margin.left + 15, 10);
            }
        });
        doc.save('Data.pdf')
    }
    return (
        <>
            <div className="mt-10 ml-72 ">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold font-mono">Dashboard</h1>
                    <div className='flex flex-wrap mt-4'>
                        <div className="w-60 mr-5">
                            <Link to="/admin/user">
                                <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">User(s)</p>
                                        <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.countNotAdmin}</p>
                                        <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Total  Users (Admin: {data.countAdmin})</p>
                                    </div >
                                </div >
                            </Link>
                        </div >

                        <div className="w-60 mr-5">
                            <Link to="/admin/products">
                                <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Products</p>
                                        <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.productCount}</p>
                                        <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Total Products</p>
                                    </div >
                                </div >
                            </Link>
                        </div >

                        <div className="w-60 mr-5">
                            <Link to="/admin/sale">
                                <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Completed Orders</p>
                                        <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.orderDone} </p>
                                        <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Completed Orders</p>
                                    </div >
                                </div >
                            </Link>
                        </div >

                        <div className="w-60 mr-5">
                            <Link to="/admin/sale">
                                <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Pending Orders</p>
                                        <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.orderPending}</p>
                                        <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Total Orders</p>
                                    </div >
                                </div >
                            </Link>
                        </div >

                        <div className="w-60 mr-5">
                            <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Revenue</p>
                                    <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">$ {data.revenue}</p>
                                    <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Total Revenue</p>
                                </div >
                            </div >
                        </div >

                    </div>
                </div>
                <div className="mb-4">
                    <div className='flex flex-wrap mt-4'>
                        <div className="mr-5 mb-4" >
                            <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                                <div className="flex flex-col justify-between p-4 leading-normal">

                                    <div className='flex justify-between mb-2'>
                                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Complete Orders</p>
                                        <button onClick={exportPdfHandler} className="px-2 py-2 bg-black text-white rounded-lg">Download this table</button>
                                    </div>

                                    <table id="complete-orders" className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    No.
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Buyer Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Product Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Total
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date Completed
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                completeOrders.data?.map((completeOrders) => {
                                                    return (
                                                        <tr key={completeOrders.id} className="bg-white border-b item-center dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {completeOrders.order_details.id}
                                                            </th>
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {completeOrders.user.name}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {completeOrders.product[0].name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {completeOrders.order_details.total}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {completeOrders.quantity}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {completeOrders.order_details.updated_at.slice(0, 10)}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                        </tbody>
                                    </table>
                                    <nav aria-label="Page navigation example" className="my-4 flex justify-end">
                                        <ul className="flex items-center -space-x-px h-10 text-base">
                                            {
                                                completeOrders.links?.map(completeOrders => (
                                                    <li key={completeOrders.label} onClick={() => completeLink(completeOrders.url)} className="hover:cursor-pointer">
                                                        <p className={completeOrders.active === true ? "flex items-center justify-center px-4 h-10 leading-tight text-white bg-black border border-gray-300 hover:bg-gray-100 hover:text-gray-700 " : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "}>
                                                            {completeOrders.label.replace('&laquo;', '<').replace('&raquo;', '>')}
                                                        </p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </nav>
                                </div >
                            </div >
                        </div >

                        <div className="mr-5 mb-4" >
                            <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Pending Orders</p>
                                    <table className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    No.
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Buyer Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Product Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Total
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date Checkout
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pendingOrders.data?.map((pendingOrders) => {
                                                    return (
                                                        <tr key={pendingOrders.id} className="bg-white border-b item-center dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {pendingOrders.order_details.id}
                                                            </th>
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {pendingOrders.user.name}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {pendingOrders.product[0].name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {pendingOrders.order_details.total}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {pendingOrders.quantity}
                                                            </td>

                                                            <td className="px-6 py-4 my-2">
                                                                {pendingOrders.order_details.created_at.slice(0, 10)}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                        </tbody>
                                    </table>
                                    <nav aria-label="Page navigation example" className="my-4 flex justify-end">
                                        <ul className="flex items-center -space-x-px h-10 text-base">
                                            {
                                                pendingOrders.links?.map(pendingOrders => (
                                                    <li key={pendingOrders.label} onClick={() => pendingLink(pendingOrders.url)} className="hover:cursor-pointer">
                                                        <p className={pendingOrders.active === true ? "flex items-center justify-center px-4 h-10 leading-tight text-white bg-black border border-gray-300 hover:bg-gray-100 hover:text-gray-700 " : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "}>
                                                            {pendingOrders.label.replace('&laquo;', '<').replace('&raquo;', '>')}
                                                        </p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </nav>
                                </div >
                            </div >
                        </div >
                    </div>
                </div >

            </div >
        </>
    )
}