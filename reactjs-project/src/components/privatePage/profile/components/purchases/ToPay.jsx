import { useContext, useEffect } from 'react';
import { Link } from "react-router-dom"
import CartContext from "../../../../../context/api/CartContext"

export const ToPay = () => {
    const { cart, getCartPaid, cancelOrder, setErrors } = useContext(CartContext);
    useEffect(() => {
        getCartPaid()
        setErrors({});
    }, [])

    return (
        <div className="col-span-4 sm:col-span-9">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Checkout Items</h2>
                <hr className="my-6 border-t border-gray-300" />
                <div className='flex flex-wrap mx-10 justify-center'>
                    {
                        cart.map((cart) => {
                            return (
                                <div key={cart.id} className='flex items-center' >
                                    {
                                        cart.order_details.status === 2 ?
                                            <div className="relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                                <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to={`/product/${cart.product[0].id}`} >
                                                    <img className="object-cover" src={`http://laravel-project.test:8080/storage/${cart.product[0].image}`} alt="product_2" />
                                                </Link>
                                                <div className="mt-4 px-5 pb-5">
                                                    <Link to={`/product/${cart.product[0].id}`} >
                                                        <h5 className="text-xl tracking-tight text-slate-900">{cart.product[0].name}</h5>
                                                    </Link>
                                                    <div className="mt-2 mb-5 flex items-center justify-between">
                                                        <p>
                                                            <span className="text-xl font-bold text-slate-900">${cart.product[0].price} |  Qty: {cart.quantity} <br /> </span>
                                                            <span className="text-xl font-bold text-slate-900">Payment: {cart.order_details.payment_details === 0 ? "COD" : "Card"}</span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                        Status: {cart.order_details.status === 2 ? 'Pending' : cart.order_details.status === 1 ? 'Done' : cart.order_details.status === 0 ? "On Delivery" : ""}
                                                    </div>
                                                    <button onClick={() => cancelOrder(cart.order_details.id)} type="button" className="py-2 px-3 w-full text-gray-900 rounded border border-black text-center mt-4">Cancel Order?</button>
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}