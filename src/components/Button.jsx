import { motion } from 'framer-motion';

const Button = ({ children, onClick, href, className = "", variant = "primary" }) => {
    const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30",
        secondary: "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700",
        outline: "border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800",
    };

    const Component = href ? motion.a : motion.button;
    const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

    return (
        <Component
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
