import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // login başarılı → anasayfaya yönlendir
        } catch (error) {
            console.error(error);
            alert("Giriş sırasında bir hata oluştu. Email ve şifreni kontrol et.");
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
                onSubmit={handleLogin}
                className="w-full max-w-md bg-gray-900 text-white rounded-xl p-8 shadow-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div className="mt-4 text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Click to Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
