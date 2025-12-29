import { useState } from "react";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

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
            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
            <p className="text-center text-gray-600 mb-12">
                Send us a message and we’ll get back to you as soon as possible.
            </p>

            {submitted && (
                <p className="text-green-500 text-center mb-6 font-semibold">
                    Thank you! Your message has been sent.
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="grid gap-6 sm:grid-cols-2"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="col-span-2 sm:col-span-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="col-span-2 sm:col-span-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="col-span-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>

                <button
                    type="submit"
                    className="col-span-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    Send Message
                </button>
            </form>

            <div className="mt-12 text-center text-gray-600 space-y-2">
                <p>Email: contact@myEcommerceshop.com</p>
                <p>Phone: +90 500 00 00</p>
                <p>Address: 123 Commerce Street, Commerce City</p>
            </div>
        </div>
    );
};

export default Contact;
