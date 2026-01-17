import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setLoading(true);
        setMessage("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage(`${t("resetPassword.messages.succes")}`);
        } catch (error) {
            console.error(error);
            setMessage(`${t("resetPassword.messages.error")}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-full flex items-center justify-center px-4 bg-gray-200"
            style={{ height: "calc(100vh - 302px)" }}
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded shadow"
            >
                <h2 className="text-xl font-bold mb-4 text-center">
                    {t("resetPassword.title")}
                </h2>

                <input
                    type="email"
                    className="w-full p-3 mb-4 rounded bg-white text-black border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={t("resetPassword.fields.email.placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition disabled:opacity-50"
                >
                    {loading ? `${t("resetPassword.buttons.sending")}` : `${t("resetPassword.buttons.send")}`}
                </button>

                {message && (
                    <p className="mt-4 text-center text-sm text-gray-700">
                        {message}
                    </p>
                )}

                <div className="mt-4 text-center text-sm">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        {t("resetPassword.links.backToLogin")}
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
