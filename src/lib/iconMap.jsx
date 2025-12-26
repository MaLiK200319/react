import {
    FaReact, FaNodeJs, FaDatabase, FaGithub, FaLinkedin, FaTwitter, FaHeart, FaPaperPlane
} from 'react-icons/fa';
import {
    SiTailwindcss, SiJavascript, SiTypescript, SiMongodb, SiDotnet, SiMysql, SiFirebase
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import {
    Home, User, Cpu, Briefcase, Mail, Code, Sun, Moon,
    Trash2, GripVertical, Plus, Save, ExternalLink
} from 'lucide-react';

// Map of all available icons
export const iconMap = {
    // FontAwesome
    FaReact: FaReact,
    FaNodeJs: FaNodeJs,
    FaDatabase: FaDatabase,
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaTwitter: FaTwitter,
    FaHeart: FaHeart,
    FaPaperPlane: FaPaperPlane,

    // SimpleIcons
    SiTailwindcss: SiTailwindcss,
    SiJavascript: SiJavascript,
    SiTypescript: SiTypescript,
    SiMongodb: SiMongodb,
    SiDotnet: SiDotnet,
    SiMysql: SiMysql,
    SiFirebase: SiFirebase,

    // Tabler/Other
    TbBrandCSharp: TbBrandCSharp,

    // Lucide (Generic)
    Home: Home,
    User: User,
    Cpu: Cpu,
    Briefcase: Briefcase,
    Mail: Mail,
    Code: Code,
    Sun: Sun,
    Moon: Moon,
    Trash2: Trash2,
    Plus: Plus,
    Save: Save,
    ExternalLink: ExternalLink,

    // Default fallback
    Default: Code
};

// Helper component to render icons safely
export const DynamicIcon = ({ name, className, style, size = 20 }) => {
    const IconComponent = iconMap[name] || iconMap.Default;
    return <IconComponent className={className} style={style} size={size} />;
};
