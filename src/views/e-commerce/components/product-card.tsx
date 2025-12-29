import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/shop/product/${product.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
        >
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 sm:h-48 md:h-40 lg:h-48 object-contain mb-4"
            />
            <div className="flex-1 flex flex-col justify-between">
                <h3 className="font-semibold mb-2 text-sm sm:text-base md:text-lg">{product.title}</h3>
                <p className="text-blue-500 font-bold text-lg mt-2">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
