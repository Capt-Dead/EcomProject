import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom";
import ProductContxt from "../../../../../../context/api/ProductContext"

export const EditProduct = () => {
    const { formValues, setFile, setSize1, setSize2, setSize3, setSize4, setSize5, setSize6, setCategory, onChange, getEditProducts, updateProducts, errors, setErrors } = useContext(ProductContxt);
    let { id } = useParams();

    useEffect(() => {
        getEditProducts(id)
        setErrors({});
    }, [])
    return (
        <section className="max-w-full p-6 mx-auto rounded-lg border border-black max-h-full">
            <h1 className="text-xl font-bold text-black capitalize">Edit Product</h1>
            <form onSubmit={updateProducts}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
                    <div>
                        <label className="text-black" htmlFor="name">Product Name</label>
                        <input id="name" name="name" type="text" value={formValues["name"] || ""} onChange={onChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black rounded-md   focus:outline-none focus:ring" />
                        {errors.name && (
                            <span className="text-sm text-red-400">{errors.name[0]}</span>
                        )}
                    </div>

                    <div>
                        <p className="text-black" htmlFor="descs">Product description</p>
                        <textarea name="descs" value={formValues["descs"]} onChange={onChange} className="border border-black mt-2 rounded-lg px-4 py-2" rows={4} cols={50} />
                        {errors.descs && (
                            <span className="text-sm text-red-400">{errors.descs[0]}</span>
                        )}
                    </div>

                    <div>
                        <p className="text-black" htmlFor="descs">Category</p>
                        <div className="flex items-center mb-2 mt-2">
                            <input id="Men" type="radio" value="Men" onChange={(e) => setCategory(e.target.value)} name="category" className="w-4 h-4 text-black bg-gray-100 border-gray-300" />
                            <label htmlFor="Men" className="ms-2 text-sm font-medium text-black">Men</label>

                        </div>
                        <div className="flex items-center mb-2">
                            <input id="Women" type="radio" value="Women" onChange={(e) => setCategory(e.target.value)} name="category" className="w-4 h-4 text-black bg-gray-100 border-gray-300" />
                            <label htmlFor="Women" className="ms-2 text-sm font-medium text-black">Women</label>
                        </div>
                        <div className="flex items-center">
                            <input id="Kids" type="radio" value="Kids" onChange={(e) => setCategory(e.target.value)} name="category" className="w-4 h-4 text-black bg-gray-100 border-gray-300" />
                            <label htmlFor="Kids" className="ms-2 text-sm font-medium text-black">Kids</label>
                        </div>
                    </div>

                    <div>

                        <p className="text-black" htmlFor="descs">Size Available</p>
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                <div className="flex items-center ps-3">
                                    <input id="size_1" type="checkbox" value="1" onChange={(e) => setSize1(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label htmlFor="size_1" className="w-full py-3 ms-2 text-sm font-medium text-black">9</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                <div className="flex items-center ps-3">
                                    <input id="size_2" type="checkbox" value="1" onChange={(e) => setSize2(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label htmlFor="size_2" className="w-full py-3 ms-2 text-sm font-medium text-black">9.5</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                <div className="flex items-center ps-3">
                                    <input id="size_3" type="checkbox" value="1" onChange={(e) => setSize3(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label htmlFor="size_3" className="w-full py-3 ms-2 text-sm font-medium text-black">10</label>
                                </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="size_4" type="checkbox" value="1" onChange={(e) => setSize4(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label htmlFor="size_4" className="w-full py-3 ms-2 text-sm font-medium text-black">10.5</label>
                                </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="size_5" type="checkbox" value="1" onChange={(e) => setSize5(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label htmlFor="size_5" className="w-full py-3 ms-2 text-sm font-medium text-black">11</label>
                                </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="size_6" type="checkbox" value="1" onChange={(e) => setSize6(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label htmlFor="size_6" className="w-full py-3 ms-2 text-sm font-medium text-black">12</label>
                                </div>
                            </li>
                        </ul>

                    </div>

                    <div>
                        <label className="text-black" htmlFor="price">Price</label>
                        <input id="price" name="price" type="text" value={formValues["price"]} onChange={onChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black rounded-md  focus:outline-none focus:ring" />
                        {errors.price && (
                            <span className="text-sm text-red-400">{errors.price[0]}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-black" htmlFor="stock_inventory">Stock</label>
                        <input id="stock_inventory" name="stock_inventory" value={formValues["stock_inventory"]} onChange={onChange} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black rounded-md  focus:outline-none focus:ring" />
                        {errors.stock_inventory && (
                            <span className="text-sm text-red-400">{errors.stock_inventory[0]}</span>
                        )}
                    </div>

                    <div>

                        <label className="block text-black" htmlFor="image">Upload file</label>
                        <input name="image" id="image" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm text-white border border-black rounded-lg cursor-pointer bg-black focus:outline-none" aria-describedby="file_input_help" type="file" />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" >SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        <img src={`http://laravel-project.test:8080/storage/${formValues["image"]}`} alt="" />
                        {errors.image && (
                            <span className="text-sm text-red-400">{errors.image[0]}</span>
                        )}

                    </div>

                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md hover:border-black hover:bg-white hover:text-black border  focus:outline-none focus:bg-gray-600">Update</button>
                </div>
            </form>
        </section>
    )

}