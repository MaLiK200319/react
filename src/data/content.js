import melekImg from '../assets/melek.jpg';

// Note: Icons are now string keys referencing keys in src/lib/iconMap.jsx

export const content = {
    hero: {
        name: "Melek Benrbah",
        title: "Software Engineering Student",
        description: "I build clean, efficient, and user-focused web applications with modern technologies.",
        cta: "View Projects",
    },
    about: {
        title: "About Me",
        description:
            "I'm a software engineering student passionate about building real-world solutions. I love understanding systems deeply, learning fast, and creating projects that combine clean design with strong logic. I enjoy exploring backend, frontend, and AI tools that help me grow as a developer.",
        image: melekImg, // This import is resolved by build tool, so it's a string URL in the end.
    },
    skills: [
        { name: "React", icon: "FaReact", color: "#61DAFB" },
        { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
        { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
        { name: "C#", icon: "TbBrandCSharp", color: "#239120" },
        { name: ".NET", icon: "SiDotnet", color: "#512BD4" },
        { name: "MySQL", icon: "SiMysql", color: "#00618A" },
    ],
    projects: [
        {
            title: "E-Commerce Platform",
            description:
                "A complete online shopping platform with authentication, product management, and a modern UI.",
            tech: ["React", "Node.js", "MongoDB"],
            image:
                "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1632&q=80",
            github: "https://github.com/benrbehmelek",
            demo: "#",
        },
        {
            title: "Task Management App",
            description:
                "A productivity tool where users can manage tasks, collaborate, and track progress in real time.",
            tech: ["React", "Firebase", "Tailwind"],
            image:
                "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=1632&q=80",
            github: "https://github.com/benrbehmelek",
            demo: "#",
        },
        {
            title: "Weather Dashboard",
            description:
                "An interactive weather dashboard that displays real-time forecasts using external API data.",
            tech: ["React", "Chart.js", "API"],
            image:
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1470&q=80",
            github: "https://github.com/benrbehmelek",
            demo: "#",
        },
    ],
    experience: [
        {
            year: "2023 - Present",
            role: "Software Engineering Student",
            company: "IIT Sfax",
            description: "Studying Génie Logiciel et Système d’Information.",
        },
        {
            year: "2025",
            role: "Full Stack Developer (Internship)",
            company: "IIT",
            description: "Developed an AI-assisted segmentation model using SAM2 and integrated it into a web platform.",
        },
    ],
    contact: {
        email: "benrbahmelek@gmail.com",
        social: [
            { name: "GitHub", icon: "FaGithub", link: "https://github.com/benrbehmelek" },
            { name: "LinkedIn", icon: "FaLinkedin", link: "https://linkedin.com" },
            { name: "Twitter", icon: "FaTwitter", link: "https://twitter.com" },
        ],
    },
};
