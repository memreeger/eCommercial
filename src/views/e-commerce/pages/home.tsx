import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "../components/product-card";
import { getProducts } from "../../../services/fakestoreapi/productService";

const Home: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(8); // kaç ürün gösteriliyor
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        getProducts()
            .then((res: any) => {
                setAllProducts(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const loadMore = () => {
        setVisibleCount(prev => prev + 8);
    };

    // Arama + Pagination mantığı
    const filteredProducts = allProducts
        .filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, visibleCount); // sadece visibleCount kadar göster

    return (
        <div className="flex flex-col">
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10 px-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to NØRA Shop</h1>
                <p className="text-xl mb-6">
                    Discover high quality products at the best prices. Find your style today!
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>

                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {loading ? (
                    <p className="text-center mt-10">Loading...</p>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center mt-6 flex flex-col items-center text-gray-500 animate-fadeIn">
                                <span className="text-3xl mb-4">🔍</span>
                                <p className="text-lg font-medium">
                                    We couldn't find any products matching your search.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}


                        {filteredProducts.length < allProducts.filter(product =>
                            product.title.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={loadMore}
                                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                    </>
                )}
            </section>
        </div>
    );
};


export default Home;
