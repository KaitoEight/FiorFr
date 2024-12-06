import React, { useEffect, useState } from 'react';

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch('https://675248c9d1983b9597b5c6ac.mockapi.io/fior/api/restaurant')
      .then((response) => response.json())
      .then((data) => {setRestaurants(data); setLoading(false)});
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800 tracking-wide">
        Our Restaurants
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          : restaurants.length > 0
          ? restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={restaurant?.image_url || 'https://via.placeholder.com/400x300'}
                    alt={restaurant?.name || restaurant?.address || 'Restaurant'}
                    className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {restaurant?.name || restaurant?.address}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {restaurant?.description || 'No description available.'}
                  </p>
                  <div className="space-y-1">
                    <p className="text-gray-800 flex items-center">
                      <strong className="text-green-600">Phone: </strong>
                      <span className="ml-2">{restaurant?.contact?.phone || 'N/A'}</span>
                    </p>
                    <p className="text-gray-800 flex items-center">
                      <strong className="text-orange-600">Email: </strong>
                      <span className="ml-2">{restaurant?.contact?.email || 'N/A'}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          : (
            <p className="col-span-full text-center text-xl text-gray-500">No restaurants found.</p>
          )}
      </div>
    </div>
  );
}

export default Restaurant;
