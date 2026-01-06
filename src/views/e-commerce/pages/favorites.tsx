import ProductCard from "../components/product-card";
import { Link } from "react-router-dom";
import { useFavorite } from "../hooks/useFavorite";

const FavoritesPage: React.FC = () => {
    // const favCtx = useContext(FavoriteContext);
    const {favorites} = useFavorite();

    if (!favorites) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
                Your Favorites
            </h1>

            {favorites.length === 0 ? (
                <div
                    className="flex flex-col items-center justify-center text-center"
                    style={{ minHeight: 'calc(100vh - 500px)' }}
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
                        You haven't added any favorites yet
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Browse our products and add your favorites to see them here.
                    </p>
                    <Link
                        to="/shop"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition"
                    >
                        Go to Shop
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
