import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Checkout: React.FC = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (paymentMethod === "card") {
            navigate("/checkout/credit-card");
            return;
        }

        alert(`Thank you for your order, ${name}! Total: $${totalPrice.toFixed(2)}`);
        clearCart();
        navigate("/");
    };

    if (cart.length === 0)
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button onClick={() => navigate("/shop")} className="text-blue-500 hover:underline">
                    Go to Shop
                </button>
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Checkout</h2>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 bg-gray-100 p-6 rounded">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span className="truncate">{item.title} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="border-t mt-4 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="md:w-1/2 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={4}
                    />
                    <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="card">Credit Card</option>
                        <option value="cash">Cash on Delivery</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition mt-2"
                    >
                        Pay ${totalPrice.toFixed(2)}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
