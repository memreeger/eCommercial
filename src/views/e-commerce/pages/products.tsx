import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "../components/product-card";
import { getProducts, getProductsByCategory } from "../../../services/fakestoreapi/productService";

const PRODUCTS_PER_PAGE = 8;
const mainCategories = ["electronics", "jewelery", "women's clothing", "men's clothing"];


{/*URL'de düzgün görünmesi için */ }
const categoryMap: Record<string, string> = {
    electronics: "electronics",
    jewelery: "jewelery",
    "womens-clothing": "women's clothing",
    "mens-clothing": "men's clothing",
};

const Products: React.FC = () => {
    const { category } = useParams<{ category?: string }>();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        setCurrentPage(1);

        const actualCategory = category === "others" ? "others" : category ? categoryMap[category] : undefined;

        const request =
            actualCategory === "others"
                ? getProducts().then(res => ({
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
            .then(res => setProducts(res.data))
            .finally(() => setLoading(false));
    }, [category]);

    // Pagination için sayfa işlemleri
    const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 capitalize text-center sm:text-left">
                {category ? category.replace(/-/g, " ") : "All Products"}              {/*/-/ tüm "-" işaretlerini bul.  "g" ise tüm stringte bul demek. */}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center sm:justify-start mt-8 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-800"} hover:bg-blue-500 hover:text-white transition`}
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
