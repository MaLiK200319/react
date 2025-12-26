import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaPaperPlane } from 'react-icons/fa';
import { DynamicIcon } from '../lib/iconMap';

const Contact = () => {
    const { content } = useContent();
    const { contact } = content || { contact: { social: [] } };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert("Message sent! (This is a demo)");
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <SectionTitle title="Get In Touch" subtitle="Let's work together" />

                <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/3 flex flex-col gap-6"
                    >
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Connect with me
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Feel free to reach out for collaborations or just a friendly hello.
                            </p>
                            <div className="flex flex-col gap-4">
                                <a href={`mailto:${contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                    {contact.email}
                                </a>
                                <div className="flex gap-4 mt-2">
                                    {contact.social.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                                        >
                                            <DynamicIcon name={social.icon} size={24} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-2/3"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows="5"
                                    className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all resize-none"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            <Button className="w-full md:w-auto self-start justify-center">
                                Send Message <FaPaperPlane size={14} />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
