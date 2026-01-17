import React from "react";
import { useTranslation } from "react-i18next";


const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 
        dark:bg-black dark:text-white">
            <div className="text-center mb-12 dark:bg-black dark:text-white">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 dark:bg-black dark:text-white">{t("aboutPage.aboutUs")}</h1>
                <p className="text-gray-600 text-base sm:text-lg dark:bg-black dark:text-white">
                    {t("aboutPage.introParagraph")}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16 dark:bg-black dark:text-white">
                <img
                    src="https://cdn.shopify.com/s/files/1/0070/7032/articles/ecommerce_20shopping_20cart_8f689221-1b03-4c61-8759-b837d516e86c.png?v=1747942866"
                    alt="Profile"
                    className="w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover shadow-lg mx-auto"
                />
                <div className="lg:w-2/3 text-center lg:text-left dark:bg-black dark:text-white">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 dark:bg-black dark:text-white">{t("aboutPage.ourJourneyTitle")}</h2>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base dark:bg-black dark:text-white">
                        {t("aboutPage.ourJourneyParagraph1")}
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base dark:bg-black dark:text-white">
                        {t("aboutPage.ourJourneyParagraph2")}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">2K+</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">{t("aboutPage.stats.satisfiedCustomers")}</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">20+</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">{t("aboutPage.stats.premiumProducts")}</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">2+</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">{t("aboutPage.stats.teamMembers")}</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">24/7</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">{t("aboutPage.stats.customerSupport")}</p>
                </div>
            </div>
        </div>
    );
};

export default About;
