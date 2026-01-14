import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCurrency } from "../hooks/useCurrency";

const CreditCardForm: React.FC = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const { currency, convertPrice } = useCurrency();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Payment Successful! Total: $${totalPrice.toFixed(2)}`);
        clearCart();
        navigate("/");
    };

    if (cart.length === 0)
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate("/shop")}
                    className="text-blue-500 hover:underline"
                >
                    Go to Shop
                </button>
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 dark:bg-black dark:text-white">
            <h2 className="text-3xl font-bold mb-8 text-center dark:bg-black dark:text-white">Credit Card Payment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    required
                    className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition
                    dark:bg-black dark:text-white
                    dark:bg-black dark:text-white
                        dark:focus:outline-none dark:focus:ring-blue-500"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Expiry MM/YY"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        required
                        className="flex-1 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition
                        dark:bg-black dark:text-white
                        dark:bg-black dark:text-white
                        dark:focus:outline-none dark:focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="CVC"
                        value={cvc}
                        onChange={e => setCvc(e.target.value)}
                        required
                        className="flex-1 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition
                        dark:bg-black dark:text-white
                        dark:focus:outline-none dark:focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 font-bold text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition mt-4
                    dark:bg-blue-500 dark:text-black
                    dark:hover:bg-blue-600">
                    Pay {convertPrice(totalPrice).toFixed(2)} {currency}
                </button>
            </form>
        </div>
    );
};

export default CreditCardForm;
