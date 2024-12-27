import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AnimatePresence, motion } from 'framer-motion';

function CardSwiper() {
  // Dữ liệu cứng
  const food = [
    {
      _id: "6704b78af554eb9a0879ed2d",
      id: 8,
      name: "Tiramisu",
      description: "a classic Italian dessert featuring layers of coffee-soaked ladyfingers, mascarpone cream, and cocoa.",
      price: 1.8,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-cQj5K0ui4Em5NWwrp7TFflQCuhaCI47QJg&s",
      dishType: "Best-seller",
    },
    {
      _id: "6704b78af554eb9a0879ed2d",
      id: 8,
      name: "Pistaschio",
      description: " a creamy Italian dessert with a rich, nutty flavor from premium pistachios",
      price: 6.99,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8DyPvDSNazQ4_B7Td5c3gUgknPMR-jNeNCg&s",
      dishType: "Best-seller",
    },
    {
      _id: "6704b78af554eb9a0879ed2d",
      id: 8,
      name: "Bluejasmine",
      description: "A combination of jasmine tea and butterfly bee colour.",
      price: 6.99,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFdItZmk6oCWG4xlmcmQkooJjiieUa4OqBlQ&s",
      dishType: "Best-seller",
    },{
      _id: "6704b78af554eb9a0879ed2d",
      id: 8,
      name: "Red Velvet",
      description: "A fresh salad with Strawbery,Feta Cheese.",
      price: 6.99,
      imageUrl: "https://thekhoifoodart.com/wp-content/uploads/2023/06/fior-di-saigon0260-1-compressed-1-768x1150.jpg",
      dishType: "Best-seller",
    },
    // Add more items here...
  ];

  const FoodCard = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white w-[250px] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${item.dishType === "Veg" ? "bg-green-500" : "bg-orange-500"} text-white`}
        >
          {item.dishType}
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2 truncate">{item.name}</h2>
        <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden">{item.description}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Swiper
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 4 },
        1536: { slidesPerView: 4 },
      }}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
      }}
      className="gap-28"
    >
      {food.map((item, index) => (
        <SwiperSlide key={index} className="flex flex-col gap-20 items-center justify-center">
          <AnimatePresence>
            <FoodCard key={item._id} item={item} />
          </AnimatePresence>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardSwiper;
