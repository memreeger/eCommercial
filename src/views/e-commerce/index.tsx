import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Products from "./pages/products";
import Contact from "./pages/contact";
import ProductDetail from "./pages/product-detail";
import Footer from "./components/footer";
import { CartProvider } from "./context/cart-context";
import Cart from "./pages/cart";
import Checkout from "./pages/check-out";
import CreditCardForm from "./pages/credit-card-form";
import NotFound from "./pages/404-not-found";
import Favorites from "./pages/favorites";
import Login from "./pages/login";
import Register from "./pages/register";
import ResetPassword from "./pages/reset-password";
import { ThemeProvider } from "./context/theme-context";
import CurrencyProvider from "./context/currency-context";

const ECommerceApp: React.FC = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <ThemeProvider>
                    <CurrencyProvider>
                        <div className="flex flex-col min-h-screen bg-white transition-colors dark:bg-black">
                            <Navbar />
                            {/* <div className="pt-18"></div>  MOBİLDE PATLIYOR*/}

                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/shop" element={<Products />} />
                                    <Route path="/shop/category/:category" element={<Products />} />
                                    <Route path="/shop/product/:id" element={<ProductDetail />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/checkout/credit-card" element={<CreditCardForm />} />
                                    <Route path="/favorites" element={<Favorites />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/reset-password" element={<ResetPassword />} />

                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </CurrencyProvider>
                </ThemeProvider>
            </CartProvider>
        </BrowserRouter>
    );
};

export default ECommerceApp;
