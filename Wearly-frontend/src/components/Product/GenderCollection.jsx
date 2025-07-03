import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.svg";
import womensCollectionImage from "../../assets/womens-collection.svg";

const GenderCollectionSection = () => {
    return (
        <section className="px-4 py-16 lg:px-0">
            <div className="container mx-auto mb-10 text-center">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-indigo-600 uppercase bg-indigo-100 rounded-full">Categories</span>
                <h2 className="text-3xl font-bold">Shop By Gender</h2>
                <div className="w-20 h-1 mx-auto mt-2 bg-indigo-600 rounded"></div>
            </div>

            <div className="container flex flex-col gap-8 mx-auto md:flex-row">
                {/* Women's Collection */}
                <div className="relative flex-1 overflow-hidden group">
                    <img 
                        src={womensCollectionImage} 
                        className="w-full h-[600px] md:h-[700px] lg:h-[800px] object-cover transition-transform duration-500 group-hover:scale-105" 
                        alt="Women's Collection" 
                    />
                    <div className="absolute p-6 bg-white rounded-lg shadow-lg md:p-8 bottom-6 left-6 bg-opacity-90 transition-all duration-300 group-hover:bottom-8">
                        <h2 className="mb-2 text-xl font-extrabold tracking-wider text-indigo-600 uppercase md:mb-3 md:text-2xl lg:text-3xl">
                            Women's Collection
                        </h2>
                        <Link
                            to="/collection/all/?gender=Women"
                            className="inline-block px-6 py-2 mt-2 text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Men's Collection */}
                <div className="relative flex-1 overflow-hidden group">
                    <img 
                        src={mensCollectionImage} 
                        className="w-full h-[600px] md:h-[700px] lg:h-[800px] object-cover transition-transform duration-500 group-hover:scale-105" 
                        alt="Men's Collection" 
                    />
                    <div className="absolute p-6 bg-white rounded-lg shadow-lg md:p-8 bottom-6 left-6 bg-opacity-90 transition-all duration-300 group-hover:bottom-8">
                        <h2 className="mb-2 text-xl font-extrabold tracking-wider text-indigo-600 uppercase md:mb-3 md:text-2xl lg:text-3xl">
                            Men's Collection
                        </h2>
                        <Link
                            to="/collection/all/?gender=Men"
                            className="inline-block px-6 py-2 mt-2 text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Kids Collection */}
                {/* <div className="relative flex-1">
                    <img src={KidsCollectionImage} className="w-full h-[600px] md:h-[700px] lg:h-[800px] object-cover" alt="Kids' Collection" />
                    <div className="absolute p-4 bg-white rounded-lg shadow-lg md:p-6 lg:p-8 bottom-4 md:bottom-8 left-4 md:left-8 bg-opacity-90">
                        <h2 className="mb-2 text-lg font-extrabold tracking-wider text-orange-600 uppercase md:mb-3 md:text-2xl lg:text-3xl">
                            Kids' Collection
                        </h2>
                        <Link 
                            to="/collections/all?gender=Kids" 
                            className="text-base font-medium text-orange-600 underline transition duration-300 md:text-lg lg:text-xl hover:text-orange-500"
                        >
                            Shop Now →
                        </Link>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default GenderCollectionSection;
