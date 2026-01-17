import React, { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductCard from "../components/product-card";
import { getProducts } from "../../../services/fakestoreapi/productService";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();

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

    // const filteredProducts = allProducts
    //     .filter(product =>
    //         product.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //     .slice(0, visibleCount);
    const filteredProducts = allProducts
        .filter(product => {
            const search = searchTerm.toLowerCase();

            // Tüm dillerdeki title ve description
            const titles = [
                t(`products.${product.id}.title`, { lng: "en", defaultValue: product.title }),
                t(`products.${product.id}.title`, { lng: "tr", defaultValue: product.title })
            ];

            const descriptions = [
                t(`products.${product.id}.description`, { lng: "en", defaultValue: product.description }),
                t(`products.${product.id}.description`, { lng: "tr", defaultValue: product.description })
            ];

            // Eğer search term herhangi bir title veya description içinde geçiyorsa göster
            return titles.some(title => title.toLowerCase().includes(search)) ||
                descriptions.some(desc => desc.toLowerCase().includes(search));
        })
        .slice(0, visibleCount);
    // localStorage.clear()
    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-blue-500 dark:to-blue-600 text-white dark:text-white py-10 px-6 text-center">
                <h1 className="text-3xl font-bold mb-4">{t("homePage.hero.title")}</h1>
                <p className="text-xl mb-6">
                    {t("homePage.hero.subtitle")}
                </p>
            </section>

            {/* Products Section */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold mb-6 text-center">{t("homePage.products.featuredTitle")}</h2>

                {/* Search Input */}
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder={t("homePage.products.searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                   bg-white text-gray-900  border-gray-300 
                                   dark:focus:ring-orange-500
                                   dark:bg-gray-200
                                   dark:text-black
                                   dark:border-gray-700"
                    />
                </div>

                {/* Loading */}
                {loading ? (
                    <p className="text-center mt-10">{t("homePage.products.loading")}</p>
                ) : (
                    <>
                        {/* No products found */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center mt-6 flex flex-col items-center text-gray-500 dark:text-gray-400 animate-fadeIn">
                                <span className="text-3xl mb-4">🔍</span>
                                <p className="text-lg font-medium">
                                    {t("homePage.products.noResults")}
                                </p>
                            </div>
                        ) : (
                            // Products Grid
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Load More Button */}
                        {filteredProducts.length < allProducts.filter(product =>
                            product.title.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length ? (
                            <div className="text-center mt-8">
                                <button
                                    onClick={loadMore}
                                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition
                                               dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    {t("homePage.products.loadMore")}
                                </button>
                            </div>
                        ) : (
                            <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
                                {t("homePage.products.endMessage")}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default Home;
