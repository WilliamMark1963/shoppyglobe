import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IndianRupee, ChevronLeft, ShoppingCart, Star, CheckCircle } from 'lucide-react'; // Added CheckCircle for feedback
import { useDispatch } from 'react-redux';
import { addItems } from '../Utlilites/cartSlice.js';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false); // State for temporary feedback

  // --- Add to Cart Handler ---
  const handleAddToCart = () => {
    if (product) {
      // Dispatching product with initial quantity of 1
      dispatch(addItems({ ...product, quantity: 1 }));
      
      // Provide visual feedback for 2 seconds
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        let res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        let data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error Occurred: ", err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-amber-500 animate-pulse">Loading Product...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product not found.</div>;

  return (
    <div className='min-h-screen bg-gray-50 pb-24 md:pb-10'>
      {/* Top Navigation */}
      <div className='p-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-gray-100'>
        <button onClick={() => navigate(-1)} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
          <ChevronLeft size={24} />
        </button>
        <h1 className='font-bold text-lg truncate'>Product Details</h1>
      </div>

      {/* Main Wrapper: Centered with max-width */}
      <div className='max-w-5xl mx-auto px-4 py-6 md:py-12'>
        <div className='flex flex-col md:flex-row items-center md:items-start justify-center gap-8 lg:gap-16'>
          
          {/* Left: Image */}
          <div className='w-full max-w-[350px] md:max-w-[450px] shrink-0'>
            <div className='aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100'>
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className='w-full h-full object-contain p-8 transition-transform hover:scale-105 duration-500'
              />
            </div>
          </div>

          {/* Right: Info Section */}
          <div className='w-full max-w-[500px] flex flex-col'>
            <div className='mb-3'>
              <span className='bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider'>
                {product.category}
              </span>
            </div>

            <h2 className='text-2xl sm:text-4xl font-black text-gray-900 leading-tight mb-3'>
              {product.title}
            </h2>

            <div className='flex items-center gap-3 mb-6'>
              <div className='flex items-center bg-amber-50 px-2 py-1 rounded-lg text-amber-600'>
                <Star size={14} fill="currentColor" />
                <span className='ml-1 text-sm font-bold'>{product.rating}</span>
              </div>
              <span className='text-gray-400 text-sm font-medium'>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <p className='text-gray-600 leading-relaxed mb-8 text-sm sm:text-base'>
              {product.description}
            </p>

            <div className='mt-auto'>
              <div className='flex items-center gap-1 text-3xl font-black text-gray-900 mb-8'>
                <IndianRupee size={26} strokeWidth={3} />
                <span>{product.price}</span>
              </div>

              {/* Action Button - Hooked to handleAddToCart */}
              <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:relative md:p-0 md:border-none md:bg-transparent z-30'>
                <button 
                  onClick={handleAddToCart}
                  className={`w-full md:w-max md:px-12 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-amber-200 ${
                    isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-500 hover:bg-amber-600'
                  } text-white`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={20} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;