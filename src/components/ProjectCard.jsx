import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
        >
            <div className="relative overflow-hidden h-48">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        <FaExternalLinkAlt size={20} />
                    </a>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
