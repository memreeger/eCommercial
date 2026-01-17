import ProductCard from "../components/product-card";
import { Link } from "react-router-dom";
import { useFavorite } from "../hooks/useFavorite";
import { useTranslation } from "react-i18next";

const FavoritesPage: React.FC = () => {
    // const favCtx = useContext(FavoriteContext);
    const { favorites } = useFavorite();
    const { t } = useTranslation();

    if (!favorites) return <p className="text-center mt-10 dark:bg-black dark:text-white">{t("favoritesPage.loading")}</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center
            dark:bg-black dark:text-white">
                {t("favoritesPage.title")}
            </h1>

            {favorites.length === 0 ? (
                <div
                    className="flex flex-col items-center justify-center text-center"
                    style={{ minHeight: 'calc(100vh - 500px)' }}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4
                    dark:bg-black dark:text-white">
                        {t("favoritesPage.emptyTitle")}
                    </h2>
                    <p className="text-gray-600 mb-6
                    dark:bg-black dark:text-white">
                        {t("favoritesPage.emptyDesc")}
                    </p>
                    <Link
                        to="/shop"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md font-medium transition
                        dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        {t("favoritesPage.goToShop")}
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
