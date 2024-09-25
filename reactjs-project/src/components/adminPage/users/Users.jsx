import React, { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import AdminContext from '../../../context/api/AdminContext';
import { TextField, FormHelperText } from "@mui/material";

export const Users = () => {
    const { allUsers, getData } = useContext(AdminContext);

    const SearchSchema = yup.object({
        search: yup.string().required("Input details is required"),
    })

    const defaultValues = {
        search: '',
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(SearchSchema), defaultValues: defaultValues });

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="w-4/5 mt-10 ml-72 ">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold font-mono">Users Location</h1>
                </div>
                <form className="max-w-md mx-auto mb-4" onSubmit={handleSubmit(getData)}>
                    <div className="relative">
                        <Controller
                            name={'search'}
                            control={control}
                            placeholder="Search"
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                />
                            )}
                        />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                </form>
                <table className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                City
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Postal Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((allUsers) => {
                                return (
                                    <tr key={allUsers.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {allUsers.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {allUsers.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allUsers.address.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allUsers.address.city}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allUsers.address.postal_code}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allUsers.address.mobile_no}
                                        </td>
                                        <td className="px-6 py-4">
                                            {allUsers.created_at.slice(0, 10)}
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </>
    )
}