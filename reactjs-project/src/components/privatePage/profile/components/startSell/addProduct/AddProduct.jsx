import { useEffect, useContext } from "react"
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import ProductContxt from "../../../../../../context/api/ProductContext"
import { TextField, Checkbox, FormGroup, FormControlLabel, RadioGroup, Radio, FormHelperText } from "@mui/material";

export const AddProduct = () => {
    const { setFile, setSize1, setSize2, setSize3, setSize4, setSize5, setSize6, addProducts, errors, setErrors } = useContext(ProductContxt);

    const ProductSchema = yup.object({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        category: yup.string().required("Category is required"),
        size: yup.string().required("Size is required"),
        price: yup.number().typeError("Invalid").min(1, "Invalid"),
        stock: yup.number().typeError("Invalid").min(1, "Invalid"),
        // image: yup.mixed().required("Required"),
    })

    const defaultValues = {
        name: '',
        description: '',
        category: '',
        size: '',
        price: '',
        stock: '',
        // image: '',
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(ProductSchema), defaultValues: defaultValues });


    useEffect(() => {
        setErrors({});
    }, [])
    return (
        <section className="max-w-full p-6 mx-auto rounded-lg border border-black max-h-full">
            <h1 className="text-xl font-bold text-black capitalize">Add Product</h1>
            <form onSubmit={handleSubmit(addProducts)}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
                    <div>
                        <label className="text-black" htmlFor="name">Product Name:</label>
                        <Controller
                            name={'name'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
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
                        <p className="text-black" htmlFor="descs">Product description:</p>
                        <Controller
                            name={'description'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        {errors.descs && (
                            <span className="text-sm text-red-400">{errors.descs[0]}</span>
                        )}
                    </div>

                    <div>
                        <p className="text-black" htmlFor="descs">Category:</p>
                        <Controller
                            name={'category'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <RadioGroup
                                    name={'category'}
                                    {...field}
                                    value={field.value}
                                >
                                    <FormControlLabel value="Men" control={<Radio />} label="Men" />
                                    <FormControlLabel value="Women" control={<Radio />} label="Women" />
                                    <FormControlLabel value="Kids" control={<Radio />} label="Kids" />
                                    <FormHelperText sx={{ color: 'danger' }}>{!!error ? error?.message : error?.message}</FormHelperText>
                                </RadioGroup>
                            )}
                        />
                        {errors.gender && (
                            <span className="text-sm text-red-400">{errors.gender[0]}</span>
                        )}
                    </div>

                    <div>
                        <p className="text-black" htmlFor="descs">Size Available:</p>
                        <Controller
                            name={'size'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <FormGroup
                                        row
                                        name={'size'}
                                        {...field}
                                        value={field.value}
                                    >
                                        <FormControlLabel value="1" onChange={(e) => setSize1(e.target.value)} control={<Checkbox />} label="9" />
                                        <FormControlLabel value="1" onChange={(e) => setSize2(e.target.value)} control={<Checkbox />} label="9.5" />
                                        <FormControlLabel value="1" onChange={(e) => setSize3(e.target.value)} control={<Checkbox />} label="10" />
                                        <FormControlLabel value="1" onChange={(e) => setSize4(e.target.value)} control={<Checkbox />} label="10.5" />
                                        <FormControlLabel value="1" onChange={(e) => setSize5(e.target.value)} control={<Checkbox />} label="11" />
                                        <FormControlLabel value="1" onChange={(e) => setSize6(e.target.value)} control={<Checkbox />} label="12" />
                                    </FormGroup>
                                    <FormHelperText >{!!error ? error?.message : error?.message}</FormHelperText>
                                </>
                            )} />
                        {errors.size && (
                            <span className="text-sm text-red-400">{errors.size[0]}</span>
                        )}
                    </div>


                    <div>
                        <label className="text-black" htmlFor="price">Price:</label>
                        <Controller
                            name={'price'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        {errors.price && (
                            <span className="text-sm text-red-400">{errors.price[0]}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-black" htmlFor="stock_inventory">Stock:</label>
                        <Controller
                            name={'stock'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    value={field.value}
                                    error={!!error}
                                    helperText={error?.message}
                                />

                            )}
                        />
                        {errors.stock_inventory && (
                            <span className="text-sm text-red-400">{errors.stock_inventory[0]}</span>
                        )}
                    </div>

                    <div>

                        <label className="block text-black" htmlFor="image">Upload file</label>
                        <input name="image" id="image" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm text-white border border-black rounded-lg cursor-pointer bg-black focus:outline-none" aria-describedby="file_input_help" type="file" />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" >SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        {errors.image && (
                            <span className="text-sm text-red-400">{errors.image[0]}</span>
                        )}
                    </div>

                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md hover:border-black hover:bg-white hover:text-black border  focus:outline-none focus:bg-gray-600">Save</button>
                </div>
            </form>
        </section >
    )

}