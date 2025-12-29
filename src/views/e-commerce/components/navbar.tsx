import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/cart-context";

const Navbar: React.FC = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [shopOpen, setShopOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
        setShopOpen(false);
    };

    return (
        <nav className="w-full border-b bg-gray-900 text-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
                <h1 className="text-2xl font-bold text-white">My E-Commerce</h1>

                {/* Hamburger Button */}
                <button
                    className="sm:hidden text-white focus:outline-none z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Menü */}
                <ul className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8
                    absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-900 sm:bg-transparent
                    transition-all duration-300 ${menuOpen ? "block" : "hidden sm:flex"} px-6 sm:px-0 py-4 sm:py-0`}>

                    <li>
                        <Link onClick={handleLinkClick} to="/" className="hover:text-blue-400 transition-colors block py-1 sm:py-0">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLinkClick} to="/about" className="hover:text-blue-400 transition-colors block py-1 sm:py-0">
                            About
                        </Link>
                    </li>

                    {/* Shop */}
                    <li className="relative">
                        <button
                            onClick={() => setShopOpen(!shopOpen)}
                            className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-start hover:text-blue-400 transition-colors py-1"
                        >
                            Shop <FaChevronDown className="text-sm mt-1" />
                        </button>

                        {(menuOpen || shopOpen) && (
                            <ul className={`flex flex-col sm:absolute sm:left-0 sm:top-full mt-2 sm:mt-2 w-full sm:w-56 bg-gray-900 text-gray-200 shadow-lg rounded z-50`}>
                                {[
                                    { label: "All Products", to: "/shop" },
                                    { label: "Electronics", to: "/shop/category/electronics" },
                                    { label: "Jewelery", to: "/shop/category/jewelery" },
                                    { label: "Women’s Clothing", to: "/shop/category/womens-clothing" },
                                    { label: "Men’s Clothing", to: "/shop/category/mens-clothing" },
                                    { label: "Others", to: "/shop/category/others" },
                                ].map((item) => (
                                    <li key={item.to}>
                                        <Link
                                            onClick={handleLinkClick}
                                            to={item.to}
                                            className="px-4 py-2 rounded block
                                                hover:bg-blue-600 hover:text-white
                                                focus:bg-blue-600 focus:text-white
                                                transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link onClick={handleLinkClick} to="/contact" className="hover:text-blue-400 transition-colors block py-1 sm:py-0">
                            Contact
                        </Link>
                    </li>

                    {/* Cart */}
                    <li className="relative">
                        <Link onClick={handleLinkClick} to="/cart" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                            <FaShoppingCart size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
