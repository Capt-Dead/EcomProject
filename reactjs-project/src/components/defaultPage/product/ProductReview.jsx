import { useEffect, useContext, } from 'react';
import { useParams } from "react-router-dom";
import ProductContext from '../../../context/api/ProductContext';

export const ProductReview = () => {
    const { getEditProducts, review } = useContext(ProductContext);
    let { id } = useParams();

    useEffect(() => {
        getEditProducts(id);
    }, []);
    return (
        <>
            <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="flex justify-between">
                        <div className="flex mt-2">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Reviews</h2>
                            <p className="text-sm font-medium leading-none text-gray-900 hover:no-underline dark:text-white">( {review.count} )</p>
                        </div>
                    </div>

                    <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            review?.review?.map((review) => {
                                return (
                                    <div key={review.id} className="gap-3 py-6 sm:flex sm:items-start">
                                        <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                                            <div className="space-y-0.5">
                                                <p className="text-base font-semibold text-gray-900 dark:text-white">{review.user.name}</p>
                                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{review.created_at.slice(0, 10)}</p>
                                            </div>

                                            <div className="inline-flex items-center gap-1">
                                            </div>
                                        </div>

                                        <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">{review.comment}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section >
        </>
    )
}