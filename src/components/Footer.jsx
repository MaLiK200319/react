import { FaHeart } from 'react-icons/fa';
import { useContent } from '../contexts/ContentContext';
import { DynamicIcon } from '../lib/iconMap';

const Footer = () => {
    const { content } = useContent();
    const social = content?.contact?.social || [];

    return (
        <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                        © {new Date().getFullYear()} Melek Developer. Made with <FaHeart className="text-red-500" /> using React.
                    </p>
                </div>
                <div className="flex space-x-6">
                    {social.map((link, index) => (
                        <a
                            key={index}
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        >
                            <DynamicIcon name={link.icon} size={20} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
