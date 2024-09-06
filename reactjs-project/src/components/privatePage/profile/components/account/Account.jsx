import React, { useContext, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import AccountContext from "../../../../../context/api/AccountContext";
import { TextField } from "@mui/material";

export const Account = () => {
    const { formValues, onChange, accountEdit, getUser, updateUser, errors, setErrors } = useContext(AccountContext);
    let { id } = useParams();

    const ProductSchema = yup.object({
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        postalcode: yup.string().required("City is required"),
        country: yup.string().required("City is required"),
        mobile: yup.string().required("Mobile phone is Required").matches(/^(09|\+639)\d{9}$/, 'PH number is incorrect')
    })

    const defaultValues = {
        address: '',
        city: '',
        postalcode: '',
        country: '',
        mobile: '',
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(ProductSchema), defaultValues: defaultValues });


    useEffect(() => {
        getUser(id);
        setErrors({});
    }, [])

    return (
        <section className="max-w-full p-6 mx-auto rounded-lg border border-black max-h-full">
            <h1 className="text-xl font-bold text-black capitalize">Account Setting</h1>
            <form onSubmit={handleSubmit(updateUser)}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">

                    <div>
                        <label className="text-black" htmlFor="name">Name</label>
                        <Controller
                            name={'name'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    placeholder={formValues.name}
                                    fullWidth
                                    value={formValues.name}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>
                    {errors.name && (
                        <span className="text-sm text-red-400">{errors.name[0]}</span>
                    )}

                    <div>
                        <label className="text-black" htmlFor="email">Email</label>
                        <Controller
                            name={'email'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    placeholder={formValues.email}
                                    fullWidth
                                    value={formValues.email}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>
                    {errors.name && (
                        <span className="text-sm text-red-400">{errors.email[0]}</span>
                    )}

                    <div>
                        <label className="text-black" htmlFor="address2">Address</label>
                        <Controller
                            name={'address'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    placeholder={formValues.address}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="city">City</label>
                        <Controller
                            name={'city'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    placeholder={formValues.city}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="postal">Postal Code</label>
                        <Controller
                            name={'postalcode'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    placeholder={formValues.postal}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="country">Country</label>
                        <Controller
                            name={'country'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    placeholder={formValues.country}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="mobile">Mobile Number</label>
                        <Controller
                            name={'mobile'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    placeholder='+639 PH Mobile No.'
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-black">
                            Image
                        </label>

                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-black border-dashed rounded-md">
                            <div className="space-y-1 text-center">

                                <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span className="">Upload a file</span>

                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />

                                    </label>

                                    <p className="pl-1 text-black">or drag and drop</p>

                                </div>

                                <p className="text-xs text-black">
                                    PNG, JPG, GIF up to 10MB
                                </p>

                            </div>

                        </div>

                    </div> */}

                </div>

                <div className="flex justify-end mt-6">
                    <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md hover:border-black hover:bg-white hover:text-black border  focus:outline-none focus:bg-gray-600">Save</button>
                </div>
            </form>
        </section>
    )

}