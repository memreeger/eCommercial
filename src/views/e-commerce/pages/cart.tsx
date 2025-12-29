import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart-context";

const Cart: React.FC = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0)
        return (
            <div
                className="flex items-center justify-center"
                style={{ minHeight: 'calc(100vh - 400px)' }}
            >
                <div className="text-center px-4">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <Link to="/shop" className="text-blue-500 hover:underline">Go to Shop</Link>
                </div>
            </div>

        );

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Your Cart</h2>

            <div className="flex flex-col gap-6">
                {cart.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-gray-100 p-4 rounded">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full sm:w-24 h-24 object-contain mb-4 sm:mb-0"
                        />
                        <div className="flex-1 sm:ml-4 text-center sm:text-left mb-4 sm:mb-0">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-gray-600">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >-</button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                                onClick={() => increaseQuantity(item.id)}
                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >+</button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-4 text-red-500 hover:underline"
                            >Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
                <button
                    onClick={() => navigate("/checkout")}
                    className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
