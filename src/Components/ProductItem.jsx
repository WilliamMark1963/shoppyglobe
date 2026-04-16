import React from 'react';
import {IndianRupee} from "lucide-react"

function ProductItem({ resData }) {
  // Destructuring directly from resData
  const { id, title, price, tags, rating, images } = resData;

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return [1, 2, 3, 4, 5].map((star) => (
      <span 
        key={star} 
        className={star <= roundedRating ? 'text-amber-500' : 'text-gray-200'}
      >
        ★
      </span>
    ));
  };

  return (

  
           <div className='w-full max-w-[160px] xs:max-w-[200px] sm:max-w-[240px] bg-sky-300 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group mx-auto flex flex-col'>
      
      {/* 2. COMPACT IMAGE CONTAINER (COVER) */}
      {/* 1. aspect-square ensures it stays a perfect square
          2. sm:h-48 sets the height for desktop.
      */}
      <div className='relative aspect-square sm:h-48 overflow-hidden w-full bg-gray-50'>
        <img 
          src={images[0]} 
          alt={title} 
          /* 3. key change: object-cover makes the image fill the entire container.
             We also remove the padding (p-2) we had before.
          */
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        {/* We removed the badge from here so it doesn't block the product */}
      </div>

      {/* 3. CONTENT AREA */}
      <div className='p-2 sm:p-4 bg-white flex-grow border-t border-gray-100'>
        
        {/* 4. Categor Badge (Moved down here for a neater look) */}
        <div className='mb-2'>
           <span className='inline-block bg-amber-400 text-amber-950 text-[7px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider'>
             {tags[0]}
           </span>
        </div>

        <h2 className='text-xs sm:text-sm font-bold text-gray-800 truncate mb-1'>
          {title}
        </h2>
        
        {/* 5. DYNAMIC STARS */}
        <div className='flex items-center mb-1 sm:mb-2'>
           <div className='text-[8px] sm:text-xs'>
             {renderStars(rating)}
           </div>
           <span className='text-gray-400 text-[8px] sm:text-[10px] ml-1'>
             ({rating})
           </span>
        </div>

        <div className='mb-3'>
          <p className='text-base sm:text-xl font-black text-gray-900 flex items-center'>
            <IndianRupee size={18} strokeWidth={3} className='sm:w-5 sm:h-5'/>{price}
          </p>
        </div>

        {/* 6. COMPACT BUTTONS */}
        <div className='flex flex-col gap-1.5'>
          <button className='w-full bg-amber-500 text-white py-1.5 rounded-lg text-[10px] sm:text-xs font-bold hover:bg-amber-600 transition-all active:scale-95 shadow-sm'>
            Add to Cart
          </button>
          <button className='w-full bg-gray-50 text-gray-500 py-1 rounded-lg text-[10px] sm:text-xs font-semibold hover:bg-gray-900 hover:text-white transition-colors'>
            Details
          </button>
        </div>
      </div>
    </div>
   
  );
}

export default ProductItem;