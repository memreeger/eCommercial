import React from "react";

const About: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16 
        dark:bg-black dark:text-white">
            <div className="text-center mb-12 dark:bg-black dark:text-white">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 dark:bg-black dark:text-white">About Us</h1>
                <p className="text-gray-600 text-base sm:text-lg dark:bg-black dark:text-white">
                    At Loft, we are passionate about curating high-quality products that bring joy and convenience to your everyday life.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16 dark:bg-black dark:text-white">
                <img
                    src="https://cdn.shopify.com/s/files/1/0070/7032/articles/ecommerce_20shopping_20cart_8f689221-1b03-4c61-8759-b837d516e86c.png?v=1747942866"
                    alt="Profile"
                    className="w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover shadow-lg mx-auto"
                />
                <div className="lg:w-2/3 text-center lg:text-left dark:bg-black dark:text-white">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 dark:bg-black dark:text-white">Our Journey</h2>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base dark:bg-black dark:text-white">
                        Founded in 2025, Loft started with a mission to simplify online shopping while offering products that combine style, durability, and practicality.
                        Our team works tirelessly to handpick items that meet our high standards of quality and customer satisfaction.
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base dark:bg-black dark:text-white">
                        We believe that shopping should be more than just a transaction—it should be an enjoyable experience.
                        That’s why we focus on providing exceptional service, fast delivery, and an easy-to-navigate platform that customers can trust.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">2K+</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">Satisfied Customers</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">20+</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">Premium Products</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">2+</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">Dedicated Team Members</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2 dark:text-blue-500">24/7</h3>
                    <p className="text-gray-600 text-sm sm:text-base dark:text-white">Customer Support</p>
                </div>
            </div>
        </div>
    );
};

export default About;
