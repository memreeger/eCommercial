import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaHeart, FaUser, FaCog } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useFavorite } from "../hooks/useFavorite";
import ThemeToggle from "../hooks/theme-toggle";
import CurrencySelect from "./currency";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { favorites } = useFavorite();
  const { t, i18n } = useTranslation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteCount = favorites?.length ?? 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
  const [desktopSettingsOpen, setDesktopSettingsOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const desktopProfileRef = useRef<HTMLDivElement | null>(null);
  const desktopSettingsRef = useRef<HTMLDivElement | null>(null);
  const mobileProfileRef = useRef<HTMLDivElement | null>(null);

  const shopItems = [
    { label: t("navbar.allProducts"), to: "/shop" },
    { label: t("navbar.electronics"), to: "/shop/category/electronics" },
    { label: t("navbar.jewelery"), to: "/shop/category/jewelery" },
    { label: t("navbar.womensClothing"), to: "/shop/category/womens-clothing" },
    { label: t("navbar.mensClothing"), to: "/shop/category/mens-clothing" },
    { label: t("navbar.others"), to: "/shop/category/others" },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(newLang);
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-orange-500 font-semibold dark:text-blue-400"
      : "hover:text-orange-500 transition-colors dark:hover:text-blue-500";

  // Dış tıklama ile dropdownları kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopProfileRef.current && !desktopProfileRef.current.contains(event.target as Node)) {
        setDesktopProfileOpen(false);
      }
      if (desktopSettingsRef.current && !desktopSettingsRef.current.contains(event.target as Node)) {
        setDesktopSettingsOpen(false);
      }
      if (mobileProfileRef.current && !mobileProfileRef.current.contains(event.target as Node)) {
        setMobileProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobil menü açılırken body scroll kilitle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    setDesktopProfileOpen(false);
    setDesktopSettingsOpen(false);
    setMobileProfileOpen(false);
    setMenuOpen(false);
  };

  return (
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

          {/* Desktop Menü */}
          <ul className="hidden sm:flex items-center gap-6 flex-1">
            <li>
              <NavLink to="/" className={navClass}>
                {t("navbar.home")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navClass}>
                {t("navbar.about")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navClass}>
                {t("navbar.contact")}
              </NavLink>
            </li>
          </ul>

          {/* Desktop ikonlar sağ */}
          <div className="hidden sm:flex items-center gap-4 flex-1 justify-end">
            <NavLink to="/favorites" className="relative hover:scale-110">
              <FaHeart
                size={20}
                className={favoriteCount ? "text-red-500" : "text-gray-500"}
              />
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

            {/* Desktop Settings */}
            <div className="relative" ref={desktopSettingsRef}>
              <button
                onClick={() => setDesktopSettingsOpen(prev => !prev)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:scale-110"
                aria-label="Settings"
              >
                <FaCog size={20} />
              </button>
              {desktopSettingsOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded shadow-md p-2 flex flex-col gap-2 z-50">
                  <ThemeToggle />
                  <button
                    onClick={toggleLanguage}
                    className="px-2 py-1 rounded bg-cyan-400 text-black hover:bg-cyan-800 transition"
                  >
                    {t("navbar.language")} {i18n.language === "en" ? "TR" : "EN"}
                  </button>
                  <CurrencySelect />
                </div>
              )}
            </div>

            {/* Desktop profil */}
            <div className="relative" ref={desktopProfileRef}>
              <button
                onClick={() => setDesktopProfileOpen(prev => !prev)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:scale-110"
                aria-label="Profile"
              >
                <FaUser size={20} />
              </button>
              {desktopProfileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded shadow-md p-2 flex flex-col gap-2 z-50">
                  {user ? (
                    <>
                      <span className="truncate">{user.displayName || user.email}</span>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm"
                      >
                        {t("navbar.logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        onClick={() => setDesktopProfileOpen(false)}
                        to="/login"
                        className={navClass}
                      >
                        {t("navbar.login")}
                      </NavLink>
                      <NavLink
                        onClick={() => setDesktopProfileOpen(false)}
                        to="/register"
                        className={navClass}
                      >
                        {t("navbar.register")}
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobil ikonlar */}
          <div className="sm:hidden flex items-center gap-4 ml-auto z-50 relative">
            <NavLink to="/favorites" className="relative">
              <FaHeart
                size={20}
                className={favoriteCount ? "text-red-500" : "text-gray-500"}
              />
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

            {/* Mobil profil */}
            <div className="relative" ref={mobileProfileRef}>
              <button
                onClick={() => setMobileProfileOpen(prev => !prev)}
                className="relative"
                aria-label="Profile menu"
              >
                <FaUser size={20} />
              </button>
              {mobileProfileOpen && (
                <div className="absolute right-0 top-10 bg-gray-800 text-white rounded shadow-md w-40 p-2 flex flex-col gap-2 z-50">
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
                      <NavLink
                        onClick={() => setMobileProfileOpen(false)}
                        to="/login"
                        className={navClass}
                      >
                        Login
                      </NavLink>
                      <NavLink
                        onClick={() => setMobileProfileOpen(false)}
                        to="/register"
                        className={navClass}
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alt satır: Shop kategorileri */}
        <div className="border-t border-gray-700">
          <ul className="hidden sm:flex items-center gap-6 py-2 px-6">
            {shopItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navClass} end={item.to === "/shop"}>
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
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity sm:hidden ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Mobil soldan açılan menü */}
      <div
        className={`fixed top-0 left-0 h-full w-87 bg-gray-900 z-50 transform transition-transform duration-300 sm:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col gap-4 h-full overflow-y-auto">
          {/* Üst logo ve kapatma */}
          <div className="flex items-center justify-between mb-4 w-full">
            <h1 className="text-xl font-bold text-white">NØRA</h1>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <hr className="border-gray-700 " />

          {/* Shop linkleri */}
          <span className="text-sm text-gray-400">Shop</span>
          <div className="ml-2 flex flex-col gap-2">
            {shopItems.map((item) => (
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
          <NavLink onClick={handleLinkClick} to="/" className={navClass}>
            {t("navbar.home")}
          </NavLink>
          <NavLink onClick={handleLinkClick} to="/about" className={navClass}>
            {t("navbar.about")}
          </NavLink>
          <NavLink onClick={handleLinkClick} to="/contact" className={navClass}>
            {t("navbar.contact")}
          </NavLink>

          <hr className="border-gray-700" />

          {/* Mobil profil / login logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition mt-2"
            >
              {t("navbar.logout")}
            </button>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <NavLink onClick={handleLinkClick} to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink onClick={handleLinkClick} to="/register" className={navClass}>
                Register
              </NavLink>
            </div>
          )}

          {/* ⚙️ Mobil settings bölümü */}
          <hr className="border-gray-700 mt-4" />
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-gray-400 text-sm">{t("navbar.settings")}</span>
            <ThemeToggle />
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 rounded bg-cyan-400 text-black hover:bg-cyan-800 transition"
            >
              {t("navbar.language")}{i18n.language === "en" ? "TR" : "EN"}
            </button>
            <CurrencySelect />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
