import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaHeart, FaUser } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useFavorite } from "../hooks/useFavorite";
import ThemeToggle from "../hooks/theme-toggle";
import CurrencySelect from "./currency";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { favorites } = useFavorite();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteCount = favorites?.length ?? 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const shopItems = [
    { label: "All Products", to: "/shop" },
    { label: "Electronics", to: "/shop/category/electronics" },
    { label: "Jewelery", to: "/shop/category/jewelery" },
    { label: "Women’s Clothing", to: "/shop/category/womens-clothing" },
    { label: "Men’s Clothing", to: "/shop/category/mens-clothing" },
    { label: "Others", to: "/shop/category/others" },
  ];

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-orange-500 font-semibold dark:text-blue-400 " : "hover:text-orange-500 transition-colors dark:hover:text-blue-500";

  return (
        // <nav className="w-full bg-gray-900 text-gray-200 border-b border-gray-700 fixed top-0 left-0 z-50"> mobilde patlıyor
        <nav className="w-full bg-gray-900 text-gray-200 border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-6">
        {/* Üst satır */}
        <div className="h-16 flex items-center justify-between relative">
          {/* Hamburger (mobil) */}
          <button
            className="sm:hidden text-white z-50"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars size={24} />
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
            NØRA
          </div>

          {/* Desktop/Tablet: Menü solda */}
          <ul className="hidden sm:flex items-center gap-6 flex-1">
            <li><NavLink to="/" className={navClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={navClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={navClass}>Contact</NavLink></li>
          </ul>

          {/* Desktop/Tablet: İkonlar sağda */}
          <div className="hidden sm:flex items-center gap-4 flex-1 justify-end">
            <NavLink to="/favorites" className="relative hover:scale-110">
              <FaHeart size={20} className={favoriteCount ? "text-red-500" : "text-gray-500"} />
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {favoriteCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/cart" className="relative hover:scale-110">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </NavLink>


            <ThemeToggle />


            <CurrencySelect />


            {/* Profil dropdown desktop */}
            <div className="relative" ref={profileRef} >

              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex items-center gap-4 px-1 rounded cursor-pointer hover:scale-110"
              >
                <FaUser size={20} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded shadow-md p-2 flex flex-col gap-1 z-50">
                  {user ? (
                    <>
                      <span className="truncate">{user.displayName || user.email}</span>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink onClick={() => setProfileOpen(false)} to="/login" className={navClass}>Login</NavLink>
                      <span className="border border-red-300"></span>
                      <NavLink onClick={() => setProfileOpen(false)} to="/register" className={navClass}>Register</NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobil: ikonlar sağda */}
          <div className="sm:hidden flex items-center gap-4 ml-auto z-50 relative">
            <NavLink to="/favorites" className="relative">
              <FaHeart size={20} className={favoriteCount ? "text-red-500 " : "text-gray-500"} />
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {favoriteCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/cart" className="relative">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className=" absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </NavLink>

            <ThemeToggle />

            {/* Profil ikon mobil */}
            <button
              onClick={() => setProfileOpen(prev => !prev)}
              className="relative "
              aria-label="Profile menu"
            >
              <FaUser size={20} />
            </button>

            {/* Profil dropdown mobil */}

            {profileOpen && (
              <div className="absolute right-0 top-10 bg-gray-800 text-white rounded shadow-md w-40 p-2 flex flex-col gap-1 z-50">
                {user ? (
                  <>
                    <span className="font-medium truncate">{user.displayName || user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink onClick={() => setProfileOpen(false)} to="/login" className={navClass}>Login</NavLink>
                    <span className="border border-red-200"></span>
                    <NavLink onClick={() => setProfileOpen(false)} to="/register" className={navClass}>Register</NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Alt satır: Shop kategorileri */}
        <div className="border-t border-gray-700">
          <ul className="hidden sm:flex items-center gap-6 py-2 px-6">
            {shopItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={navClass}
                  end={item.to === "/shop"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity sm:hidden
        ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobil soldan açılan menü */}

      <div
        className={`fixed top-0 left-0 h-full w-87 bg-gray-900 z-50
  transform transition-transform duration-300 sm:hidden
  ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="p-6 flex flex-col gap-4 h-full overflow-y-auto">
          {/* Üst logo ve kapatma butonu */}
          <div className="flex items-center justify-between mb-4 w-full">
            <h1 className="text-xl font-bold text-white">NØRA</h1>

            <div className="flex items-center gap-8">
              <CurrencySelect />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>
          <hr className="border-gray-700 " />

          {/* Menü linkleri */}

          <span className="text-sm text-gray-400">Shop</span>
          <div className="ml-2 flex flex-col gap-2">
            {shopItems.map(item => (
              <NavLink
                key={item.to}
                onClick={handleLinkClick}
                to={item.to}
                className={navClass}
                end={item.to === "/shop"}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <hr className="border-gray-700" />

          <NavLink onClick={handleLinkClick} to="/" className={navClass}>Home</NavLink>
          <NavLink onClick={handleLinkClick} to="/about" className={navClass}>About</NavLink>
          <NavLink onClick={handleLinkClick} to="/contact" className={navClass}>Contact</NavLink>

          <hr className="border-gray-700" />

          {/* Mobil menü içi profil/login/logout */}
          <h4> {user?.displayName}</h4>
          {user ? (

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition mt-2"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <NavLink onClick={handleLinkClick} to="/login" className={navClass}>Login</NavLink>
              <NavLink onClick={handleLinkClick} to="/register" className={navClass}>Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
