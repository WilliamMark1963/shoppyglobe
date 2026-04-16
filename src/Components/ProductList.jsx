import React, { useState } from 'react';
import useFetch from '../Utlilites/useFetch.js';
import ProductItem from './ProductItem.jsx';
import { useSelector } from 'react-redux';

function ProductList() {
  // Destructuring the data from the custom hook
  const { data, error, isLoading } = useFetch("https://dummyjson.com/products");

  // Access the search query from Redux store
const searchQuery = useSelector((state) => state.search.query);

  // Handle Loading State
  if (isLoading) {
    return (
      <div className='min-h-[80vh] flex justify-center items-center'>
        {/* Added a simple animate-pulse for a 'neater' loading feel */}
        <h3 className='text-2xl md:text-6xl text-amber-500 font-black animate-pulse'>
          Loading...
        </h3>
      </div>
    );
  }

  // Handle Error State (Good practice for "neat" apps)
  if (error) {
    return (
      <div className='min-h-[80vh] flex justify-center items-center'>
        <h3 className='text-xl text-red-500 font-bold'>Error: {error}</h3>
      </div>
    );
  }
// 5. Filter Logic (Only runs if data exists and loading/error are finished)
  const filteredProducts = data?.products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  
  return (
    <div className=' md:p-8 bg-sky-200 p-4 min-h-screen'>
      <div className='mb-10 md:mb-15'>
        <h2 className='text-center mb-5 text-3xl md:text-4xl font-bold text-gray-800'>{searchQuery ? `Results for "${searchQuery}"` : "Products List"}</h2>
      <div className='h-1 w-40 md:w-50 bg-amber-600 mx-auto rounded-2xl '></div>
      </div>

      {/* GRID LOGIC:
        grid-cols-2: 2 items per row on mobile (neat and standard)
        md:grid-cols-3: 3 items on tablets
        lg:grid-cols-4: 4 items on desktop
        gap-4: Space between cards
      */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto'>
        {
          filteredProducts?.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductItem key={item.id} resData={item} />
            ))
          ) : (
            <div className='col-span-full text-center py-20'>
               <p className='text-gray-500 text-lg italic'>No products found matching your search.</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default ProductList;