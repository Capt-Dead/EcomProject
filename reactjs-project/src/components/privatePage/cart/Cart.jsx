import { Link } from 'react-router-dom'
import { Header, Footer } from '../../index'
import { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import CartContext from "../../../context/api/CartContext"
import AccountContext from "../../../context/api/AccountContext"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, FormControlLabel, RadioGroup, Radio, FormHelperText } from "@mui/material";

export const Cart = () => {
    const { cart, getCart, payment, deleteCart, setErrors } = useContext(CartContext);
    const { formValues } = useContext(AccountContext);
    const [open, setOpen] = useState(false);
    const [deliveryFee, setDeliveryFee] = useState(0);
    let totalPrice = 0;
    let totalAmount = 0;

    const ProductSchema = yup.object({
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        postalcode: yup.string().required("City is required"),
        country: yup.string().required("City is required"),
        mobile: yup.string().required("Mobile phone is Required").matches(/^(09|\+639)\d{9}$/, 'PH number is incorrect'),
        options: yup.string().required("Payment option is required"),
    })

    const defaultValues = {
        address: '',
        city: '',
        postalcode: '',
        country: '',
        mobile: '',
        options: '',
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(ProductSchema), defaultValues: defaultValues });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    useEffect(() => {
        getCart()
        setErrors({});
    }, [])

    return (
        <>
            <Header />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 mt-20 mx-24">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 mb-44">

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart:</h2>
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {
                                    cart.map((cart) => {
                                        totalPrice = cart.product[0].price * cart.quantity
                                        totalAmount += totalPrice
                                        return (
                                            < div key={cart.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6" >
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                    <Link to={`/product/${cart.product[0].id}`} className="shrink-0 md:order-1">
                                                        <img className="h-20 w-20 dark:hidden" src={`http://laravel-project.test:8080/storage/${cart.product[0].image}`} alt="imac_image" />
                                                    </Link>

                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                        <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900">Size: </p>
                                                        <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 mr-10">{cart.size}</p>

                                                        <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 mr-2">Quantity: </p>
                                                        <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 ">{cart.quantity}</p>
                                                        <div className="text-end md:order-4 md:w-32">
                                                            <p className="text-base font-bold text-gray-900 dark:text-white">Total: ${totalPrice}</p>
                                                        </div>
                                                    </div>

                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                        <Link to={`/product/${cart.product[0].id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{cart.product[0].name}</Link>
                                                        <br />
                                                        <Link to={`/product/${cart.product[0].id}`} className="text-xs font-medium text-gray-900 hover:underline dark:text-white">{cart.product[0].descs}</Link>

                                                        <div className="flex items-center gap-4">
                                                            <button onClick={() => deleteCart(cart.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                                </svg>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">$ {totalAmount}</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">$ {totalAmount}</dd>
                                    </dl>
                                </div>

                                <div onClick={handleClickOpen} className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 hover:cursor-pointer hover:bg-gray-900">Proceed to Checkout</div>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <form onSubmit={handleSubmit(payment)}>
                                        <DialogTitle id="alert-dialog-title">
                                            Checkout Details
                                        </DialogTitle>
                                        <hr />
                                        <DialogContent>
                                            <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
                                                <div className="min-w-0 flex-1 space-y-8">
                                                    <div className="space-y-4">
                                                        {/* <div className="flex"> */}
                                                        <h2 className="text-xl font-semibold text-gray-900 mr-4">Confirm Delivery Details</h2>
                                                        {/* </div> */}

                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                                            <div>
                                                                <span className="text-black" >Address</span>
                                                                <Controller
                                                                    name={'address'}
                                                                    control={control}
                                                                    render={({ field, fieldState: { error } }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            fullWidth
                                                                            placeholder={formValues.address}
                                                                            value={field.value}
                                                                            error={!!error}
                                                                            helperText={error?.message}
                                                                        />
                                                                    )}
                                                                />
                                                            </div>

                                                            <div>
                                                                <span className="text-black" >City</span>
                                                                <Controller
                                                                    name={'city'}
                                                                    control={control}
                                                                    render={({ field, fieldState: { error } }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            placeholder={formValues.city}
                                                                            fullWidth
                                                                            value={field.value}
                                                                            error={!!error}
                                                                            helperText={error?.message}
                                                                        />
                                                                    )}
                                                                />
                                                            </div>

                                                            <div>
                                                                <span className="text-black" >Postal Code</span>
                                                                <Controller
                                                                    name={'postalcode'}
                                                                    control={control}
                                                                    render={({ field, fieldState: { error } }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            placeholder={formValues.postal}
                                                                            fullWidth
                                                                            value={field.value}
                                                                            error={!!error}
                                                                            helperText={error?.message}
                                                                        />
                                                                    )}
                                                                />
                                                            </div>

                                                            <div>
                                                                <span className="text-black" >Country</span>
                                                                <Controller
                                                                    name={'country'}
                                                                    control={control}
                                                                    render={({ field, fieldState: { error } }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            placeholder={formValues.country}
                                                                            fullWidth
                                                                            value={field.value}
                                                                            error={!!error}
                                                                            helperText={error?.message}
                                                                        />
                                                                    )}
                                                                />
                                                            </div>

                                                            <div>
                                                                <span className="text-black" >Mobile Number</span>
                                                                <Controller
                                                                    name={'mobile'}
                                                                    control={control}
                                                                    render={({ field, fieldState: { error } }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            placeholder={formValues.mobile}
                                                                            fullWidth
                                                                            value={field.value}
                                                                            error={!!error}
                                                                            helperText={error?.message}
                                                                        />
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* <h2 onClick={getUser} className="text-sm justify-end font-semibold text-gray-900  hover:cursor-pointer hover:undeline">Autofill Details?</h2> */}
                                                    </div>

                                                    <div className="space-y-4">
                                                        <h3 className="text-xl font-semibold text-gray-900 ">Payment</h3>
                                                        <Controller
                                                            name={'options'}
                                                            control={control}
                                                            render={({ field, fieldState: { error } }) => (
                                                                <RadioGroup
                                                                    name={'options'}
                                                                    {...field}
                                                                    value={field.value}
                                                                >
                                                                    <div className="grid gap-4">

                                                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                                                            <div className="flex items-start">
                                                                                <div className="flex h-5 items-center">
                                                                                    <FormControlLabel value="0" onChange={() => setDeliveryFee(0)} control={<Radio />} />
                                                                                </div>
                                                                                <div className="ms-4 text-sm">
                                                                                    <span className="font-medium leading-none text-gray-900 "> Credit Card </span>
                                                                                    <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 ">Pay with your credit card</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                                                            <div className="flex items-start">

                                                                                <div className="flex h-5 items-center">
                                                                                    <FormControlLabel value="1" onChange={() => setDeliveryFee(1)} control={<Radio />} />
                                                                                </div>
                                                                                <div className="ms-4 text-sm">
                                                                                    <span className="font-medium leading-none text-gray-900 "> Payment on delivery </span>
                                                                                    <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 ">COD process payment</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <FormHelperText sx={{ color: 'danger' }}>{!!error ? error?.message : error?.message}</FormHelperText>
                                                                    </div>
                                                                </RadioGroup>
                                                            )}
                                                        />

                                                    </div>

                                                    <div className="space-y-4">

                                                        <div className="-my-3 divide-y divide-gray-200">

                                                            <dl className="flex items-center justify-between gap-4 py-3">
                                                                <dt className="text-base font-normal text-gray-500 ">Products:</dt>
                                                                <dd className="text-base font-medium text-gray-900 ">$ {totalAmount}</dd>
                                                            </dl>

                                                            <dl className="flex items-center justify-between gap-4 py-3">
                                                                <dt className="text-base font-bold text-gray-900 ">Total:</dt>
                                                                <dd className="text-base font-bold text-gray-900 ">$ {totalAmount}</dd>
                                                            </dl>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </DialogContent>
                                        <DialogActions>
                                            <div onClick={handleClose} className="flex items-center justify-center w-fit bg-gray-900 text-white dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 hover:cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <button type="submit" className="flex items-center justify-center w-fit bg-gray-900 text-white dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                                                Place order
                                            </button>
                                        </DialogActions>
                                    </form>
                                </Dialog>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                    <Link to="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                        Continue Shopping
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    )
}