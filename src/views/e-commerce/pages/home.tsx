import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "@/services/fakestoreapi/productService";
import type { Product } from "../types/product";
import ProductCard from "../components/product-card";

const Home: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextIndex, setNextIndex] = useState(8);
    const [searchTerm, setSearchTerm] = useState(""); // search state

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getProducts()
            .then(res => {
                setAllProducts(res.data);
                setVisibleProducts(res.data.slice(0, 8)); // İlk 8 ürün
            })
            .finally(() => setLoading(false));
    }, []);

    const handleShopNow = () => {
        navigate("/shop");
    };

    const loadMore = () => {
        const nextProducts = allProducts.slice(nextIndex, nextIndex + 8);
        setVisibleProducts(prev => [...prev, ...nextProducts]);
        setNextIndex(prev => prev + 8);
    };

    // Arama ile filtreleme
    const filteredProducts = visibleProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col pt-10">
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-32 px-6 text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our Shop</h1>
                <p className="text-xl mb-6">
                    Discover high quality products at the best prices. Find your style today!
                </p>
                <button
                    onClick={handleShopNow}
                    className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                    Shop Now
                </button>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {visibleProducts.length < allProducts.length && (
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
