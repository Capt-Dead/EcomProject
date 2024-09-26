import { Link, Outlet } from "react-router-dom"

export const Purchase = () => {

    return (
        <>
            <div className="p-6">
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <Link to="checkout-items">
                            <li className="block py-2 px-3 text-gray-900 rounded border border-black">Checkout Items</li>
                        </Link>
                        <Link to="shipped-orders">
                            <li className="block py-2 px-3 text-gray-900 rounded border border-black">Shipped</li>
                        </Link>
                        <Link to="complete-purchases">
                            <li className="block py-2 px-3 text-gray-900 rounded border border-black">Completed</li>
                        </Link>
                        <Link to="cancelled-orders">
                            <li className="block py-2 px-3 text-gray-900 rounded border border-black">Cancelled</li>
                        </Link>

                    </ul >
                </div >
            </div >
            <Outlet />
        </>
    )
}