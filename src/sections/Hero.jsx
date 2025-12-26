import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/Button';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
    const { content, loading } = useContent();

    if (loading || !content) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>;
    }

    const { hero } = content;

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-4">
                        {hero.name}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {hero.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {hero.description}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Link to="projects" smooth={true} duration={500} offset={-70}>
                            <Button>
                                {hero.cta} <FaArrowRight />
                            </Button>
                        </Link>
                        <Link to="contact" smooth={true} duration={500} offset={-70}>
                            <Button variant="outline">
                                Contact Me
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
