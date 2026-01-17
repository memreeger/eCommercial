import { useState } from "react";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const { t } = useTranslation();

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb- dark:text-white">{t("contactPage.title")}</h1>
            <p className="text-center text-gray-600 mb-12 dark:text-gray-400">
                {t("contactPage.intro")}
            </p>

            {submitted && (
                <p className="text-green-500 text-center mb-6 font-semibold dark:text-gray-500">
                    {t("contactPage.successMessage")}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="grid gap-6 sm:grid-cols-2"
            >
                <input
                    type="text"
                    name="name"
                    placeholder={t("contactPage.form.name")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="col-span-2 sm:col-span-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500
                    dark:bg-gray-200 dark:text-black dark:focus:ring-2 dark:focus:ring-blue-500 dark:placeholder-gray-700"
                />
                <input
                    type="email"
                    name="email"
                    placeholder={t("contactPage.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="col-span-2 sm:col-span-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500
                    dark:bg-gray-200 dark:text-black dark:focus:ring-2 dark:focus:ring-blue-500 dark:placeholder-gray-700"
                />
                <input
                    type="text"
                    name="subject"
                    placeholder={t("contactPage.form.subject")}
                    value={formData.subject}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500
                    dark:bg-gray-200 dark:text-black dark:focus:ring-2 dark:focus:ring-blue-500 dark:placeholder-gray-700"
                />
                <textarea
                    name="message"
                    placeholder={t("contactPage.form.message")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="col-span-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none
                    dark:bg-gray-200 dark:text-black dark:focus:ring-2 dark:focus:ring-blue-500 dark:placeholder-gray-700"
                ></textarea>

                <button
                    type="submit"
                    className="col-span-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition
                    dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    {t("contactPage.form.submitButton")}
                </button>
            </form>

            <div className="mt-12 text-center text-gray-600 space-y-2 dark:text-gray-500">
                <p>{t("contactPage.contactInfo.email")}</p>
                <p>{t("contactPage.contactInfo.phone")}</p>
                <p>{t("contactPage.contactInfo.address")}</p>
            </div>
        </div>
    );
};

export default Contact;
