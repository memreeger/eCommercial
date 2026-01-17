import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-gray-900 text-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">

                {/* Hakkımızda / Logo */}
                <div>
                    <h2 className="text-xl font-bold mb-2 text-white">{t("footer.logo")}</h2>
                    <p className="text-gray-400 text-sm">
                        {t("footer.aboutText")}
                    </p>
                </div>

                {/* Linkler */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-2 text-white">{t("footer.quickLinks")}</h3>
                    <Link to="/" className="hover:text-orange-400 transition-colors dark:hover:text-blue-500">{t("footer.links.home")}</Link>
                    <Link to="/about" className="hover:text-orange-400 transition-colors dark:hover:text-blue-500">{t("footer.links.about")}</Link>
                    <Link to="/shop" className="hover:text-orange-400 transition-colors dark:hover:text-blue-500">{t("footer.links.shop")}</Link>
                    <Link to="/contact" className="hover:text-orange-400 transition-colors dark:hover:text-blue-500">{t("footer.links.contact")}</Link>
                </div>

                {/* Sosyal Medya */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-2 text-white">{t("footer.followUs")}</h3>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            className="hover:text-orange-500 dark:hover:text-blue-500 transition flex items-center gap-1"
                        >
                            <FaFacebookF /> FB
                        </a>
                        <a
                            href="https://www.x.com"
                            target="_blank"
                            className="hover:text-orange-500 dark:hover:text-blue-500 transition flex items-center gap-1"
                        >
                            <FaTwitter /> X
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            className="hover:text-orange-500 dark:hover:text-blue-500 transition flex items-center gap-1"
                        >
                            <FaInstagram /> IG
                        </a>
                    </div>
                </div>

            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
                &copy; {new Date().getFullYear()} NØRA. {t("footer.copyright")}
            </p>
        </footer>
    );
};

export default Footer;
