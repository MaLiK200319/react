import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import SectionTitle from '../components/SectionTitle';
import { DynamicIcon } from '../lib/iconMap';

const Skills = () => {
    const { content } = useContent();
    const { skills } = content || { skills: [] };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <SectionTitle title="Skills & Technologies" subtitle="My technical toolbox" />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-4 group"
                        >
                            <DynamicIcon
                                name={skill.icon}
                                size={40}
                                style={{ color: skill.color }}
                                className="group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
