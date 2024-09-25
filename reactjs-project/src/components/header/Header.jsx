import React, { useRef, useState, useContext, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import logo from '../../Jumpman_logo.png';
import { LogoutAuth } from "../../context/api/LogoutAuth";
import AccountContext from "../../context/api/AccountContext";
import ProductContxt from "../../context/api/ProductContext";


export const Header = () => {
    const [cookies] = useCookies(["user"]);
    const userCookie = new Cookies();
    const [open, setOpen] = useState(false);
    const btnRef = useRef();
    const menuRef = useRef();
    const { getUser, setErrors } = useContext(AccountContext);
    const { getCart, cartCount } = useContext(ProductContxt);
    let { id } = useParams();

    useEffect(() => {
        getUser(id);
        getCart();
        setErrors({});
    }, [])

    window.addEventListener('click', (e) => {
        if (e.target !== menuRef.current && e.target !== btnRef.current) {
            setOpen(false);
        }
    });


    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Jumpman_logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Jumpman</span>
                    </Link>

                    {
                        cookies?.user?.token ?
                            (
                                <>
                                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                        <div className="flex gap-4 mr-4">
                                            <img ref={btnRef} onClick={() => setOpen(!open)} className="w-10 h-10 rounded-full border-black border hover:cursor-pointer" src={logo} alt="" />
                                            {open && (
                                                <div ref={menuRef} className="bg-white border border-black p-2 w-36 rounded shadow-lg absolute z-10 top-16">
                                                    <ul className="py-2 text-sm text-black ">
                                                        <Link to="/profile" >
                                                            <li onClick={() => setOpen(false)} className="p-2 text-base rounded cursor-pointer hover:bg-black hover:text-white">
                                                                My Profile
                                                            </li>
                                                        </Link>
                                                        <button onClick={() => LogoutAuth(userCookie, cookies)} className="p-2 w-full rounded cursor-pointer hover:bg-black hover:text-white">
                                                            <li className="text-base text-left">Logout</li>
                                                        </button>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        <Link to="/shop-cart" className="relative inline-flex text-black border border-black hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartCount}</div>
                                        </Link>
                                    </div>
                                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                                            <li>
                                                <Link to="/home/high-tops" className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:hover:underline md:p-0" aria-current="page">High Tops</Link>
                                            </li>
                                            <li>
                                                <Link to="/home/mid-tops" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline md:p-0">Mid Tops</Link>
                                            </li>
                                            <li>
                                                <Link to="/home/low-tops" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline md:p-0">Low Tops</Link>
                                            </li>
                                            <li>
                                                <Link to="/home/about-us" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline md:p-0">About us</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                        <div className="flex gap-4 mr-4">
                                            <Link to="/login" className="text-white bg-black hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4">Login / Register</Link>
                                        </div>
                                    </div>
                                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                                            <li>
                                                <Link to="/high-tops" className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:hover:underline md:p-0" aria-current="page">High Tops</Link>
                                            </li>
                                            <li>
                                                <Link to="/mid-tops" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline md:p-0">Mid Tops</Link>
                                            </li>
                                            <li>
                                                <Link to="/low-tops" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline md:p-0">Low Tops</Link>
                                            </li>
                                            <li>
                                                <Link to="/about-us" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline md:p-0">About us</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                </div>
            </nav >
        </>
    );
}