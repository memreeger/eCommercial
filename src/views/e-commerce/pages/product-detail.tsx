import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import { getProductById } from "../../../services/fakestoreapi/productService";
import { useCart } from "../hooks/useCart";
import { useFavorite } from "../hooks/useFavorite";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../hooks/useCurrency";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();
    const { favorites, addFavorite, removeFavorite } = useFavorite();

    const { t } = useTranslation();

    const { currency, convertPrice } = useCurrency();

    const [liked, setLiked] = useState(false);
    const [notifications, setNotifications] = useState<{ fav?: string; cart?: string; favWarning?: string; cartWarning?: string }>({});

    // Ürün çekme
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getProductById(Number(id))
            .then(res => setProduct(res.data))
            .finally(() => setLoading(false));
    }, [id]);

    // Liked state'ini güncelle
    useEffect(() => {
        if (!product) return;
        const isFav = favorites.some(f => f.id === product.id);
        setLiked(isFav);
    }, [favorites, product]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setNotifications({ cart: `${t("productDetail.addedToCart")}` });
        setTimeout(() => setNotifications({}), 1500);
    };

    const handleFavorite = () => {
        if (!product) return;

        if (!liked) {
            addFavorite(product);
            setLiked(true);
            setNotifications({ fav: `${t("productDetail.addedToFavorites")}` });
        } else {
            removeFavorite(product.id);
            setLiked(false);
            setNotifications({ fav: `${t("productDetail.removedFromFavorites")}` });
        }

        setTimeout(() => setNotifications({}), 1500);
    };

    if (loading) return <p className="text-center mt-10">{t("productDetail.loading")}</p>;
    if (!product) return <p className="text-center mt-10">{t("productDetail.notFound")}</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="relative md:w-1/2 flex flex-col items-center">
                    <img src={product.image} alt={product.title} className="w-full h-80 md:h-96 object-contain
                    dark:bg-gray-200" />

                    <button
                        onClick={handleFavorite}
                        className={`absolute top-4 right-4 text-2xl z-10 transform transition-transform duration-300 hover:scale-125 ${liked ? "text-red-500" : "text-gray-400"}`}
                    >
                        <FaHeart />
                    </button>

                    {notifications.fav && (
                        <div className="mt-2 text-green-700 text-sm bg-green-100 px-2 py-1 rounded">
                            {notifications.fav}
                        </div>
                    )}
                </div>

                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4 dark:text-gray-200"> {t(`products.${product.id}.title`)}</h1>
                        <p className="text-gray-700 mb-4 dark:text-gray-500"> {t(`products.${product.id}.description`)}</p>
                        <p className="text-2xl font-bold text-blue-500 mb-6 dark:text-orange-500">{convertPrice(product.price).toFixed(2)} {currency}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition
                            dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            {t("productDetail.addToCart")}
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                        >
                            {t("productDetail.goBack")}
                        </button>
                        {notifications.cart && (
                            <div className="text-green-700 text-sm bg-green-200 px-2 py-1 rounded mt-2">
                                {notifications.cart}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
