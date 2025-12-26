import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshContent = async () => {
        setLoading(true);
        try {
            const data = await api.get();
            setContent(data);
        } catch (error) {
            console.error("Failed to fetch content", error);
        } finally {
            setLoading(false);
        }
    };

    const updateContent = async (newContent) => {
        // Optimistic update
        setContent(newContent);
        await api.update(newContent);
    };

    useEffect(() => {
        refreshContent();

        // Listen for local storage changes from other tabs
        const handleStorageChange = (e) => {
            // We can check e.key === STORAGE_KEY if we want purity
            refreshContent();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <ContentContext.Provider value={{ content, loading, refreshContent, updateContent }}>
            {children}
        </ContentContext.Provider>
    );
};
