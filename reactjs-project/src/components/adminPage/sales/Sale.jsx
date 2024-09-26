import { useEffect, useContext, useState } from 'react';
import { toast } from "react-toastify";
import AdminContext from '../../../context/api/AdminContext';
import { FormControl, NativeSelect } from '@mui/material';

export const Sale = () => {
    const { allSales, data, getSale, getData, updateStatus, setStatus, setPage, page } = useContext(AdminContext);
    const [dataPage, setDataPage] = useState();

    useEffect(() => {
        // console.log(dataPage === 0)
        dataPage === 0 ? getSale(dataPage) : dataPage === 1 ? getSale(dataPage) : dataPage === 2 ? getSale(dataPage) : dataPage === 3 ? getSale(dataPage) : getSale();
        getData();
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
                        <h1 className="text-2xl font-bold font-mono">Customers Orders</h1>
                        <button className="text-2xl font-bold font-mono ml-2" onClick={() => { setDataPage(4); getSale(4) }} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                    </div>
                    <div className='flex flex-wrap mt-4'>
                        <div className="w-60 mr-5">
                            <div onClick={() => { setDataPage(2); getSale(2) }} className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 hover:cursor-pointer">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Pending Orders</p>
                                    <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.orderPending}</p>
                                    <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Pending Orders</p>
                                </div >
                            </div >
                        </div >

                        <div onClick={() => { setDataPage(0); getSale(0) }} className="w-60 mr-5">
                            <div to="/admin/user" className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 hover:cursor-pointer ">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Shipped Orders</p>
                                    <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.orderOTW}</p>
                                    <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Shipped Orders</p>
                                </div >
                            </div >
                        </div >

                        <div className="w-60 mr-5">
                            <div onClick={() => { setDataPage(1); getSale(1) }} to="/admin/user" className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 hover:cursor-pointer ">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Completed Orders</p>
                                    <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.orderDone} </p>
                                    <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Completed Orders</p>
                                </div >
                            </div >
                        </div >

                        <div onClick={() => { setDataPage(3); getSale(3) }} className="w-60 mr-5">
                            <div to="/admin/user" className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 hover:cursor-pointer ">
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">Cancelled Orders</p>
                                    <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.orderCancel}</p>
                                    <p className="mb-2 text-sm font-bold tracking-tight text-gray-400">Cancelled Orders</p>
                                </div >
                            </div >
                        </div >
                    </div>

                </div>
                <table className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order No.
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
                                Payment Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSales?.data?.map((allSales) => {
                                return (
                                    <tr key={allSales.id} className="bg-white border-b item-center dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {allSales.order_details.id}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {allSales.user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {allSales.product[0].name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allSales.order_details.total}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allSales.quantity}
                                        </td>

                                        {
                                            allSales.order_details.payment_details === 0 ? (
                                                <td className="px-6 py-4">
                                                    Card
                                                </td>
                                            ) : (
                                                <td className="px-6 py-4">
                                                    COD
                                                </td>
                                            )
                                        }

                                        <td className="px-6 py-4 my-2">
                                            <FormControl fullWidth>
                                                <NativeSelect
                                                    defaultValue={allSales.order_details.status === 2 ? '2' : allSales.order_details.status === 1 ? '1' : allSales.order_details.status === 0 ? "0" : allSales.order_details.status === 3 ? "3" : ""}
                                                    disabled={allSales.order_details.status === 3 ? true : allSales.order_details.status === 1 ? true : false}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    {/* onClick={() => updateStatus()} */}
                                                    <option value={0}>On Delivery</option>
                                                    <option className="invisible" value={1}>Done</option>
                                                    <option value={2}>Pending</option>
                                                    <option className="invisible" value={3}>Cancel</option>
                                                </NativeSelect>
                                            </FormControl>
                                        </td>
                                        <td className='px-6 py-4'>
                                            {allSales.order_details.updated_at.slice(0, 10)}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <button disabled={allSales.order_details.status === 3 ? true : allSales.order_details.status === 1 ? true : false} onClick={() => updateStatus(allSales.order_details.id)} className='bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800'>Update</button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table >
                <nav aria-label="Page navigation example" className="my-4 flex justify-end">
                    <ul className="flex items-center -space-x-px h-10 text-base">
                        {
                            allSales?.links?.map(allSales => (
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
    )
}