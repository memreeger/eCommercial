import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "../components/product-card";
import {
    getProducts,
    getProductsByCategory,
} from "../../../services/fakestoreapi/productService";
import SortSelect from "../components/sort";
import { useTranslation } from "react-i18next";

const PRODUCTS_PER_PAGE = 8;

const mainCategories = [
    "electronics",
    "jewelery",
    "women's clothing",
    "men's clothing",
];

// URL'de düzgün görünmesi için
const categoryMap: Record<string, string> = {
    electronics: "electronics",
    jewelery: "jewelery",
    "womens-clothing": "women's clothing",
    "mens-clothing": "men's clothing",
};

export type SortType = "price-asc" | "price-desc";

const Products: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // direkt 1. sayfa için

    const { t } = useTranslation();

    useEffect(() => {
        const pageParam = parseInt(searchParams.get("page") || "1", 10);
        const sortParam = searchParams.get("sort") as SortType || "";

        setCurrentPage(pageParam);
        setLoading(true);

        const actualCategory =
            category === "others"
                ? "others"
                : category
                    ? categoryMap[category]
                    : undefined;

        const request =
            actualCategory === "others"
                ? getProducts().then((res) => ({
                    data: res.data.filter((p: Product) => {
                        const cat = (p.category || "").toLowerCase();
                        if (cat === "men's clothing" && p.title.toLowerCase().includes("backpack")) return true;
                        return !mainCategories.includes(cat);
                    }),
                }))
                : actualCategory
                    ? getProductsByCategory(actualCategory)
                    : getProducts();

        request
            .then((res) => {
                let sortedProducts = [...res.data];

                if (sortParam === "price-asc") sortedProducts.sort((a, b) => a.price - b.price);
                if (sortParam === "price-desc") sortedProducts.sort((a, b) => b.price - a.price);

                setProducts(sortedProducts);
            })
            .finally(() => setLoading(false));
    }, [category, searchParams]);

    // Pagination & Sayfalama işlemleri
    const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSearchParams({
            page: page.toString(),
            sort: searchParams.get("sort") || "",
        });
    };

    if (loading) {
        return <p className="text-center mt-10">{t("productPage.loading")}</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize">
                    {category ? category.replace(/-/g, " ") : "All Products"}
                </h2>

                {/* SORTING ALGORITMA */}
                <SortSelect searchParams={searchParams} setSearchParams={setSearchParams} />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center sm:justify-start mt-8 gap-2">
                    {Array.from(
                        { length: totalPages },
                        (_, i) => i + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`
                                
                                px-4 py-2 border rounded  ${page === currentPage
                                    ? "bg-orange-500 text-white dark:bg-blue-400 dark:text-black"
                                    : "bg-white text-gray-800 dark:bg-"
                                } hover:bg-orange-600 hover:text-white transition dark:hover:bg-blue-600`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
