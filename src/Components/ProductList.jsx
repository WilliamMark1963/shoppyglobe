import React from 'react';
import useFetch from '../Utlilites/useFetch.js';
import ProductItem from './ProductItem.jsx';

function ProductList() {
  // Destructuring the data from the custom hook
  const { data, error, isLoading } = useFetch("https://dummyjson.com/products");

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

  return (
    <div className=' md:p-8 bg-sky-200 p-10'>
      <div className='mb-10 md:mb-15'>
        <h2 className='text-center mb-5 text-3xl md:text-4xl font-bold'>Products List </h2>
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
          // Mappin data
          data?.products?.map((item) => (
            <ProductItem key={item.id} resData={item} />
          ))
        }
      </div>
    </div>
  );
}

export default ProductList;