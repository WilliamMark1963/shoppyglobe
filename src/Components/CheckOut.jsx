import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IndianRupee, ShoppingBag, Trash2, CheckCircle, Home, AlertCircle } from "lucide-react";
import { removeItems, updateQuantity, clearCart } from "../Utlilites/cartSlice";

function CheckOut() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- States ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Calculations ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharges = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryCharges;

  // --- Handlers ---
  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Please provide a detailed address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      
      // Trigger Success UI
      setShowSuccess(true);
      
      // Clear Redux Cart
      dispatch(clearCart());

      // Auto Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Main Content Container */}
      <div className={`max-w-6xl mx-auto transition-all duration-500 ${showSuccess ? 'blur-md pointer-events-none scale-95' : 'scale-100'}`}>
        
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="text-sky-600" size={36} />
          Checkout
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Shipping Form */}
          <div className="w-full lg:flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Shipping Details</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-600 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.fullName ? 'border-red-400' : 'border-gray-100'} bg-gray-50 rounded-xl p-3 focus:border-sky-400 outline-none transition-all`}
                    placeholder="Enter your name"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle size={14}/>{errors.fullName}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-600 ml-1">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.email ? 'border-red-400' : 'border-gray-100'} bg-gray-50 rounded-xl p-3 focus:border-sky-400 outline-none transition-all`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle size={14}/>{errors.email}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-600 ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border-2 ${errors.phone ? 'border-red-400' : 'border-gray-100'} bg-gray-50 rounded-xl p-3 focus:border-sky-400 outline-none transition-all`}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle size={14}/>{errors.phone}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-600 ml-1">Full Address</label>
                <textarea
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full border-2 ${errors.address ? 'border-red-400' : 'border-gray-100'} bg-gray-50 rounded-xl p-3 focus:border-sky-400 outline-none transition-all resize-none`}
                  placeholder="Street, House No, Landmark, City..."
                />
                {errors.address && <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle size={14}/>{errors.address}</p>}
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[400px] sticky top-8">
            <div className="bg-white rounded-3xl shadow-lg border border-sky-100 overflow-hidden">
              <div className="p-5 bg-sky-50 border-b border-sky-100">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  Items in Cart <span className="bg-sky-600 text-white text-[10px] px-2 py-0.5 rounded-full">{cartItems.length}</span>
                </h3>
              </div>

              {/* Product List */}
              <div className="max-h-[350px] overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-2 bg-gray-50 rounded-2xl group border border-transparent hover:border-sky-200 transition-all">
                      <div className="w-20 h-20 shrink-0 bg-white rounded-xl overflow-hidden shadow-sm">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                          <p className="text-sky-600 font-black text-sm flex items-center mt-1">
                            <IndianRupee size={12} />{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <select 
                            value={item.quantity}
                            onChange={(e) => dispatch(updateQuantity({ id: item.id, change: Number(e.target.value) - item.quantity }))}
                            className="text-[10px] font-bold border-2 border-gray-200 rounded-lg px-1.5 py-1 outline-none bg-white focus:border-sky-400 cursor-pointer"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                            ))}
                          </select>

                          <button 
                            onClick={() => dispatch(removeItems(item.id))}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-400 text-sm italic">Your cart is empty</p>
                  </div>
                )}
              </div>

              {/* Footer Calculations */}
              <div className="p-6 bg-white border-t space-y-3">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800 flex items-center"><IndianRupee size={14}/>{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-green-600">{deliveryCharges > 0 ? `₹${deliveryCharges}` : 'FREE'}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dashed">
                  <span className="text-lg font-bold text-gray-800">Grand Total</span>
                  <span className="text-2xl font-black text-sky-600 flex items-center">
                    <IndianRupee size={22} strokeWidth={3}/>{total.toFixed(2)}
                  </span>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  disabled={cartItems.length === 0}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl mt-4 shadow-lg shadow-amber-200 transition-all active:scale-95"
                >
                  PLACE ORDER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SUCCESS MODAL --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center border-4 border-sky-100 animate-bounce-in">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={56} strokeWidth={2.5} />
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-3">Hooray!</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Order placed successfully. <br/>
              Redirecting you home in a few seconds...
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
              
              <button 
                onClick={() => navigate("/")}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95"
              >
                <Home size={20} /> Go Home Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;