import { useContext } from "react";
import { FavoriteContext } from "../context/favorite-context";
import ProductCard from "../components/product-card";

const FavoritesPage: React.FC = () => {
    const favCtx = useContext(FavoriteContext);

    if (!favCtx) return <p>Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
            {favCtx.favorites.length === 0 ? (
                <p className="text-gray-500">You have no favorite products yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favCtx.favorites.map((product: any) => (                   //context içindeki favorileri map ile gezip gösterdim.
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
