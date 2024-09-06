import { Header } from "../../header"

export const PaymentPage = () => {

    return (
        <>
            <Header />
            <section className="bg-white py-8 antialiased mt-20 mx-24">
                <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Checkout:</h2>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900 "> Your name </label>
                                        <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>

                                    <div>
                                        <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Your email* </label>
                                        <input type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-country-input-3" className="block text-sm font-medium text-gray-900 "> Country* </label>
                                        </div>
                                        <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required />

                                        {/* <select id="select-country-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500">
                                            <option selected>United States</option>
                                            <option value="AS">Australia</option>
                                            <option value="FR">France</option>
                                            <option value="ES">Spain</option>
                                            <option value="UK">United Kingdom</option>
                                        </select> */}
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900 "> City* </label>
                                        </div>
                                        <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required />
                                        {/* <select id="select-city-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500">
                                            <option selected>San Francisco</option>
                                            <option value="NY">New York</option>
                                            <option value="LA">Los Angeles</option>
                                            <option value="CH">Chicago</option>
                                            <option value="HU">Houston</option>
                                        </select> */}
                                    </div>

                                    <div>
                                        <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-gray-900 "> Phone Number* </label>
                                        <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>


                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 ">Payment</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="credit-card" className="font-medium leading-none text-gray-900 "> Credit Card </label>
                                                <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 ">Pay with your credit card</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200 "></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Edit</button>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900 "> Payment on delivery </label>
                                                <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 ">+$15 payment processing fee</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200 "></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Edit</button>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="paypal-2" className="font-medium leading-none text-gray-900 "> Paypal account </label>
                                                <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 ">Connect to your account</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200 "></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 ">Subtotal</dt>
                                        <dd className="text-base font-medium text-gray-900 ">$8,094.00</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 ">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900 ">$199</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900 ">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 ">$8,392.00</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300">Proceed to Payment</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}