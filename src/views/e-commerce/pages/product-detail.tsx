import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import { getProductById } from "../../../services/fakestoreapi/productService";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { FavoriteContext } from "../context/favorite-context";
import { addFavorite, removeFavorite } from "../../../services/firebase/favorite-service";
import { FaHeart } from "react-icons/fa";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();
    const { user } = useAuth();
    const favCtx = useContext(FavoriteContext);

    const [liked, setLiked] = useState(false);

    // Notifications state
    const [notifications, setNotifications] = useState<{
        fav?: string;
        favWarning?: string;
        cart?: string;
        cartWarning?: string;
    }>({});

    useEffect(() => {
        if (id) {
            setLoading(true);
            getProductById(Number(id))
                .then((res: any) => setProduct(res.data))
                .finally(() => setLoading(false));
        }
    }, [id]);

    useEffect(() => {
        if (!favCtx || !user || !product) return;

        const isFavorite = favCtx.favorites.some(
            (fav: any) => fav.id === product.id.toString()
        );

        setLiked(isFavorite);
    }, [favCtx?.favorites, user, product]);

    const handleAddToCart = () => {
        if (!user) {
            setNotifications({ cartWarning: "You need to login to add products" });
            setTimeout(() => setNotifications({}), 2000);
            return;
        }

        if (product) addToCart(product);
        setNotifications({ cart: "Product added to cart" });
        setTimeout(() => setNotifications({}), 1500);
    };

    const handleFavorite = () => {
        if (!user || !product) {
            setNotifications({ favWarning: "You need to login to add favorites" });
            setTimeout(() => setNotifications({}), 2000);
            return;
        }

        if (!liked) {
            addFavorite(user.uid, product);
            setLiked(true);
            setNotifications({ fav: "Added to favorites" });
        } else {
            removeFavorite(user.uid, product.id);
            setLiked(false);
            setNotifications({ fav: "Removed from favorites" });
        }

        favCtx?.refreshFavorites();
        setTimeout(() => setNotifications({}), 1500);
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!product) return <p className="text-center mt-10">Product not found.</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="relative md:w-1/2 flex flex-col items-center">
                    {/* Product image */}
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-80 md:h-96 object-contain"
                    />

                    {/* Favorite button */}
                    <button
                        onClick={handleFavorite}
                        className={`absolute top-4 right-4 text-2xl z-10 transform transition-transform duration-300 hover:scale-125 ${liked ? "text-red-500" : "text-gray-400"}`}
                    >
                        <FaHeart />
                    </button>

                    {/* Favorite notifications
                    <div className="mt-2 flex flex-col gap-1">
                        {notifications.fav && (
                            <div className="text-green-700 text-sm bg-green-100 px-2 py-1 rounded">
                                {notifications.fav}
                            </div>
                        )}
                        {notifications.favWarning && (
                            <div className="text-yellow-700 text-sm bg-yellow-100 px-2 py-1 rounded">
                                {notifications.favWarning}
                            </div>
                        )}
                    </div> */}
                </div>

                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-2xl font-bold text-blue-500 mb-6">${product.price}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 relative">
                        {/* Cart notifications */}
                        <div className="absolute -top-8 left-0 flex flex-col gap-1">
                            {notifications.cart && (
                                <div className="text-green-700 text-sm bg-green-100 px-2 py-1 rounded">
                                    {notifications.cart}
                                </div>
                            )}
                            {notifications.cartWarning && (
                                <div className="text-yellow-700 text-sm bg-yellow-100 px-2 py-1 rounded">
                                    {notifications.cartWarning}
                                </div>
                            )}
                        </div>
                        {/* Favorite notifications */}
                        <div className="mt-2 flex flex-col gap-1">
                            {notifications.fav && (
                                <div className="text-green-700 text-sm bg-green-100 px-2 py-1 rounded">
                                    {notifications.fav}
                                </div>
                            )}
                            {notifications.favWarning && (
                                <div className="text-yellow-700 text-sm bg-yellow-100 px-2 py-1 rounded">
                                    {notifications.favWarning}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                        >
                            ← Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
