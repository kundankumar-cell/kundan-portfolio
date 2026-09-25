import { useState, useEffect } from 'react';
import { sanityClient, urlFor, getProxyUrl } from '../config/sanity';
import { useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { CONTENT_DATA } from '../components/canvas/rooms/Studio/contentData';

// Flaga bezpieczeństwa: Jeśli użytkownik nie wpisał jeszcze Project ID, 
// hooki zwrócą null, co pozwoli na załadowanie danych hardcodowanych (fallback).
export const isSanityConfigured = sanityClient.config().projectId !== 'YOUR_PROJECT_ID';

// Customized Portfolio Projects
export const PROJECTS_DATA = [
    {
        id: 'edusure',
        title: 'EDUSURE',
        type: 'Student Academic Resource Platform',
        front: '/textures/gallery/monetuneprzod.webp',
        painted: '/textures/gallery/monetuneprzod_painted.webp',
        url: 'https://edusure-five.vercel.app/',
        achievement: '100+ Live Users',
        description: 'EduSure is a student-focused academic resource platform where students can access verified study materials, previous-year questions, notes, and other academic resources in one place.',
        techStack: [
            { name: 'React', logo: 'reactlogo' },
            { name: 'JavaScript', logo: 'jslogo' },
            { name: 'Node.js', logo: 'nodelogo' },
            { name: 'MongoDB', logo: 'mongodblogo' }
        ]
    },
    {
        id: 'onehealth',
        title: 'ONEHEALTH',
        type: 'AI-Powered Healthcare Discovery & Hospital Transparency Platform',
        front: '/textures/gallery/timberkittyprzod.webp',
        painted: '/textures/gallery/timberkittyprzod_painted.webp',
        url: 'https://openhealth-pi.vercel.app/',
        description: 'OneHealth is an AI-powered healthcare platform designed to help users discover hospitals, understand treatment costs, analyze medical documents and bills, and make more informed healthcare decisions.',
        techStack: [
            { name: 'React', logo: 'reactlogo' },
            { name: 'Tailwind', logo: 'tailwindlogo' },
            { name: 'Three.js', logo: 'threejslogo' },
            { name: 'Gemini AI', logo: 'ailogo' }
        ]
    },
    {
        id: 'ecosense',
        title: 'ECOSENSE',
        type: 'Campus Sustainability Intelligence Platform',
        front: '/textures/gallery/youngmultiprzod.webp',
        painted: '/textures/gallery/youngmultiprzod_painted.webp',
        url: 'https://eco-sense-client-lvjk.vercel.app/',
        description: 'EcoSense is a campus sustainability intelligence platform designed to help institutions collect, analyze and optimize sustainability-related data.',
        techStack: [
            { name: 'React', logo: 'reactlogo' },
            { name: 'JavaScript', logo: 'jslogo' },
            { name: 'Tailwind', logo: 'tailwindlogo' },
            { name: 'Node.js', logo: 'nodelogo' }
        ]
    }
];

// Globalny cache dla danych z Sanity
const cache = {
    projects: PROJECTS_DATA,
    content: CONTENT_DATA,
    awards: null,
    loading: false,
    loaded: false,
    error: null,
};

let fetchPromise = null;
const listeners = new Set();

function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function notifyUpdate() {
    listeners.forEach(l => l());
}

// Pomocniczy preloader dla zwykłych obrazków HTML (np. certyfikatów)
const preloadBrowserImage = (path) => {
    if (typeof window === 'undefined' || !path) return;
    const img = new Image();
    img.src = path;
};

// Sprawdzenie, czy urządzenie obsługuje hover (kursory, komputery)
const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export function loadSanityData() {
    if (!isSanityConfigured) {
        cache.loaded = true;
        return Promise.resolve(cache);
    }

    if (fetchPromise) {
        return fetchPromise;
    }

    cache.loading = true;

    fetchPromise = (async () => {
        try {
            const [awardsData] = await Promise.all([
                // Awards (Certyfikaty w About)
                sanityClient.fetch(`
                    *[_type == "awardCertificate"] {
                        title,
                        category,
                        certificateImage,
                        date,
                        url
                    } | order(date desc)
                `)
            ]);

            cache.projects = PROJECTS_DATA;
            cache.content = CONTENT_DATA;

            // Mapowanie nagród do struktury oczekiwanej przez overlay oraz optymalizacja certyfikatów z Sanity
            if (awardsData && awardsData.length > 0) {
                const mapItems = (items) => items.map(a => {
                    const imageUrl = a.certificateImage ? getProxyUrl(urlFor(a.certificateImage).width(800).quality(80).auto('format')) : null;
                    return {
                        label: a.title,
                        date: new Date(a.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        image: imageUrl,
                        url: a.url || null
                    };
                });

                cache.awards = {
                    sotd: {
                        id: 'award-sotd',
                        layout: 'certificate_grid',
                        title: 'Site of the Day Awards',
                        items: mapItems(awardsData.filter(a => a.category === 'sotd')),
                        platformConfig: { label: 'ACHIEVEMENT', color: '#1a1a1a', icon: '🏆' }
                    },
                    sotm: {
                        id: 'award-sotm',
                        layout: 'certificate_grid',
                        title: 'Site of the Month Awards',
                        items: mapItems(awardsData.filter(a => a.category === 'sotm')),
                        platformConfig: { label: 'AWARD', color: '#1a1a1a', icon: '📅' }
                    },
                    other: {
                        id: 'award-other',
                        layout: 'certificate_grid',
                        title: 'Other Awards',
                        items: mapItems(awardsData.filter(a => a.category === 'other')),
                        platformConfig: { label: 'PRESTIGE', color: '#1a1a1a', icon: '👑' }
                    }
                };
            }

            // PRELOADING ZDJĘĆ/TEKSTUR Z SANITY
            
            // 1. Projekty galerii
            if (cache.projects) {
                cache.projects.forEach(p => {
                    if (p.front) {
                        useTexture.preload(p.front);
                        preloadBrowserImage(p.front);
                    }
                    // Optymalizacja mobilna: Ładujemy malowane wersje TYLKO jeśli urządzenie wspiera hover (komputery)
                    if (p.painted && supportsHover) {
                        useTexture.preload(p.painted);
                        preloadBrowserImage(p.painted);
                    }
                });
            }

            // 2. Studio
            if (cache.content) {
                cache.content.forEach(c => {
                    if (c.frontTexture) {
                        useLoader.preload(TextureLoader, c.frontTexture);
                        preloadBrowserImage(c.frontTexture);
                    }
                    // Optymalizacja mobilna: Ładujemy malowane wersje TYLKO dla komputerów (z myszką/hover)
                    if (c.paintedFrontTexture && supportsHover) {
                        useLoader.preload(TextureLoader, c.paintedFrontTexture);
                        preloadBrowserImage(c.paintedFrontTexture);
                    }
                });
            }

            // 3. Nagrody (certyfikaty w oknach 2D) - preload w przeglądarce
            if (cache.awards) {
                ['sotd', 'sotm', 'other'].forEach(category => {
                    cache.awards[category].items.forEach(item => {
                        if (item.image) {
                            preloadBrowserImage(item.image);
                        }
                    });
                });
            }

            cache.loaded = true;
            cache.loading = false;
        } catch (error) {
            console.error("Error preloading Sanity data:", error);
            cache.error = error;
            cache.loading = false;
            // Oznaczamy jako załadowane w razie błędu, żeby aplikacja nie wisiała w nieskończoność na preloaderze
            cache.loaded = true;
        }

        notifyUpdate();
        return cache;
    })();

    return fetchPromise;
}

export function isSanityDataLoaded() {
    if (!isSanityConfigured) return true;
    return cache.loaded;
}

export function useGalleryProjects() {
    const [projects, setProjects] = useState(cache.projects);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setProjects(cache.projects);
            return;
        }

        const handleUpdate = () => {
            setProjects(cache.projects);
        };

        return subscribe(handleUpdate);
    }, []);

    return projects;
}

export function useStudioContent() {
    const [content, setContent] = useState(cache.content);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setContent(cache.content);
            return;
        }

        const handleUpdate = () => {
            setContent(cache.content);
        };

        return subscribe(handleUpdate);
    }, []);

    return content;
}

export function useAwards() {
    const [awardsData, setAwardsData] = useState(cache.awards);

    useEffect(() => {
        loadSanityData();

        if (cache.loaded) {
            setAwardsData(cache.awards);
            return;
        }

        const handleUpdate = () => {
            setAwardsData(cache.awards);
        };

        return subscribe(handleUpdate);
    }, []);

    return awardsData;
}

// Automatyczne odpalenie pobierania przy załadowaniu modułu JS
loadSanityData();
