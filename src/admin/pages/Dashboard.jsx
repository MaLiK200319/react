import { Activity, Eye, Globe } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                <Icon size={20} className={color.replace('bg-', 'text-')} />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { content } = useContent();
    const projectCount = content?.projects?.length || 0;
    const skillCount = content?.skills?.length || 0;
    const views = "∞"; // Placeholder or maybe implement a counter later

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Projects"
                    value={projectCount}
                    icon={Globe}
                    color="bg-blue-500 text-blue-500"
                />
                <StatCard
                    title="Skills Listed"
                    value={skillCount}
                    icon={Activity}
                    color="bg-green-500 text-green-500"
                />
                <StatCard
                    title="Profile Views"
                    value={views}
                    icon={Eye}
                    color="bg-purple-500 text-purple-500"
                />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/admin/projects" className="p-4 rounded-lg border border-dashed border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all text-gray-400 hover:text-white text-left">
                        <span className="block font-medium">+ Add New Project</span>
                        <span className="text-xs">Showcase a new creation</span>
                    </Link>
                    <Link to="/admin/skills" className="p-4 rounded-lg border border-dashed border-gray-700 hover:border-green-500 hover:bg-gray-800 transition-all text-gray-400 hover:text-white text-left">
                        <span className="block font-medium">+ Add New Skill</span>
                        <span className="text-xs">Update your technical stack</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
