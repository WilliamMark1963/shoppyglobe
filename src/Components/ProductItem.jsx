import React, { useState } from 'react';
import { IndianRupee, Eye } from "lucide-react";
import { setSearchQuery } from "../Utlilites/searchSlice.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItems } from '../Utlilites/cartSlice.js';

function ProductItem({ resData }) {
  const { id, title, price, tags, rating, images } = resData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- Image Lazy Loading State ---
  const [imgLoaded, setImgLoaded] = useState(false);

  // --- Handlers ---
  const addToCart = (e) => {
    e.stopPropagation();
    // Ensure we pass quantity: 1 so the cart logic works correctly
    dispatch(addItems({ ...resData, quantity: 1 }));
  };

  const handleClick = () => {
    dispatch(setSearchQuery(""));
    navigate(`/product/${id}`);
  };

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
    <div className='w-full max-w-[160px] xs:max-w-[200px] sm:max-w-[240px] bg-white border border-sky-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-500 overflow-hidden group mx-auto flex flex-col'>
      
      {/* 1. IMAGE CONTAINER WITH LAZY LOADING & BLUR */}
      <div className='relative aspect-square sm:h-48 overflow-hidden w-full bg-sky-50/50'>
        
        {/* Loading Skeleton / Pulse effect while image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-sky-100 animate-pulse z-10" />
        )}

        <img
          src={images[0]}
          alt={title}
          loading="lazy" // Native Lazy Loading
          onLoad={() => setImgLoaded(true)} // Trigger blur-out on load
          className={`w-full h-full object-cover transition-all duration-1000 ease-out 
            ${imgLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-2xl scale-110'} 
            group-hover:scale-110`}
        />


        {/* Brand/Blend Overlay */}
        <div className="absolute inset-0 bg-sky-400/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* 2. CONTENT AREA */}
      <div className='p-3 sm:p-5 flex-grow border-t border-sky-50 flex flex-col'>
        
        {/* Category Badge */}
        <div className='mb-2'>
          <span className='inline-block bg-sky-100 text-sky-700 text-[8px] sm:text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest'>
            {tags[0] || "Featured"}
          </span>
        </div>

        <h2 className='text-xs sm:text-sm font-bold text-gray-900 truncate mb-1'>
          {title}
        </h2>
        
        {/* Rating Stars */}
        <div className='flex items-center mb-3'>
          <div className='text-[10px] sm:text-xs tracking-tighter'>
            {renderStars(rating)}
          </div>
          <span className='text-gray-400 text-[9px] sm:text-[11px] ml-1.5 font-medium'>
            ({rating})
          </span>
        </div>

        {/* Price Section */}
        <div className='mb-5'>
          <p className='text-base sm:text-xl font-black text-gray-950 flex items-center tracking-tight'>
            <IndianRupee size={18} strokeWidth={3} className='sm:w-5 sm:h-5' />{price}
          </p>
        </div>

        {/* 3. ACTION BUTTONS */}
        <div className='mt-auto flex flex-col gap-2'>
          <button 
            className='w-full bg-amber-500 text-white py-2.5 rounded-2xl text-[10px] sm:text-xs font-black hover:bg-amber-600 transition-all active:scale-95 shadow-md shadow-amber-100' 
            onClick={addToCart}
          >
            Add to Cart
          </button>
          
          <button 
            className='w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-500 py-2 rounded-2xl text-[10px] sm:text-xs font-bold hover:bg-gray-900 hover:text-white transition-all border border-gray-100 hover:border-gray-900'
            onClick={handleClick}
          >
            <Eye size={14} />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;