import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCurrency } from "../hooks/useCurrency";

const Cart: React.FC = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const { currency, convertPrice } = useCurrency();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0)
        return (
            <div
                className="flex flex-col items-center justify-center text-center px-4 dark:bg-black dark:text-white"
                style={{ minHeight: 'calc(100vh - 400px)' }}
            >
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4 dark:bg-black dark:text-white">
                    Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6 dark:bg-black dark:text-white">
                    Browse our shop and add items to your cart to see them here.
                </p>
                <Link
                    to="/shop"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md font-medium transition
                    dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Go to Shop
                </Link>
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 dark:bg-black dark:text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center md:text-left">
                Your Cart
            </h2>

            <div className="flex flex-col gap-6 dark:bg-black dark:text-white">
                {cart.map(item => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-gray-100 p-4 rounded-lg shadow
                        dark:bg-gray-300 dark:text-white"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full sm:w-24 h-24 object-contain mb-4 sm:mb-0"
                        />
                        <div className="flex-1 sm:ml-4 text-center sm:text-left mb-4 sm:mb-0">
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-600">{convertPrice(item.price).toFixed(2)} {currency}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition dark:text-black"
                            >
                                -
                            </button>
                            <span className="px-2 font-medium dark:text-black">{item.quantity}</span>
                            <button
                                onClick={() => increaseQuantity(item.id)}
                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition dark:text-black"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-4 text-red-500 hover:underline font-medium dark:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                    Total: {convertPrice(totalPrice).toFixed(2)} {currency}
                </h3>
                <button
                    onClick={() => navigate("/checkout")}
                    className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold transition
                    dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
