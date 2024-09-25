import { Link } from "react-router-dom"

export const StartSelling = () => {

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col p-4">
                    <Link to="add-product">
                        <p className="mt-5 border-4 border-black p-12 px-20 rounded-lg text-2xl">
                            Add Products
                        </p>
                    </Link>
                    <Link to="view-product">
                        <p className="mt-5 border-4 border-black p-12 px-20 rounded-lg text-2xl">
                            View Products
                        </p>
                    </Link>
                    {/* <Link to="view-orders">
                        <p className="mt-5 border-4 border-black p-12 px-20 rounded-lg text-2xl">
                            View Orders
                        </p>
                    </Link> */}
                </div>
            </div>
        </>
    )
}