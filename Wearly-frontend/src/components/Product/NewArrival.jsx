import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        console.log("New arrivals response:", response.data);

        // Make sure you're accessing the correct field
        setNewArrivals(response.data.products || []);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setInitialScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = initialScrollLeft - walk;
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const canScrollRight = container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(canScrollRight);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="px-4 py-16 bg-gray-50 lg:px-0">
      <div className="container relative mx-auto mb-10 text-center">
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-indigo-600 uppercase bg-indigo-100 rounded-full">Just Dropped</span>
        <h2 className="mb-4 text-3xl font-bold text-center">New Arrivals</h2>
        <div className="w-20 h-1 mx-auto mb-6 bg-indigo-600 rounded"></div>
        <p className="max-w-2xl mx-auto mb-8 text-center text-gray-600">
          Discover the latest styles fresh from our designer collection, crafted to keep your wardrobe on-trend and fashion-forward.
        </p>
        <div className="absolute right-0 bottom-[-40px] flex space-x-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 border rounded-full transition-colors ${canScrollLeft ? "bg-white text-indigo-600 hover:bg-indigo-50 border-indigo-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            aria-label="Scroll left"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 border rounded-full transition-colors ${canScrollRight ? "bg-white text-indigo-600 hover:bg-indigo-50 border-indigo-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            aria-label="Scroll right"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`container relative flex mx-auto space-x-6 overflow-x-scroll scroll-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {Array.isArray(newArrivals) && newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative group overflow-hidden"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-[500px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                draggable="false"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent rounded-b-lg backdrop-blur-sm transition-all duration-300 group-hover:p-6">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="text-lg font-medium">{product.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-semibold">${product.price}</p>
                  <span className="px-3 py-1 text-xs bg-indigo-600 rounded-full">New</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;
