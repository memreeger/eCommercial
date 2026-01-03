import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaShoppingCart, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { FavoriteContext } from "../context/favorite-context";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { user, logout } = useAuth();
  const favCtx = useContext(FavoriteContext);

  const handleLinkClick = () => setMenuOpen(false);
  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };
  const toggleShop = () => setShopOpen(prev => !prev);

  const shopItems = [
    { label: "All Products", to: "/shop" },
    { label: "Electronics", to: "/shop/category/electronics" },
    { label: "Jewelery", to: "/shop/category/jewelery" },
    { label: "Women’s Clothing", to: "/shop/category/womens-clothing" },
    { label: "Men’s Clothing", to: "/shop/category/mens-clothing" },
    { label: "Others", to: "/shop/category/others" },
  ];

  return (
    <nav className="w-full border-b bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Üst Satır */}
        <div className="h-16 flex items-center justify-between relative">
          <h1 className="text-2xl font-bold text-white">My E-Commerce</h1>

          {/* Desktop üst menü */}
          <ul className="hidden sm:flex items-center gap-6">
            <li>
              <Link onClick={handleLinkClick} to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={handleLinkClick} to="/about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link onClick={handleLinkClick} to="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>

            {user ? (
              <li className="flex items-center gap-4">
                {/* Desktop: favoriler ve cart */}
                <Link
                  to="/favorites"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 relative"
                >
                  <FaHeart size={20} className={favCtx?.favorites?.length ? "text-red-500" : "text-gray-500"} />
                  {(favCtx?.favorites?.length ?? 0) > 0 && (
                    <span className="animate-bounce absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {favCtx?.favorites?.length ?? 0}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 relative"
                >
                  <FaShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <span className="text-white font-semibold">Hi, {user.displayName || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link onClick={handleLinkClick} to="/login" className="hover:text-blue-400 transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} to="/register" className="hover:text-blue-400 transition-colors">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobil: hamburger menü + ikonlar */}
          <div className="flex sm:hidden items-center gap-4">
            {/* Favoriler */}
            <Link
              to="/favorites"
              className="hover:text-blue-400 transition-colors flex items-center gap-1 relative"
            >
              <FaHeart size={20} className={favCtx?.favorites?.length ? "text-red-500" : "text-gray-500"} />
              {(favCtx?.favorites?.length ?? 0) > 0 && (
                <span className="animate-bounce absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {favCtx?.favorites?.length ?? 0}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="hover:text-blue-400 transition-colors flex items-center gap-1 relative"
            >
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger menü */}
            <button
              className="text-white focus:outline-none z-50"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobil: hamburger menü açılınca gözükecek */}
        {menuOpen && (
          <ul className="flex flex-col sm:hidden gap-4 py-2 px-6 bg-gray-800">
            <li>
              <Link onClick={handleLinkClick} to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={handleLinkClick} to="/about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link onClick={handleLinkClick} to="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
            {user ? (
              <li className="flex items-center gap-2">
                <span className="text-white font-semibold">
                  Hi, {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link onClick={handleLinkClick} to="/login" className="hover:text-blue-400 transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} to="/register" className="hover:text-blue-400 transition-colors">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}

        {/* Alt Satır: Shop Menüsü */}
        <div className="border-t border-gray-700">
          <ul className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-2 px-6">
            {/* Mobil: toggle */}
            <li className="sm:hidden relative w-full">
              <button
                onClick={toggleShop}
                className="flex items-center justify-between w-full hover:text-blue-400 transition-colors py-1"
              >
                Shop <FaChevronDown className="text-sm mt-1" />
              </button>

              {shopOpen && (
                <ul className="flex flex-col mt-2 w-full bg-gray-900 text-gray-200 shadow-lg rounded z-50">
                  {shopItems.map(item => (
                    <li key={item.to}>
                      <Link
                        onClick={handleLinkClick}
                        to={item.to}
                        className="px-4 py-2 rounded block hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Desktop: tüm Shop linkleri direkt */}
            {shopItems.map(item => (
              <li key={item.to} className="hidden sm:block">
                <Link
                  onClick={handleLinkClick}
                  to={item.to}
                  className="hover:text-blue-400 transition-colors py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
