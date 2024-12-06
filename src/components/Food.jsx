import { useState, useEffect, useContext } from "react";
import { Search, Soup, ShoppingCart } from "lucide-react";
import { UserContext } from "../UserContext";
import Toast from "./Toast";
import { motion, AnimatePresence } from "framer-motion";

const Food = () => {
  const [food, setFood] = useState([]);
  const [filteorangeFood, setFilteorangeFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [orderLoading, setOrderLoading] = useState({});
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('https://675248c9d1983b9597b5c6ac.mockapi.io/fior/api/Food', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setFood(data);
        setFilteorangeFood(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteorange = food.filter((item) =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setFilteorangeFood(filteorange);

      if (searchQuery?.length > 0) {
        setSuggestions(filteorange?.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, food]);

  // Handle quantity changes
  const handleQuantityChange = (productId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev?.[productId] || 1) + delta), // Ensure minimum quantity is 1
    }));
  };

  const addToCart = async (productId) => {
    const email = userInfo?.email; // Optional chaining here
    const quantity = quantities?.[productId] || 1; // Use selected quantity or default to 1

    try {
      setOrderLoading((prev) => ({ ...prev, [productId]: true }));
      const response = await fetch('https://jsm-contest.onrender.com/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, productId, quantity }),
      });

      const result = await response?.json();
      if (response?.ok) {
        setToast({ message: result?.message, type: "success" });
      } else {
        setToast({ message: result?.message, type: "error" });
      }
    } catch (error) {
      setToast({ message: "Error adding item to cart.", type: "error" });
      console.error("Error adding item to cart:", error);
    } finally {
      setOrderLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const FoodCard = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item?.imageUrl}
          alt={item?.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            item?.dishType === "Veg" ? "bg-green-500" : "bg-orange-500"
          } text-white`}
        >
          {item?.dishType}
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2 truncate">{item?.name}</h2>
        <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden">{item?.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-lg">${item?.price?.toFixed(2)}</p>
          <div className="flex items-center">
            <button
              className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400 transition-colors"
              onClick={() => handleQuantityChange(item?._id, -1)}
            >
              -
            </button>
            <span className="px-3">{quantities?.[item?._id] || 1}</span>
            <button
              className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400 transition-colors"
              onClick={() => handleQuantityChange(item?._id, 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className={`px-4 py-2 rounded-full ${
            orderLoading?.[item?._id] ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
          } text-white transition-colors duration-300 flex items-center`}
          onClick={() => addToCart(item?._id)}
          disabled={orderLoading?.[item?._id]}
        >
          {orderLoading?.[item?._id] ? "Adding..." : <>Add <ShoppingCart className="ml-2 w-4 h-4" /></>}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Our Menu</h1>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by food name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
          />
        </div>
        <AnimatePresence>
          {suggestions?.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-300 max-w-2xl mx-auto mt-2 rounded-md shadow-md overflow-hidden"
            >
              {suggestions?.map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setSearchQuery(suggestion?.name)}
                >
                  {suggestion?.name}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 })?.map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))
          : filteorangeFood?.length > 0 ? (
            <AnimatePresence>
              {filteorangeFood?.map((item) => (
                <FoodCard key={item?._id} item={item} />
              ))}
            </AnimatePresence>
          ) : (
            <p className="col-span-full text-center text-xl text-gray-500">No food found.</p>
          )}
      </div>

      {toast && <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Food;
