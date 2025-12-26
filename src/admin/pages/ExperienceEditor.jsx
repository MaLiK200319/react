import { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { Trash2, Plus, Save } from 'lucide-react';

const ExperienceEditor = () => {
    const { content, updateContent } = useContent();
    const [experiences, setExperiences] = useState([]);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (content?.experience) {
            setExperiences(content.experience);
        }
    }, [content]);

    const handleChange = (index, field, value) => {
        const items = [...experiences];
        items[index] = { ...items[index], [field]: value };
        setExperiences(items);
        setIsDirty(true);
    };

    const handleDelete = (index) => {
        if (confirm("Delete this experience entry?")) {
            const items = experiences.filter((_, i) => i !== index);
            setExperiences(items);
            setIsDirty(true);
        }
    };

    const handleAdd = () => {
        setExperiences([
            {
                year: "2024",
                role: "New Role",
                company: "Company Name",
                description: "Describe your role..."
            },
            ...experiences
        ]);
        setIsDirty(true);
    };

    const handleSave = async () => {
        if (!content) return;
        const newContent = { ...content, experience: experiences };
        await updateContent(newContent);
        setIsDirty(false);
        alert("Experience saved!");
    };

    return (
        <div className="text-white max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Experience Timeline</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                    >
                        <Plus size={16} /> Add Position
                    </button>
                    {isDirty && (
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors"
                        >
                            <Save size={16} /> Save Changes
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative group">
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-bold">Year / Duration</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white text-sm"
                                        value={exp.year}
                                        onChange={(e) => handleChange(index, 'year', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-bold">Company</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white text-sm"
                                        value={exp.company}
                                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold">Role Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-medium"
                                    value={exp.role}
                                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold">Description</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white text-sm"
                                    value={exp.description}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceEditor;
