import { useState, useEffect } from "react";

export interface Announcement {
    id: string;
    title: string;
    message: string;
    type: "info" | "important" | "update";
    timestamp: string;
}

export const useAnnouncements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("announcements");
        if (saved) {
            setAnnouncements(JSON.parse(saved));
        } else {
            // Default seed
            setAnnouncements([
                {
                    id: "1",
                    title: "Welcome to the Tournament",
                    message: "The South Zone Women's Cricket Tournament 2026 is officially open!",
                    type: "info",
                    timestamp: new Date().toISOString()
                }
            ]);
        }
    }, []);

    const save = (newAnnouncements: Announcement[]) => {
        setAnnouncements(newAnnouncements);
        localStorage.setItem("announcements", JSON.stringify(newAnnouncements));
    };

    const addAnnouncement = (ann: Omit<Announcement, "id" | "timestamp">) => {
        const newAnn = {
            ...ann,
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        };
        save([newAnn, ...announcements]);
    };

    const deleteAnnouncement = (id: string) => {
        save(announcements.filter(a => a.id !== id));
    };

    return { announcements, addAnnouncement, deleteAnnouncement };
};
