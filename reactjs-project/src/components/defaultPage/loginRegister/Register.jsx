import React, { useContext, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterAuth from "../../../context/api/RegisterUser";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Header } from "../../index";



export const Register = () => {
    const { registerUser, errors, setErrors } = useContext(RegisterAuth)

    const SignupSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required").email("Invalid email address"),
        password: yup.string().required("Password is required").min(6, 'Password must be 6+  characters'),
        confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password')], "Password must match"),
    })

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(SignupSchema), defaultValues: defaultValues });


    useEffect(() => {
        setErrors({});
    }, [])
    return (
        <>
            <Header />
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-screen">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-black">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </h1>
                            <form onSubmit={handleSubmit(registerUser)} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <Controller
                                        name={'name'}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Name'
                                                variant="outlined"
                                                value={field.value}
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <span className="text-sm text-red-400">{errors.name[0]}</span>
                                    )}
                                </div>
                                <div>
                                    <Controller
                                        name={'email'}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Email'
                                                variant="outlined"
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
                                                fullWidth
                                                type='password'
                                                label='Password'
                                                variant="outlined"
                                                value={field.value}
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <span className="text-sm text-red-400">{errors.password[0]}</span>
                                    )}
                                </div>
                                <div>
                                    <Controller
                                        name={'confirmPassword'}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                type='password'
                                                label='Confirm Password'
                                                variant="outlined"
                                                value={field.value}
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <button type="submit" className="w-full text-white bg-black hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section >

        </>
    );
}