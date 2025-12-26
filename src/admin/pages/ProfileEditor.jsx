import { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { Save } from 'lucide-react';

const ProfileEditor = () => {
    const { content, updateContent } = useContent();
    const [formData, setFormData] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (content) {
            setFormData({
                hero: content.hero,
                about: content.about,
                contact: content.contact
            });
        }
    }, [content]);

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        setIsDirty(true);
    };

    const handleSocialChange = (index, field, value) => {
        const newSocial = [...formData.contact.social];
        newSocial[index] = { ...newSocial[index], [field]: value };

        setFormData(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                social: newSocial
            }
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        if (!formData) return;

        const newContent = {
            ...content,
            hero: formData.hero,
            about: formData.about,
            contact: formData.contact
        };

        await updateContent(newContent);
        setIsDirty(false);
        alert("Profile updated!");
    };

    if (!formData) return <div>Loading...</div>;

    return (
        <div className="text-white space-y-8 max-w-4xl">
            <div className="flex justify-between items-center sticky top-0 bg-gray-950 py-4 z-10 border-b border-gray-800">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                {isDirty && (
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors"
                    >
                        <Save size={16} /> Save Changes
                    </button>
                )}
            </div>

            {/* Hero Section */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Hero Section</h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                            value={formData.hero.name}
                            onChange={(e) => handleChange('hero', 'name', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                            value={formData.hero.title}
                            onChange={(e) => handleChange('hero', 'title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Description</label>
                        <textarea
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white h-24"
                            value={formData.hero.description}
                            onChange={(e) => handleChange('hero', 'description', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">CTA Button Text</label>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                            value={formData.hero.cta}
                            onChange={(e) => handleChange('hero', 'cta', e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">About Section</h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Heading</label>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                            value={formData.about.title}
                            onChange={(e) => handleChange('about', 'title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Bio</label>
                        <textarea
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white h-32"
                            value={formData.about.description}
                            onChange={(e) => handleChange('about', 'description', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Image URL</label>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                            value={formData.about.image}
                            onChange={(e) => handleChange('about', 'image', e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Info</h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Email</label>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                            value={formData.contact.email}
                            onChange={(e) => handleChange('contact', 'email', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Social Links</label>
                        <div className="space-y-3">
                            {formData.contact.social.map((link, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="w-1/3 bg-gray-950 border border-gray-700 rounded p-2 text-white text-sm"
                                        value={link.name}
                                        disabled
                                        title="Name cannot be changed"
                                    />
                                    <input
                                        type="text"
                                        className="w-1/3 bg-gray-950 border border-gray-700 rounded p-2 text-white text-sm"
                                        placeholder="Icon Key (e.g. FaGithub)"
                                        value={link.icon}
                                        onChange={(e) => handleSocialChange(index, 'icon', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="flex-1 bg-gray-950 border border-gray-700 rounded p-2 text-white text-sm"
                                        value={link.link}
                                        onChange={(e) => handleSocialChange(index, 'link', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfileEditor;
