import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import SectionTitle from '../components/SectionTitle';

const About = () => {
    const { content } = useContent();
    const { about } = content || { about: {} }; // Fallback for safety, though Home checks it.

    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <SectionTitle title={about.title} subtitle="Get to know me better" />

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <img
                                src={about.image}
                                alt="Profile"
                                className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/2"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Who am I?
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {about.description}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            I'm always looking for new challenges and opportunities to grow as a developer.
                            When I'm not coding, you can find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
