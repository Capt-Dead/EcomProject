import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import ProductContxt from "../../../context/api/ProductContext";
import { RadioGroup, FormControlLabel, Radio, TextField, FormHelperText, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Header, Footer, ProductReview } from '../../index';

export const Product = () => {
    const { formValues, getEditProducts, setErrors, addCart, errors } = useContext(ProductContxt);
    const [open, setOpen] = useState(false);
    let { id } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CartSchema = yup.object({
        size: yup.string().required("Size is required"),
        quantity: yup.number().typeError("Invalid").min(1, "Invalid").max(formValues.stock_inventory, "Out of Range")
    })

    const defaultValues = {
        size: '',
        quantity: ''
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(CartSchema), defaultValues: defaultValues });

    useEffect(() => {
        getEditProducts(id)
        setErrors({});
    }, [])
    return (
        <>
            <Header />
            <div>
                <div className="py-8 mt-20 mx-24 ">
                    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 ">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                    <img className="w-full h-full object-cover rounded-3xl" src={`http://laravel-project.test:8080/storage/${formValues.image}`} alt="Product_Image" />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    {
                                        formValues.stock_inventory === 0 ? (
                                            <div className="w-full px-2">
                                                <div className="w-full text-center bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ">Out of Stock</div>
                                            </div>
                                        )
                                            :
                                            (
                                                <div className="w-full px-2">
                                                    <div onClick={handleClickOpen} className="w-full text-center bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 hover:cursor-pointer">Add to Cart</div>
                                                </div>
                                            )
                                    }

                                    {/* <div className="w-1/2 px-2">
                                            <button className="w-full bg-gray-200 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300">Add to Wishlist</button>
                                        </div> */}
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{formValues.name}</h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    {formValues.name}
                                </p>
                                <div className="flex mb-4">
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700">Price: $</span>
                                        <span className="text-gray-600">{formValues.price}</span>
                                    </div>
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700">Stock Availability: </span>
                                        <span className="text-gray-600">{formValues.stock_inventory}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700">For: </span>
                                        <span className="text-gray-600">{formValues.gender}</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700">Product Description:</span>
                                    <p className="text-gray-600 text-sm mt-2">{formValues.descs}</p>
                                </div>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <form onSubmit={handleSubmit(addCart)}>
                                        <DialogTitle id="alert-dialog-title">
                                            Cart Details
                                        </DialogTitle>
                                        <hr />
                                        <DialogContent>

                                            <div className="mb-4">
                                                <span className="font-bold text-gray-700">Select Size:</span>
                                                <div className="flex items-center mt-2">
                                                    <Controller
                                                        name={'size'}
                                                        control={control}
                                                        render={({ field, fieldState: { error } }) => (
                                                            <>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name={'size'}
                                                                    {...field}
                                                                    value={field.value}
                                                                >
                                                                    <FormControlLabel disabled={formValues.size_1 === 1 ? false : true} value="9" control={<Radio />} label="9" />
                                                                    <FormControlLabel disabled={formValues.size_2 === 1 ? false : true} value="9.5" control={<Radio />} label="9.5" />
                                                                    <FormControlLabel disabled={formValues.size_3 === 1 ? false : true} value="10" control={<Radio />} label="10" />
                                                                    <FormControlLabel disabled={formValues.size_4 === 1 ? false : true} value="10.5" control={<Radio />} label="10.5" />
                                                                    <FormControlLabel disabled={formValues.size_5 === 1 ? false : true} value="11" control={<Radio />} label="11" />
                                                                    <FormControlLabel disabled={formValues.size_6 === 1 ? false : true} value="12" control={<Radio />} label="12" />
                                                                </RadioGroup>
                                                                <FormHelperText>{!!error ? error?.message : error?.message}</FormHelperText>
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className='mb-4'>
                                                <span className="font-bold text-gray-700">Select Size:</span>
                                                <div className="flex items-center mt-2">
                                                    <Controller
                                                        name={'quantity'}
                                                        control={control}
                                                        render={({ field, fieldState: { error } }) => (
                                                            <TextField
                                                                {...field}
                                                                placeholder='Quantity'
                                                                value={field.value}
                                                                error={!!error}
                                                                sx={{ width: 90 }}
                                                                helperText={error?.message}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <div onClick={handleClose} className="flex items-center justify-center w-20 bg-gray-900 text-white dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 hover:cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>

                                            </div>
                                            <button onSubmit={handleClose} className="flex items-center justify-center w-20 bg-gray-900 text-white dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </button>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                            </div>

                        </div>
                    </div>
                    <ProductReview />
                </div >
            </div >
            <Footer />
        </>
    )
}