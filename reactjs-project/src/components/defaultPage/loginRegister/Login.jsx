
import React, { useContext, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import LoginAuth from "../../../context/api/LoginAuth";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Header } from "../../index";

export const Login = () => {
    const { getUser, errors, setErrors } = useContext(LoginAuth)

    const SigininSchema = yup.object({
        email: yup.string().required("Email is required").email("Invalid email address"),
        password: yup.string().required("Password is required").min(6, 'Password must be 6+  characters'),
    })

    const defaultValues = {
        email: '',
        password: ''
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(SigininSchema), defaultValues: defaultValues });

    useEffect(() => {
        setErrors({});
    }, [])
    return (
        <>
            <section className="">
                <Header />
                <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 min-h-screen">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-black">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit(getUser)} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <Controller
                                        name={'email'}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                label='Email'
                                                variant="outlined"
                                                fullWidth
                                                value={field.value}
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <span className="text-sm text-red-400">{errors.email[0]}</span>
                                    )}
                                </div>
                                <div>
                                    <Controller
                                        name={'password'}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                type='password'
                                                label='Password'
                                                variant="outlined"
                                                fullWidth
                                                value={field.value}
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <span className="text-sm text-red-400">{errors.password[0]}</span>
                                    )}
                                    {errors && (
                                        <span className="text-sm text-red-400">{errors[1]}</span>

                                    )}
                                </div>
                                {/* <Button variant="contained" fullWidth >Sign in</Button> */}
                                <button type="submit" className="w-full text-white bg-black hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p className="text-sm font-light text-gray-500">
                                    Don't have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}