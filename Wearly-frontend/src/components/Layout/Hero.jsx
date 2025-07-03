import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.webp";

const Hero = () => {
    return (
        <section className="relative">
            <img
                src={heroImg}
                alt="Wearly Fashion"
                className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-900/70 to-purple-800/60">
                <div className="p-6 text-center text-white">
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-white uppercase bg-indigo-600 rounded-full">New Collection</div>
                    <h1 className="mb-6 text-4xl font-bold tracking-tighter uppercase md:text-7xl lg:text-9xl">
                        Style <span className="text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text">Redefined</span>
                    </h1>
                    <p className="max-w-lg mx-auto mb-8 text-sm tracking-wide md:text-lg">
                        Express yourself with Wearly's premium collection. Designed for comfort, crafted for style.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                        <Link to="/collection/all/?gender=Men" className="px-8 py-3 text-lg font-medium text-white transition-colors border-2 border-white rounded-md hover:bg-white hover:text-indigo-900">
                            Shop Men
                        </Link>
                        <Link to="/collection/all/?gender=Women" className="px-8 py-3 text-lg font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700">
                            Shop Women
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
