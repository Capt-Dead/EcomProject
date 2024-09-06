import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import ProductContxt from "../../../../../../context/api/ProductContext";

export const ViewProduct = () => {
    const { products, getSpecificUser } = useContext(ProductContxt);
    useEffect(() => {
        getSpecificUser();
    }, []);
    return (
        <>
            <div className="col-span-4 sm:col-span-9">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">My Products</h2>
                    <hr className="my-6 border-t border-gray-300 " />
                    <div className='flex flex-wrap mx-10 justify-center'>

                        {
                            products.map((product) => {

                                return (
                                    <div key={product.id}>
                                        <div className='flex items-center'>
                                            <div className="relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                                <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to={`/product/${product.id}`}>
                                                    <img className="object-cover" src={`http://laravel-project.test:8080/storage/${product.image}`} alt='${product.image}' />
                                                </Link>
                                                <div className="mt-4 px-5 pb-5">
                                                    <Link to={`/product/${product.id}`}>
                                                        <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                                                    </Link>
                                                    <div className="mt-2 mb-5 flex items-center justify-between">
                                                        <p>
                                                            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                                                        </p>
                                                    </div>
                                                    <Link to={`/profile/start-sell/${product.id}/edit`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white">
                                                        Edit Product
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div >
            </div >
        </>
    )
}