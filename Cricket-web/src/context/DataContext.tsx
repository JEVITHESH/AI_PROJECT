import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    TEAMS, MATCHES, POINTS_TABLE, VENUES, ACCOMMODATION, FOOD_SPOTS, TRANSPORT, CONTACTS, GALLERY_IMAGES, RULES,
    type Team, type Match, type PointEntry
} from '@/data/mockData';

interface DataContextType {
    teams: Team[];
    matches: Match[];
    pointsTable: PointEntry[];
    venues: any[];
    accommodation: any[];
    foodSpots: any[];
    transport: any[];
    contacts: any[];
    galleryImages: any[];
    rules: string[];

    // Actions
    addMatch: (match: Match) => void;
    updateMatch: (match: Match) => void;
    deleteMatch: (id: string) => void;

    // Setters
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    setPointsTable: React.Dispatch<React.SetStateAction<PointEntry[]>>;
    setVenues: React.Dispatch<React.SetStateAction<any[]>>;
    setAccommodation: React.Dispatch<React.SetStateAction<any[]>>;
    setFoodSpots: React.Dispatch<React.SetStateAction<any[]>>;
    setTransport: React.Dispatch<React.SetStateAction<any[]>>;
    setContacts: React.Dispatch<React.SetStateAction<any[]>>;
    setGalleryImages: React.Dispatch<React.SetStateAction<any[]>>;
    setRules: React.Dispatch<React.SetStateAction<string[]>>;

    // Quick Links
    quickLinks: any[];
    setQuickLinks: React.Dispatch<React.SetStateAction<any[]>>;

    // Feedback
    feedback: any[];
    addFeedback: (item: any) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Quick Links Data
const INITIAL_QUICK_LINKS = [
    { id: '1', label: "Schedule", path: "/schedule", color: "bg-blue-100 text-blue-600", iconName: "Calendar" },
    { id: '2', label: "Venue", path: "/venue", color: "bg-emerald-100 text-emerald-600", iconName: "MapPin" },
    { id: '3', label: "Accommodation", path: "/accommodation", color: "bg-purple-100 text-purple-600", iconName: "Building" },
    { id: '4', label: "Food", path: "/food", color: "bg-orange-100 text-orange-600", iconName: "Utensils" },
    { id: '5', label: "Transport", path: "/transport", color: "bg-indigo-100 text-indigo-600", iconName: "Bus" },
    { id: '6', label: "Contacts", path: "/contacts", color: "bg-teal-100 text-teal-600", iconName: "Phone" },
    { id: '7', label: "Emergency", path: "/emergency", color: "bg-red-100 text-red-600", iconName: "AlertTriangle" },
    { id: '8', label: "Discover", path: "/discover", color: "bg-amber-100 text-amber-600", iconName: "Trophy" },
];

const QUICK_LINKS_VERSION = '2.1'; // Increment this to force cache refresh

export function DataProvider({ children }: { children: React.ReactNode }) {
    // Initialize state from localStorage or mockData
    const [teams, setTeams] = useState<Team[]>(() => {
        const saved = localStorage.getItem('teams');
        return saved ? JSON.parse(saved) : TEAMS;
    });

    const [matches, setMatches] = useState<Match[]>(() => {
        const saved = localStorage.getItem('matches');
        return saved ? JSON.parse(saved) : MATCHES;
    });

    const [pointsTable, setPointsTable] = useState<PointEntry[]>(() => {
        const saved = localStorage.getItem('pointsTable');
        return saved ? JSON.parse(saved) : POINTS_TABLE;
    });

    const [venues, setVenues] = useState(() => {
        const saved = localStorage.getItem('venues');
        return saved ? JSON.parse(saved) : VENUES;
    });

    const [accommodation, setAccommodation] = useState(() => {
        const saved = localStorage.getItem('accommodation');
        return saved ? JSON.parse(saved) : ACCOMMODATION;
    });

    const [foodSpots, setFoodSpots] = useState(() => {
        const saved = localStorage.getItem('foodSpots');
        return saved ? JSON.parse(saved) : FOOD_SPOTS;
    });

    const [transport, setTransport] = useState(() => {
        const saved = localStorage.getItem('transport');
        return saved ? JSON.parse(saved) : TRANSPORT;
    });

    const [contacts, setContacts] = useState(() => {
        const saved = localStorage.getItem('contacts');
        return saved ? JSON.parse(saved) : CONTACTS;
    });

    const [galleryImages, setGalleryImages] = useState(() => {
        const saved = localStorage.getItem('galleryImages');
        return saved ? JSON.parse(saved) : GALLERY_IMAGES;
    });

    const [rules, setRules] = useState(() => {
        const saved = localStorage.getItem('rules');
        return saved ? JSON.parse(saved) : RULES;
    });

    const [quickLinks, setQuickLinks] = useState(() => {
        const saved = localStorage.getItem('quickLinks');
        const savedVersion = localStorage.getItem('quickLinksVersion');

        // If version changed or no version saved, use fresh data
        if (savedVersion !== QUICK_LINKS_VERSION) {
            localStorage.setItem('quickLinksVersion', QUICK_LINKS_VERSION);
            localStorage.setItem('quickLinks', JSON.stringify(INITIAL_QUICK_LINKS));
            return INITIAL_QUICK_LINKS;
        }

        return saved ? JSON.parse(saved) : INITIAL_QUICK_LINKS;
    });

    // Persist to localStorage whenever state changes
    useEffect(() => localStorage.setItem('teams', JSON.stringify(teams)), [teams]);
    useEffect(() => localStorage.setItem('matches', JSON.stringify(matches)), [matches]);
    useEffect(() => localStorage.setItem('pointsTable', JSON.stringify(pointsTable)), [pointsTable]);
    useEffect(() => localStorage.setItem('venues', JSON.stringify(venues)), [venues]);
    useEffect(() => localStorage.setItem('accommodation', JSON.stringify(accommodation)), [accommodation]);
    useEffect(() => localStorage.setItem('foodSpots', JSON.stringify(foodSpots)), [foodSpots]);
    useEffect(() => localStorage.setItem('transport', JSON.stringify(transport)), [transport]);
    useEffect(() => localStorage.setItem('contacts', JSON.stringify(contacts)), [contacts]);
    useEffect(() => localStorage.setItem('galleryImages', JSON.stringify(galleryImages)), [galleryImages]);
    useEffect(() => localStorage.setItem('rules', JSON.stringify(rules)), [rules]);
    useEffect(() => localStorage.setItem('quickLinks', JSON.stringify(quickLinks)), [quickLinks]);

    const [feedback, setFeedback] = useState<any[]>(() => {
        const saved = localStorage.getItem('feedback');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => localStorage.setItem('feedback', JSON.stringify(feedback)), [feedback]);

    // Actions
    const addMatch = (match: Match) => {
        setMatches([...matches, match]);
    };

    const updateMatch = (updatedMatch: Match) => {
        setMatches(matches.map(m => m.id === updatedMatch.id ? updatedMatch : m));
    };

    const deleteMatch = (id: string) => {
        setMatches(matches.filter(m => m.id !== id));
    };

    const addFeedback = (item: any) => {
        setFeedback([item, ...feedback]);
    };

    return (
        <DataContext.Provider value={{
            teams, matches, pointsTable, venues, accommodation, foodSpots, transport, contacts, galleryImages, rules, quickLinks, feedback,
            addMatch, updateMatch, deleteMatch, addFeedback,
            setTeams, setPointsTable, setVenues, setAccommodation, setFoodSpots, setTransport, setContacts, setGalleryImages, setRules, setQuickLinks
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
