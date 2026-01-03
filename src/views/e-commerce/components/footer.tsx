import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">

                {/* Hakkımızda / Logo */}
                <div>
                    <h2 className="text-xl font-bold mb-2 text-white">My E-Commerce</h2>
                    <p className="text-gray-400 text-sm">
                        Quality products delivered to your doorstep.
                    </p>
                </div>

                {/* Linkler */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-2 text-white">Quick Links</h3>
                    <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
                    <Link to="/shop" className="hover:text-blue-400 transition-colors">Shop</Link>
                    <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
                </div>

                {/* Sosyal Medya */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-2 text-white">Follow Us</h3>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            className="hover:text-blue-500 transition flex items-center gap-1"
                        >
                            <FaFacebookF /> FB
                        </a>
                        <a
                            href="https://www.x.com"
                            target="_blank"
                            className="hover:text-blue-500 transition flex items-center gap-1"
                        >
                            <FaTwitter /> X
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            className="hover:text-blue-500 transition flex items-center gap-1"
                        >
                            <FaInstagram /> IG
                        </a>
                    </div>
                </div>

            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
                &copy; {new Date().getFullYear()} My E-Commerce. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
