import { Header } from '../../index'
import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import ProductContxt from '../../../context/api/ProductContext';

export const HighTops = () => {
    const { allProducts, getHighTops } = useContext(ProductContxt);
    useEffect(() => {
        getHighTops();
    }, []);

    return (
        <>
            <div className="h-screen">
                <Header />
                <div className='mx-24 mb-auto'>
                    <div className='ms-8 mt-20 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8'>
                        <p className='text-2xl'>High Tops Products</p>
                    </div>
                    <div className='flex flex-wrap mx-10 justify-center'>

                        {allProducts.map((allProducts) => {
                            return (
                                <div key={allProducts.id}>
                                    <div className='flex items-center'>
                                        <div className="relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                            <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to={`/product/${allProducts.id}`}>
                                                <img className="object-cover" src={`http://laravel-project.test:8080/storage/${allProducts.image}`} alt='Product_Image' />
                                            </Link>
                                            <div className="mt-4 px-5 pb-5">
                                                <Link to={`/product/${allProducts.id}`}>
                                                    <h5 className="text-xl tracking-tight text-slate-900">{allProducts.name}</h5>
                                                </Link>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p>
                                                        <span className="text-3xl font-bold text-slate-900">${allProducts.price}</span>
                                                    </p>
                                                </div>
                                                {allProducts.stock_inventory === 0 ? (
                                                    <button disabled className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                        Out of Stock
                                                    </button>
                                                ) :
                                                    (
                                                        <Link to={`/product/${allProducts.id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            Add to cart
                                                        </Link>
                                                    )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div >
        </>
    );
}