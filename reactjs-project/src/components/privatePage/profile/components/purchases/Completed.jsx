import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import CartContext from "../../../../../context/api/CartContext"
import ProductContext from "../../../../../context/api/ProductContext"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from "@mui/material";

export const Completed = () => {
    const { cart, getCartPaid, setErrors } = useContext(CartContext);
    const { newReview, setReviewProduct } = useContext(ProductContext);
    const [open, setOpen] = useState(false);

    const CommentSchema = yup.object({
        comment: yup.string().required("Cannot comment empty field"),
    })

    const defaultValues = {
        comment: '',
    }

    const { control, handleSubmit, formState: { error },
    } = useForm({ resolver: yupResolver(CommentSchema), defaultValues: defaultValues });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    useEffect(() => {
        getCartPaid()
        setErrors({});
    }, [])

    return (
        <div className="col-span-4 sm:col-span-9">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">My Purchases</h2>
                <hr className="my-6 border-t border-gray-300" />
                <div className='flex flex-wrap mx-10 justify-center'>
                    {
                        cart.map((cart) => {
                            return (
                                <div key={cart.id} className='flex items-center' >
                                    {
                                        cart.order_details.status === 1 ?
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
                                                            <span className="text-xl font-bold text-slate-900">Payment: {cart.order_details.payment_details === 0 ? "Card" : "COD"}</span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                        Status: {cart.order_details.status === 2 ? 'Pending' : cart.order_details.status === 1 ? 'Done' : cart.order_details.status === 0 ? "On the way" : ""}
                                                    </div>
                                                    <button onClick={() => { handleClickOpen(); setReviewProduct(cart.product[0].id) }} type="button" className="py-2 px-3 w-full text-gray-900 rounded border border-black text-center mt-4">Rate It?</button>
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
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit(newReview)}>
                    <DialogTitle id="alert-dialog-title">
                        Rate it
                    </DialogTitle>
                    <hr />
                    <DialogContent>
                        <div className='mb-4'>
                            <span className="font-bold text-gray-700">What's your comment:</span>
                            <div className="flex items-center mt-2">
                                <Controller
                                    name={'comment'}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            placeholder='Comment'
                                            value={field.value}
                                            error={!!error}
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
                            Rate
                        </button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >

    )
}