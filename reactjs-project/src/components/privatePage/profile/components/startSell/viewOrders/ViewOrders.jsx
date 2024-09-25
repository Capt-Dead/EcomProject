import { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
// import AdminContext from '../../../context/api/AdminContext';
import { FormControl, NativeSelect } from '@mui/material';

export const ViewOrders = () => {
    // const { allSales, getData } = useContext(AdminContext);
    // useEffect(() => {
    //     getData();
    // }, []);
    return (
        <>
            <div className="w-fill">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold font-mono">Customers Orders</h1>
                </div>
                <table className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Buyer ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product ID
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

                        </tr>
                    </thead>
                    {/* <tbody>
                        {
                            allSales.map((allSales) => {
                                return (
                                    <tr key={allSales.id} className="bg-white border-b item-center dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {allSales.user_id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {allSales.products_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allSales.order_details.total}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allSales.quantity}
                                        </td>

                                        {
                                            allSales.order_details.payment_details === 1 ? (
                                                <td className="px-6 py-4">
                                                    Card
                                                </td>
                                            ) : (
                                                <td className="px-6 py-4">
                                                    COD
                                                </td>
                                            )
                                        }

                                        <td className="px-6 py-4">
                                            <FormControl fullWidth>
                                                <NativeSelect
                                                    defaultValue={allSales.order_details.status === 1 ? '1' : '0'}
                                                >
                                                    <option value={0}>On the way</option>
                                                    <option value={1}>Done</option>
                                                </NativeSelect>
                                            </FormControl>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody> */}
                </table >
            </div >
        </>
    )
}