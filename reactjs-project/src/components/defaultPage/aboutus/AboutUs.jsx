import { Header } from "../../index";
import logo from '../../../Jumpman_logo.png';
export const AboutUs = () => {
    return (
        <>
            <Header />
            <div className="sm:flex items-center max-w-screen-xl mt-32 mx-auto">
                <div className="sm:w-1/2 p-10">
                    <div className="image object-center text-center">
                        <img src={logo} />
                    </div>
                </div>
                <div className="sm:w-1/2 p-5">
                    <div className="text">
                        <span className="text-gray-500 border-b-2 border-black uppercase">About us</span>
                        <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-black">Our Company</span>
                        </h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi
                            doloremque, fugiat illum magni minus nisi nulla numquam obcaecati placeat quia, repellat tempore
                            voluptatum.
                        </p>
                    </div>
                </div>
            </div>
            <section className="bg-gray-100 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Our Vision</h2>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                </svg>

                            </div>
                            <div className="mt-5">
                                <h3 className="text-lg font-medium text-gray-900">Mission</h3>
                                <p className="mt-2 text-base text-gray-500">We aim to make the world a better place through innovation
                                    and collaboration.</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>

                            </div>
                            <div className="mt-5">
                                <h3 className="text-lg font-medium text-gray-900">Values</h3>
                                <p className="mt-2 text-base text-gray-500">We believe in honesty, integrity, and respect for all
                                    individuals.</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                            </div>
                            <div className="mt-5">
                                <h3 className="text-lg font-medium text-gray-900">Vision</h3>
                                <p className="mt-2 text-base text-gray-500">We envision a world where technology is used to solve the
                                    most pressing issues facing humanity and improve people's lives.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};
