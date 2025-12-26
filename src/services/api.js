import { content as initialContent } from '../data/content';

const STORAGE_KEY = 'portfolio_content_v1';

export const api = {
    get: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error("Failed to load from LS", e);
        }

        // Default: return initial content
        return initialContent;
    },

    update: async (newContent) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Save to LS
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));

        // Dispatch storage event to sync tabs
        window.dispatchEvent(new Event('storage'));

        return newContent;
    },

    reset: async () => {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event('storage'));
        return initialContent;
    }
};
