import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { FavoriteContext } from "../context/favorite-context";
import { addFavorite, removeFavorite } from "../../../services/firebase/favorite-service";
import { useCart } from "../hooks/useCart";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const favCtx = useContext(FavoriteContext);

    const [liked, setLiked] = useState(false);

    // Tek state ile tüm mesaj & warning yönettim
    const [notifications, setNotifications] = useState<{
        fav?: string;
        favWarning?: string;
        cart?: string;
        cartWarning?: string;
    }>({});

    useEffect(() => {
        if (!favCtx || !user) return;

        const isFavorite = favCtx.favorites.some(
            (fav: any) => fav.id === product.id.toString()
        );

        setLiked(isFavorite);
    }, [favCtx?.favorites, user, product.id]);

    const handleClick = () => {
        navigate(`/shop/product/${product.id}`);
    };

    const handleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!user) {
            setNotifications({ fav: "", favWarning: "To add favorite this product, need to login" });
            setTimeout(() => setNotifications((prev) => ({ ...prev, favWarning: "" })), 2000);
            return;
        }

        if (!liked) {
            await addFavorite(user.uid, product);
            setLiked(true);
            setNotifications({ fav: "Added to favorites", favWarning: "" });
        } else {
            await removeFavorite(user.uid, product.id);
            setLiked(false);
            setNotifications({ fav: "Deleted from favorites", favWarning: "" });
        }

        favCtx?.refreshFavorites();
        setTimeout(() => setNotifications((prev) => ({ ...prev, fav: "" })), 1500);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!user) {
            setNotifications({ ...notifications, cart: "", cartWarning: "To add to cart, need to login" });
            setTimeout(() => setNotifications((prev) => ({ ...prev, cartWarning: "" })), 2000);
            return;
        }

        addToCart(product);
        setNotifications({ ...notifications, cart: "Added to cart", cartWarning: "" });
        setTimeout(() => setNotifications((prev) => ({ ...prev, cart: "" })), 1500);
    };

    return (
        <div
            onClick={handleClick}
            className="relative border rounded-lg p-4 cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
        >
            <button
                onClick={handleFavorite}
                className={`absolute top-3 right-3 text-xl z-10 transform transition-transform duration-300 hover:scale-125 ${liked ? "text-red-500" : "text-gray-400"}`}
            >
                <FaHeart />
            </button>

            {/* Mesaj ve warningler */}
            {notifications.fav && (
                <span className="absolute top-12 right-3 text-xs bg-black text-white px-2 py-1 rounded">
                    {notifications.fav}
                </span>
            )}
            {notifications.favWarning && (
                <span className="absolute top-12 right-3 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                    {notifications.favWarning}
                </span>
            )}
            {notifications.cart && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    {notifications.cart}
                </span>
            )}
            {notifications.cartWarning && (
                <span className="absolute bottom-3 left-3 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                    {notifications.cartWarning}
                </span>
            )}

            <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 sm:h-48 md:h-40 lg:h-48 object-contain mb-4"
            />
            <div className="flex-1 flex flex-col justify-between">
                <h3 className="font-semibold mb-2 text-sm sm:text-base md:text-lg">{product.title}</h3>
                <p className="text-blue-500 font-bold text-lg mt-2">${product.price}</p>
            </div>

            <button
                onClick={handleAddToCart}
                className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
