import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, Outlet, useParams } from 'react-router-dom'
import { Header } from '../../index'
import AccountContext from "../../../context/api/AccountContext";
import logo from '../../../Jumpman_logo.png'

export const Profile = () => {
    const [cookies] = useCookies(["user"]);
    const { formValues, onChange, accountEdit, getUser, setErrors } = useContext(AccountContext);
    let { id } = useParams();

    useEffect(() => {
        getUser(id);
        setErrors({});
    }, [])
    return (
        <>
            <Header />
            <div className='h-screen '>
                <div className=" mt-20 mx-24">
                    <div className="container mx-auto py-8">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                            <div className="col-span-4 sm:col-span-3">
                                <div className="bg-white border border-black shadow rounded-lg p-6">
                                    <div className="flex flex-col items-center">
                                        <img src={logo} alt='Profile' className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />

                                        {/* <input disabled id="name" name="name" onChange={onChange} value={formValues["account_name"] || ''} type="text" className="text-xl font-bold text-black bg-white text-center" /> */}
                                    </div>
                                    <hr className="my-6 border-t border-gray-300" />
                                    <div className="flex flex-col">
                                        <ul>
                                            <Link to="purchase">
                                                <li className="hover:border-black hover:border-b p-2 mb-2 hover:cursor-pointer">
                                                    My Purchases
                                                </li>
                                            </Link>
                                            <Link to="start-sell">
                                                <li className="hover:border-black hover:border-b p-2 mb-2 hover:cursor-pointer">
                                                    Start selling
                                                </li>
                                            </Link>
                                            <Link to={`account/${cookies.user.user}/setting`}>
                                                {/* <Link to="account"> */}
                                                <li className="hover:border-black hover:border-b p-2 mb-2 hover:cursor-pointer">
                                                    Account Setting
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 sm:col-span-9">
                                <Outlet />
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}