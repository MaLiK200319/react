import { Home as HomeIcon, User as UserIcon, Cpu as CpuIcon, Briefcase as BriefcaseIcon, Mail as MailIcon, Code as CodeIcon, Sun as SunIcon, Moon as MoonIcon } from 'lucide-react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';
import { FloatingDock } from '../components/Navigation/FloatingDock';
import { useDarkMode } from '../hooks/useDarkMode';
import { useContent } from '../contexts/ContentContext';

const Home = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const { content, loading } = useContent();

    if (loading || !content) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pb-24">
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>
            <Footer />

            <FloatingDock
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                items={[
                    { title: "Home", icon: <HomeIcon className="h-full w-full " />, href: "hero" },
                    { title: "About", icon: <UserIcon className="h-full w-full " />, href: "about" },
                    { title: "Skills", icon: <CpuIcon className="h-full w-full " />, href: "skills" },
                    { title: "Projects", icon: <CodeIcon className="h-full w-full " />, href: "projects" },
                    { title: "Experience", icon: <BriefcaseIcon className="h-full w-full " />, href: "experience" },
                    { title: "Contact", icon: <MailIcon className="h-full w-full " />, href: "contact" },
                    {
                        title: "Theme",
                        icon: colorTheme === 'light' ? <SunIcon className="h-full w-full text-yellow-500" /> : <MoonIcon className="h-full w-full text-blue-300" />,
                        onClick: () => setTheme(colorTheme)
                    }
                ]}
            />
        </div>
    );
};

export default Home;
