import React, { useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react"; // Clean icon library
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../Utlilites/searchSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((store)=>store.cart.items)
  const dispatch = useDispatch();
  

  return (
    <header>
      <nav className="bg-amber-400 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* 1. Interactive Logo */}
            <div className="shrink-0 flex items-center group cursor-pointer">
              <div className=" p-1 rounded-full group-hover:rotate-12 transition-transform text-2xl">
                🌎
              </div>
              <span className="ml-2 font-black text-xl tracking-tighter">
                Shoppy<span className="text-sky-600">Globe</span>
              </span>
            </div>

            {/* 2. Desktop Search (Hidden on Mobile) */}
            <div className="hidden md:flex flex-1 justify-center px-8">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full py-1.5 pl-10 pr-4 focus:ring-2 focus:ring-amber-600 outline-none bg-white"
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
                <Search
                  className="absolute left-3 top-2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* 3. Desktop Menu & Mobile Toggle */}
            <div className="flex items-center gap-4">
              {/* Desktop Links */}
              <ul className="hidden md:flex gap-6 font-medium">
                <li className="hover:text-white cursor-pointer flex gap-1">
                  <ShoppingCart />
                  Cart {cartItems? "0":cartItems}
                </li>
                <li className="hover:text-white cursor-pointer">
                    <Link to={'/checkout'}>
                                        Checkout
                    </Link>
                    </li>
              </ul>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-md hover:bg-amber-500 transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* 4. Mobile Dropdown Menu (Animated) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pt-2 pb-6 space-y-3 bg-amber-300 border-t border-amber-200">
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg p-2 bg-white"
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-4 font-semibold text-lg pt-2">
              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                <ShoppingCart size={20} /> Cart {cartItems? "0":cartItems}
              </div>
              <div className="hover:text-white cursor-pointer">
              <Link to={'/checkout'}>
                                        Checkout
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
