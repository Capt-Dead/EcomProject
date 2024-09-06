import logo from '../../Jumpman_logo.png'
export const Footer = () => {
    return (
        <footer className="bottom-0 mt-28">
            <div className='relative bg-gray-900 px-4 pt-16 w-full'>
                <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border border-black bg-white p-2"><img className="h-full object-contain" src={logo} alt="" /></div>
                {/* <nav aria-label="Footer Navigation" className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
                <a href="#" className="font-medium text-white">Demo</a>
                <a href="#" className="font-medium text-white">Support</a>
                <a href="#" className="font-medium text-white">Privacy Policy</a>
                <a href="#" className="font-medium text-white">Terms & Conditions</a>
            </nav> */}
                <p className="py-10 text-center text-gray-300">© 2024 ***** | ********</p>
            </div>
        </footer>
    )
}