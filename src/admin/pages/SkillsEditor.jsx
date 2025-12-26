import { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Trash2, GripVertical, Plus, Save } from 'lucide-react';
import { DynamicIcon, iconMap } from '../../lib/iconMap';

const SkillsEditor = () => {
    const { content, updateContent } = useContent();
    const [localSkills, setLocalSkills] = useState([]);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (content?.skills) {
            setLocalSkills(content.skills);
        }
    }, [content]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(localSkills);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLocalSkills(items);
        setIsDirty(true);
    };

    const handleSave = async () => {
        if (!content) return;
        const newContent = { ...content, skills: localSkills };
        await updateContent(newContent);
        setIsDirty(false);
        alert("Skills saved!");
    };

    const handleDelete = (index) => {
        if (window.confirm("Delete this skill?")) {
            const items = Array.from(localSkills);
            items.splice(index, 1);
            setLocalSkills(items);
            setIsDirty(true);
        }
    };

    const handleAdd = () => {
        const newSkill = {
            name: "New Skill",
            icon: "Code",
            color: "#61DAFB"
        };
        setLocalSkills([newSkill, ...localSkills]);
        setIsDirty(true);
    };

    const handleChange = (index, field, value) => {
        const items = [...localSkills];
        items[index] = { ...items[index], [field]: value };
        setLocalSkills(items);
        setIsDirty(true);
    };

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage Skills</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                    >
                        <Plus size={16} /> Add Skill
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

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="skills-list" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                        >
                            {localSkills.map((skill, index) => (
                                <Draggable key={index} draggableId={`skill-${index}`} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex flex-col gap-3 group relative group"
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                className="absolute top-2 right-2 text-gray-600 hover:text-white cursor-grab active:cursor-grabbing z-10"
                                            >
                                                <GripVertical size={16} />
                                            </div>

                                            <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center bg-gray-800" style={{ color: skill.color }}>
                                                <DynamicIcon name={skill.icon} size={24} />
                                            </div>

                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={skill.name}
                                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                    className="w-full bg-transparent text-center border-b border-gray-800 focus:border-blue-500 text-sm py-1 outline-none"
                                                    placeholder="Name"
                                                />

                                                <div className="relative">
                                                    <input
                                                        list={`icon-options-${index}`}
                                                        type="text"
                                                        value={skill.icon}
                                                        onChange={(e) => handleChange(index, 'icon', e.target.value)}
                                                        className="w-full bg-transparent text-center text-xs text-gray-500 border-b border-gray-800 focus:border-blue-500 py-1 outline-none"
                                                        placeholder="Icon Key (e.g. FaReact)"
                                                    />
                                                    <datalist id={`icon-options-${index}`}>
                                                        {Object.keys(iconMap).sort().map(key => (
                                                            <option key={key} value={key} />
                                                        ))}
                                                    </datalist>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="meta"
                                                        value={skill.color}
                                                        onChange={(e) => handleChange(index, 'color', e.target.value)}
                                                        className="w-full bg-transparent text-center text-xs text-gray-500 border-b border-gray-800 focus:border-blue-500 py-1 outline-none"
                                                        placeholder="#Color"
                                                    />
                                                    <input
                                                        type="color"
                                                        value={skill.color}
                                                        onChange={(e) => handleChange(index, 'color', e.target.value)}
                                                        className="h-4 w-4 rounded overflow-hidden p-0 border-0"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="absolute top-2 left-2 text-gray-600 hover:text-red-400 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete Skill"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <p className="text-xs text-gray-500 mt-6">
                Enter Icon Keys from standard libraries (FaReact, SiJavascript, etc.).
            </p>
        </div>
    );
};

export default SkillsEditor;
