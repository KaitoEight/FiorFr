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
      imageUrl: "https://instagram.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/411083282_18003716639238050_4694234553835213229_n.jpg?stp=dst-jpg_e35&cb=30a688f7-cbb0f644&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTk4eDE0OTguc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fsgn5-9.fna.fbcdn.net&_nc_cat=102&_nc_ohc=WC56U_HPiKsQ7kNvgEJzadw&_nc_gid=3d40e57604e24a099d655670656e4769&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzI1OTgwMjcyMTIzNzkzNTg4OA%3D%3D.3-ccb7-5-cb30a688f7-cbb0f644&oh=00_AYD2JZrShLYDD8DcSWIVlXQhtUXUXpq-mgBLZhqldXYr1w&oe=6757B676&_nc_sid=7a9f4b",
      dishType: "Best-seller",
    },
    {
      _id: "6704b78af554eb9a0879ed2d",
      id: 8,
      name: "Pistaschio",
      description: " a creamy Italian dessert with a rich, nutty flavor from premium pistachios",
      price: 6.99,
      imageUrl: "https://instagram.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/387231340_914301963528024_5788097170264923692_n.jpg?stp=dst-jpg_e35&cb=30a688f7-cbb0f644&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi45MDB4OTAwLnNkci5mMzA4MDguZGVmYXVsdF9pbWFnZSJ9&_nc_ht=instagram.fsgn5-5.fna.fbcdn.net&_nc_cat=100&_nc_ohc=zZXqGQpDXrUQ7kNvgFsO6zD&_nc_gid=06054b158c8f4b85b037f5d753e41556&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzIwODE4NjI4NTg1NjI1OTE3NQ%3D%3D.3-ccb7-5-cb30a688f7-cbb0f644&oh=00_AYDkyksUbIvOakNQl0d9Gxs04Sw0PMmmianSdeI4YLZipQ&oe=6757AA47&_nc_sid=22de04",
      dishType: "Best-seller",
    },
    {
      _id: "6704b78af554eb9a0879ed2d",
      id: 8,
      name: "Bluejasmine",
      description: "A combination of jasmine tea and butterfly bee colour.",
      price: 6.99,
      imageUrl: "https://instagram.fsgn5-9.fna.fbcdn.net/v/t51.2885-15/291064821_769467897522422_3337153313939089340_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyODg1LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fsgn5-9.fna.fbcdn.net&_nc_cat=102&_nc_ohc=0yeUJ40zfs4Q7kNvgE6rsn8&_nc_gid=3a5adfc624d94772a6bf4e4e67cc2caa&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=Mjg3MzE4ODY4MjcxMTM5Mzk4NA%3D%3D.3-ccb7-5&oh=00_AYAbg6ZIjOK4X0WNjnH-QGRUdaLuFvoF9xRxhXwJW1w5OA&oe=6757BF8E&_nc_sid=22de04",
      dishType: "Best-seller",
    },{
      _id: "6704b78af554eb9a0879ed2d",
      id: 8,
      name: "Pistaschio",
      description: "A fresh salad with cucumbers, tomatoes, feta cheese, and olives.",
      price: 6.99,
      imageUrl: "https://instagram.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/411083282_18003716639238050_4694234553835213229_n.jpg?stp=dst-jpg_e35&cb=30a688f7-cbb0f644&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTk4eDE0OTguc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fsgn5-9.fna.fbcdn.net&_nc_cat=102&_nc_ohc=WC56U_HPiKsQ7kNvgEJzadw&_nc_gid=3d40e57604e24a099d655670656e4769&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzI1OTgwMjcyMTIzNzkzNTg4OA%3D%3D.3-ccb7-5-cb30a688f7-cbb0f644&oh=00_AYD2JZrShLYDD8DcSWIVlXQhtUXUXpq-mgBLZhqldXYr1w&oe=6757B676&_nc_sid=7a9f4b",
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
