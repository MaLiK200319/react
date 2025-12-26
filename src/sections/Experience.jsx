import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import SectionTitle from '../components/SectionTitle';

const Experience = () => {
    const { content } = useContent();
    const { experience } = content || { experience: [] };

    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <SectionTitle title="Experience" subtitle="My professional journey" />

                <div className="max-w-3xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-blue-200 dark:bg-gray-700"></div>

                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Dot */}
                            <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 top-0 w-3.5 h-3.5 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-8">
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                        {exp.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">
                                        {exp.role}
                                    </h3>
                                    <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
                                        {exp.company}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
