import { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Trash2, GripVertical, Plus, Save } from 'lucide-react';

// Using hello-pangea/dnd (fork of react-beautiful-dnd)
// I need to install it: npm install @hello-pangea/dnd

const ProjectsEditor = () => {
    const { content, updateContent } = useContent();
    const [localProjects, setLocalProjects] = useState([]);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (content?.projects) {
            setLocalProjects(content.projects);
        }
    }, [content]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(localProjects);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLocalProjects(items);
        setIsDirty(true);
    };

    const handleSave = async () => {
        if (!content) return;
        const newContent = { ...content, projects: localProjects };
        await updateContent(newContent);
        setIsDirty(false);
        alert("Projects saved!");
    };

    const handleDelete = (index) => {
        if (window.confirm("Delete this project?")) {
            const items = Array.from(localProjects);
            items.splice(index, 1);
            setLocalProjects(items);
            setIsDirty(true);
        }
    };

    const handleAdd = () => {
        const newProject = {
            title: "New Project",
            description: "Description here...",
            tech: ["React"],
            image: "https://via.placeholder.com/300",
            github: "#",
            demo: "#"
        };
        setLocalProjects([newProject, ...localProjects]);
        setIsDirty(true);
    };

    // Simplified inline editing for now - ideally use a modal form
    const handleChange = (index, field, value) => {
        const items = [...localProjects];
        items[index] = { ...items[index], [field]: value };
        setLocalProjects(items);
        setIsDirty(true);
    };

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage Projects</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                    >
                        <Plus size={16} /> Add Project
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
                <Droppable droppableId="projects-list">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-4"
                        >
                            {localProjects.map((project, index) => (
                                <Draggable key={index} draggableId={`project-${index}`} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex gap-4 items-start group"
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                className="mt-2 text-gray-600 hover:text-white cursor-grab active:cursor-grabbing"
                                            >
                                                <GripVertical size={20} />
                                            </div>

                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-xs text-gray-500 uppercase font-bold">Title</label>
                                                        <input
                                                            type="text"
                                                            value={project.title}
                                                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                                                            className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-gray-500 uppercase font-bold">Description</label>
                                                        <textarea
                                                            value={project.description}
                                                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                                                            rows={2}
                                                            className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-xs text-gray-500 uppercase font-bold">Image URL</label>
                                                        <input
                                                            type="text"
                                                            value={project.image}
                                                            onChange={(e) => handleChange(index, 'image', e.target.value)}
                                                            className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-gray-500 uppercase font-bold">Technologies (comma separated)</label>
                                                        <input
                                                            type="text"
                                                            value={project.tech ? project.tech.join(', ') : ''}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                // Convert string "React, Node" -> ["React", "Node"]
                                                                const arr = val.split(',').map(s => s.trim()).filter(Boolean);
                                                                // We update the array directly
                                                                const items = [...localProjects];
                                                                items[index] = { ...items[index], tech: arr };
                                                                setLocalProjects(items);
                                                                setIsDirty(true);
                                                            }}
                                                            placeholder="React, Tailwind, Node.js"
                                                            className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="text-xs text-gray-500 uppercase font-bold">GitHub</label>
                                                            <input
                                                                type="text"
                                                                value={project.github}
                                                                onChange={(e) => handleChange(index, 'github', e.target.value)}
                                                                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-gray-500 uppercase font-bold">Demo</label>
                                                            <input
                                                                type="text"
                                                                value={project.demo}
                                                                onChange={(e) => handleChange(index, 'demo', e.target.value)}
                                                                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="text-gray-500 hover:text-red-400 p-2 transition-colors"
                                                title="Delete Project"
                                            >
                                                <Trash2 size={18} />
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
        </div>
    );
};

export default ProjectsEditor;
