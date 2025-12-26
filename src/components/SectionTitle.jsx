import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-16">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "100px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 bg-blue-600 mx-auto rounded-full mb-4"
            ></motion.div>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionTitle;
