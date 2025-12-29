import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import { getProductById } from "@/services/fakestoreapi/productService";
import { useCart } from "../context/cart-context";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            setLoading(true);
            getProductById(Number(id))
                .then(res => setProduct(res.data))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!product) return <p className="text-center mt-10">Product not found.</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full md:w-1/2 h-80 md:h-96 object-contain mx-auto"
                />

                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-2xl font-bold text-blue-500 mb-6">${product.price}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            onClick={() => addToCart(product)}
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
