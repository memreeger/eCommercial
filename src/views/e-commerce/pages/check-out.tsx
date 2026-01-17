import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCurrency } from "../hooks/useCurrency";
import { useTranslation } from "react-i18next";

const Checkout: React.FC = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const { currency, convertPrice } = useCurrency();
    const { t } = useTranslation();

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
                <h2 className="text-2xl font-bold mb-4">{t("checkout.emptyCartTitle")}</h2>
                <button onClick={() => navigate("/shop")} className="text-blue-500 hover:underline">
                    {t("checkout.goToShop")}
                </button>
            </div>
        );
    // {convertPrice(product.price)} {currency}
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">{t("checkout.checkoutTitle")}</h2>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 bg-gray-100 p-6 rounded">
                    <h3 className="text-xl font-semibold mb-4">{t("checkout.orderSummary")}</h3>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span className="truncate"> {t(`products.${item.id}.title`)} x {item.quantity}</span>
                            <span>{(convertPrice(item.price) * item.quantity).toFixed(2)} {currency}</span>
                        </div>
                    ))}
                    <div className="border-t mt-4 pt-2 flex justify-between font-bold">
                        <span>{t("checkout.total")}</span>
                        <span>{convertPrice(totalPrice).toFixed(2)} {currency}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="md:w-1/2 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder={t("checkout.fullName")}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500
                        dark:bg-white dark:placeholder-gray-500 
                        dark:focus:ring-2 dark:focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder={t("checkout.email")}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500
                        dark:bg-white dark:placeholder-gray-500 
                        dark:focus:ring-2 dark:focus:ring-blue-500"
                    />
                    <textarea
                        placeholder={t("checkout.address")}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none
                        dark:bg-white dark:placeholder-gray-500 
                        dark:focus:ring-2 dark:focus:ring-blue-500"
                        rows={4}
                    />
                    <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500
                        dark:bg-white dark:placeholder-gray-500 
                        dark:focus:ring-2 dark:focus:ring-blue-500"
                    >
                        <option value="card">{t("checkout.creditCard")}</option>
                        <option value="cash">{t("checkout.cashOnDelivery")}</option>
                        <option value="EFT"> {t("checkout.eftFast")}</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition mt-2
                        dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        {t("checkout.pay")} {convertPrice(totalPrice).toFixed(2)} {currency}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
