export interface Team {
    id: string;
    name: string;
    shortName: string;
    logo: string; // Emoji or URL
    captain?: string;
    players?: string[];
    stats?: {
        played: number;
        won: number;
        lost: number;
        points: number;
        nrr: number;
    };
    manager?: string;
    coach?: string;
}

export interface Match {
    id: string;
    matchNumber: number;
    date: string; // ISO date
    time: string;
    teamA: string; // Team ID
    teamB: string; // Team ID
    venue: string;
    status: 'upcoming' | 'live' | 'completed';
    result?: string; // Text description
    winningTeam?: string; // Team ID
    playerOfMatch?: string; // Player Name
    scores?: {
        teamA: string;
        teamB: string;
    };
}

export interface PointEntry {
    teamId: string;
    played: number;
    won: number;
    lost: number;
    tied: number;
    nr: number; // No Result
    points: number;
    nrr: number;
}

export const TEAMS: Team[] = [
    { id: 't1', name: 'Anna University', shortName: 'AU', logo: '🦁' },
    { id: 't2', name: 'K.S. Rangasamy College of Tech', shortName: 'KSRCT', logo: '🐯' },
    { id: 't3', name: 'Madras University', shortName: 'MU', logo: '🦅' },
    { id: 't4', name: 'Bangalore University', shortName: 'BU', logo: '🐘' },
    { id: 't5', name: 'Kerala University', shortName: 'KU', logo: '🌴' },
];

export const MATCHES: Match[] = [
    {
        id: 'm1',
        matchNumber: 1,
        date: '2026-01-22',
        time: '09:00 AM',
        teamA: 't1',
        teamB: 't2',
        venue: 'KSRCT Main Ground',
        status: 'upcoming',
    },
    {
        id: 'm2',
        matchNumber: 2,
        date: '2026-01-22',
        time: '01:30 PM',
        teamA: 't3',
        teamB: 't4',
        venue: 'KSRCT Ground B',
        status: 'upcoming',
    },
    {
        id: 'm3',
        matchNumber: 3,
        date: '2026-01-23',
        time: '09:00 AM',
        teamA: 't2',
        teamB: 't5',
        venue: 'KSRCT Main Ground',
        status: 'upcoming',
    },
];

export const POINTS_TABLE: PointEntry[] = [
    { teamId: 't1', played: 0, won: 0, lost: 0, tied: 0, nr: 0, points: 0, nrr: 0.000 },
    { teamId: 't2', played: 0, won: 0, lost: 0, tied: 0, nr: 0, points: 0, nrr: 0.000 },
    { teamId: 't3', played: 0, won: 0, lost: 0, tied: 0, nr: 0, points: 0, nrr: 0.000 },
    { teamId: 't4', played: 0, won: 0, lost: 0, tied: 0, nr: 0, points: 0, nrr: 0.000 },
    { teamId: 't5', played: 0, won: 0, lost: 0, tied: 0, nr: 0, points: 0, nrr: 0.000 },
];

export const VENUES = [
    {
        id: 'v1',
        name: 'KSRCT Main Ground',
        address: 'K.S. Rangasamy College of Technology, Tiruchengode',
        mapLink: 'https://maps.app.goo.gl/Kxvau1DtZkwpvsa89',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
        facilities: ['Dressing Rooms', 'Practice Nets', 'Pavilion'],
        rules: ['Report 30 mins before match', 'White dress code mandatory']
    },
    {
        id: 'v2',
        name: 'KSRCT Ground B',
        address: 'Behind Main Block, KSRCT',
        mapLink: 'https://maps.app.goo.gl/Spx2XMAie7bgPTmZ7',
        image: 'https://images.unsplash.com/photo-1587280501635-68a6e82cd7db?w=800&q=80',
        facilities: ['Restrooms', 'Water Dispenser'],
        rules: ['No spiked shoes allowed']
    }
];

export const ACCOMMODATION = [
    {
        id: 'a5',
        name: 'Tanjore House',
        type: 'Managers Accommodation',
        address: 'VIP Guest Complex, KSRCT',
        distance: "Adjacent to Principal's Bungalow",
        facilities: ['AC Rooms', 'TV', 'attached Bath', 'Wi-Fi'],
        contact: 'Reception: 9876543214'
    },
    {
        id: 'a1',
        name: 'Trichy House',
        type: 'Players Accommodation',
        address: 'K.S. Rangasamy College of Technology Campus',
        distance: 'Near Synthetic Track',
        facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
        contact: 'Warden: 9876543210'
    },
    {
        id: 'a2',
        name: 'Madurai House',
        type: 'Players Accommodation',
        address: 'K.S. Rangasamy College of Technology Campus',
        distance: 'Near Main Pharmacy Block',
        facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
        contact: 'Warden: 9876543211'
    },
    {
        id: 'a3',
        name: 'Nilgiri House',
        type: 'Players Accommodation',
        address: 'K.S. Rangasamy College of Technology Campus',
        distance: 'Opposite to MBA Block',
        facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
        contact: 'Warden: 9876543212'
    },
    {
        id: 'a4',
        name: 'Teachers House',
        type: 'Players Accommodation',
        address: 'Staff Quarters, KSRCT Campus',
        distance: 'Behind Main Admin Block',
        facilities: ["Wi-Fi", "Attached Bathroom", "Hot Water", "Common Room"],
        contact: 'In-charge: 9876543213'
    }
];

export const FOOD_SPOTS = [
    {
        id: 'f1',
        name: 'College Cafeteria',
        type: 'Canteen',
        cuisine: 'South Indian, Snacks',
        rating: 4.5,
        distance: 'On Campus'
    },
    {
        id: 'f2',
        name: 'Saravana Bhavan',
        type: 'Restaurant',
        cuisine: 'Pure Veg',
        rating: 4.2,
        distance: '3km away'
    }
];

export const TRANSPORT = [
    {
        id: 'tr1',
        route: 'Hostel to Ground',
        mode: 'College Bus',
        timings: ['07:30 AM', '08:30 AM', '04:30 PM'],
        contact: 'Transport In-charge: 9988776655'
    },
    {
        id: 'tr2',
        route: 'Railway Station to Campus',
        mode: 'Van',
        timings: ['On Arrival (Pre-booking needed)'],
        contact: 'Driver: 8877665544'
    }
];

export const CONTACTS = [
    {
        category: 'Organizing Committee',
        members: [
            { name: 'Dr. M. Venkatesan', role: 'Sports Secretary', phone: '9944556677' },
            { name: 'Mr. K. Palanisamy', role: 'Event Coordinator', phone: '8877665544' }
        ]
    },
    {
        category: 'Emergency',
        members: [
            { name: 'Ambulance', role: 'Medical', phone: '108' },
            { name: 'Campus Security', role: 'Security', phone: '04288-274741' },
            { name: 'Women Helpline', role: 'Safety', phone: '1091' }
        ]
    }
];

export const GALLERY_IMAGES = [
    { id: 'g1', src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80', caption: 'Opening Ceremony' },
    { id: 'g2', src: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80', caption: 'Match Day 1' },
    { id: 'g3', src: 'https://images.unsplash.com/photo-1593341646782-e0b495cffd32?w=800&q=80', caption: 'Prize Distribution' },
    { id: 'g4', src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80', caption: 'Team Captains' },
];

export const RULES = [
    'All matches will be played as per ICC T20 rules.',
    'Teams must report to the ground 45 minutes before the scheduled start.',
    'Umpire decision is final and binding.',
    'Strict disciplinary action against misconduct.',
    'Teams must carry their own kit bags and first aid.'
];
