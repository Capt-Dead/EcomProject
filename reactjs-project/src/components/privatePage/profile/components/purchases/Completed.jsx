import { Link } from "react-router-dom"
import logo from '../../../../../Jumpman_logo.png'

export const Completed = () => {
    return (
        <div className="col-span-4 sm:col-span-9">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">My Purchases</h2>
                <hr className="my-6 border-t border-gray-300" />
                <div className='flex mx-10 justify-center'>
                    <div className='flex items-center'>
                        <div className="relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                            <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to="#">
                                <img className="object-cover" src={logo} alt="product_2" />
                            </Link>
                            <div className="mt-4 px-5 pb-5">
                                <Link to="#">
                                    <h5 className="text-xl tracking-tight text-slate-900">Nike Air MX Super 2500 - Red</h5>
                                </Link>
                                <div className="mt-2 mb-5 flex items-center justify-between">
                                    <p>
                                        <span className="text-3xl font-bold text-slate-900">$449</span>
                                    </p>
                                </div>
                                <p className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white">
                                    Completed
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                            <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to="#">
                                <img className="object-cover" src={logo} alt="product_3" />
                            </Link>
                            <div className="mt-4 px-5 pb-5">
                                <Link to="#">
                                    <h5 className="text-xl tracking-tight text-slate-900">Nike Air MX Super 2500 - Red</h5>
                                </Link>
                                <div className="mt-2 mb-5 flex items-center justify-between">
                                    <p>
                                        <span className="text-3xl font-bold text-slate-900">$449</span>
                                    </p>
                                </div>
                                <p className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white">
                                    Completed
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                            <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to="#">
                                <img className="object-cover" src={logo} alt="product_4" />
                            </Link>
                            <div className="mt-4 px-5 pb-5">
                                <Link to="#">
                                    <h5 className="text-xl tracking-tight text-slate-900">Nike Air MX Super 2500 - Red</h5>
                                </Link>
                                <div className="mt-2 mb-5 flex items-center justify-between">
                                    <p>
                                        <span className="text-3xl font-bold text-slate-900">$449</span>
                                    </p>
                                </div>
                                <p className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white">
                                    Completed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}