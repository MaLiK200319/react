import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: 'hero' },
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Experience', to: 'experience' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="hero" smooth={true} duration={500} className="text-2xl font-bold cursor-pointer text-blue-600 dark:text-blue-400">
                    Melek<span className="text-gray-800 dark:text-white">.dev</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => setTheme(colorTheme)}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        {colorTheme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={() => setTheme(colorTheme)}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400"
                    >
                        {colorTheme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
                    >
                        <div className="flex flex-col items-center py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
