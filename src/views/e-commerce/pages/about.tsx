import React from "react";

const About: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
                <p className="text-gray-600 text-base sm:text-lg">
                    At Loft, we are passionate about curating high-quality products that bring joy and convenience to your everyday life.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16">
                <img
                    src="https://cdn.shopify.com/s/files/1/0070/7032/articles/ecommerce_20shopping_20cart_8f689221-1b03-4c61-8759-b837d516e86c.png?v=1747942866"
                    alt="Profile"
                    className="w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover shadow-lg mx-auto"
                />
                <div className="lg:w-2/3 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Journey</h2>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base">
                        Founded in 2025, Loft started with a mission to simplify online shopping while offering products that combine style, durability, and practicality.
                        Our team works tirelessly to handpick items that meet our high standards of quality and customer satisfaction.
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base">
                        We believe that shopping should be more than just a transaction—it should be an enjoyable experience.
                        That’s why we focus on providing exceptional service, fast delivery, and an easy-to-navigate platform that customers can trust.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1 sm:mb-2">2K+</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Satisfied Customers</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1 sm:mb-2">20+</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Premium Products</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1 sm:mb-2">2+</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Dedicated Team Members</p>
                </div>
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1 sm:mb-2">24/7</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Customer Support</p>
                </div>
            </div>
        </div>
    );
};

export default About;
