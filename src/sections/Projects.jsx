import { useContent } from '../contexts/ContentContext';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const { content } = useContent();
    const { projects } = content || { projects: [] };

    return (
        <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <SectionTitle title="Featured Projects" subtitle="Some of my recent work" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
