import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import type { Product } from "../types/product";
import { useFavorite } from "../hooks/useFavorite";
import { useCart } from "../hooks/useCart";
import { useCurrency } from "../hooks/useCurrency";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorite();
    const { currency, convertPrice } = useCurrency();

    const [notifications, setNotifications] = useState<{ fav?: string; cart?: string }>({});

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isFavorite(product.id)) {
            addFavorite(product);
            setNotifications({ fav: "Added to favorites" });
        } else {
            removeFavorite(product.id);
            setNotifications({ fav: "Removed from favorites" });
        }
        setTimeout(() => setNotifications({}), 1500);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        setNotifications({ cart: "Added to cart" });
        setTimeout(() => setNotifications({}), 1500);
    };

    const liked = isFavorite(product.id);

    return (
        <div
            onClick={() => navigate(`/shop/product/${product.id}`)}
            className="relative border rounded-lg p-4 cursor-pointer hover:shadow-lg transition flex flex-col justify-between
            dark:bg-gray-200"
        >
            <button
                onClick={handleFavorite}
                className={`absolute top-3 right-3 text-xl z-10 transform transition-transform duration-300 hover:scale-125 ${liked ? "text-red-500" : "text-gray-400"
                    }`}
            >
                <FaHeart />
            </button>

            {notifications.fav && (
                <span className="absolute top-12 right-3 text-xs bg-black text-white px-2 py-1 rounded">
                    {notifications.fav}
                </span>
            )}
            {notifications.cart && (
                <span className="absolute bottom-3 left-3 text-xs bg-black text-white px-2 py-1 rounded">
                    {notifications.cart}
                </span>
            )}

            <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-56 sm:h-48 md:h-40 lg:h-48 object-contain mb-4"
            />
            <div className="flex-1 flex flex-col justify-between">
                <h3 className="font-semibold mb-2 text-sm sm:text-base md:text-lg dark:text-black">{product.title}</h3>
                <p className="text-blue-500 font-bold text-lg mt-2 dark:text-orange-500">{convertPrice(product.price).toFixed(2)} {currency}</p>
            </div>

            <button
                onClick={handleAddToCart}
                className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition 
                dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
