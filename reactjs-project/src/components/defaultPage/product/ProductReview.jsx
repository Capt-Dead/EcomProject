import { useRef, useState } from 'react';
import { useCookies } from "react-cookie";

export const ProductReview = () => {
    const [cookies] = useCookies(["user"]);
    const [open, setOpen] = useState(false);
    const btnRef = useRef();
    const commentRef = useRef();
    return (
        <>
            <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="flex justify-between">
                        <div className="flex mt-2">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Reviews</h2>
                            <p className="text-sm font-medium leading-none text-gray-900 hover:no-underline dark:text-white">( 1 )</p>
                        </div>

                        {
                            cookies?.user?.token ?
                                (
                                    <>
                                        <div className="mt-2">
                                            <button ref={btnRef} onClick={() => setOpen(!open)} className="p-2 bg-black text-white rounded-full">Add Comment</button>
                                        </div>
                                    </>
                                ) :
                                (
                                    <></>
                                )
                        }
                    </div>


                    <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
                        {open && (
                            <div ref={commentRef} className="gap-3 py-6 sm:flex sm:items-start">
                                <div className="space-y-0.5">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">Add Comment:</p>
                                </div>
                                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                    <textarea name="postContent" className="border border-black" rows={4} cols={100} />
                                    <div className="flex gap-2">
                                        <input type="file" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="gap-3 py-6 sm:flex sm:items-start">
                            <div className="shrink-0 space-y-2 sm:w-48 md:w-72">

                                <div className="space-y-0.5">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">Jese Leos</p>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">November 18 2023 at 15:35</p>
                                </div>

                                <div className="inline-flex items-center gap-1">
                                </div>
                            </div>

                            <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual, everything runs perfect in this computer. Highly recommend!</p>

                                <div className="flex gap-2">
                                    <img className="h-32 w-20 rounded-lg object-cover" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-1.jpg" alt="" />
                                    <img className="h-32 w-20 rounded-lg object-cover" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-2.jpg" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="gap-3 py-6 sm:flex sm:items-start">
                            <div className="shrink-0 space-y-2 sm:w-48 md:w-72">

                                <div className="space-y-0.5">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">Jese Leos</p>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">November 18 2023 at 15:35</p>
                                </div>

                                <div className="inline-flex items-center gap-1">

                                </div>
                            </div>

                            <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual, everything runs perfect in this computer. Highly recommend!</p>

                                <div className="flex gap-2">
                                    <img className="h-32 w-20 rounded-lg object-cover" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-1.jpg" alt="" />
                                    <img className="h-32 w-20 rounded-lg object-cover" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-2.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}