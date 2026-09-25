import resumePdf from './Kundan_Kumar_Resume.pdf';
import marksheetImg from './Kundan_Kumar_Marksheet.jpeg';
import cert1 from './certificates/certificate_1.jpeg';
import cert2 from './certificates/certificate_2.png';
import cert3 from './certificates/certificate_3.png';
import cert4 from './certificates/certificate_4.png';
import cert5 from './certificates/certificate_5.png';
import cert7 from './certificates/certificate_7.png';

/**
 * Studio Resource Configuration & Data
 * 
 * Final Resource Structure:
 * 1. RESUME (Active - View/Download PDF)
 * 2. CERTIFICATES (Active - Grid with Lightbox Preview)
 * 3. COLLEGE MARKSHEET (Active - View/Download Lightbox)
 * 4. ACHIEVEMENTS (Active - Grid with Lightbox Preview)
 */

export const RESOURCE_CONFIG = {
    resume: {
        color: '#1a1a1a',
        accentColor: '#333333',
        icon: '📄',
        label: 'Resume',
        shape: 'monitor',
    },
    certificates: {
        color: '#1a1a1a',
        accentColor: '#333333',
        icon: '📜',
        label: 'Certificates',
        shape: 'tv',
    },
    marksheet: {
        color: '#1a1a1a',
        accentColor: '#333333',
        icon: '🎓',
        label: 'College Marksheet',
        shape: 'phone',
    },
    achievements: {
        color: '#1a1a1a',
        accentColor: '#333333',
        icon: '🏆',
        label: 'Achievements',
        shape: 'monitor',
    },
};

export const PLATFORM_CONFIG = RESOURCE_CONFIG;

export const CERTIFICATES_DATA = [
    {
        id: 'cert-1',
        label: 'Artificial Intelligence Professional Certificate',
        issuer: 'Unified Mentor',
        date: 'August 2026',
        image: cert1,
    },
    {
        id: 'cert-2',
        label: 'Machine Learning',
        issuer: 'IBM SkillsBuild',
        date: 'August 2026',
        image: cert4,
    },
    {
        id: 'cert-3',
        label: 'Python for Beginners',
        issuer: 'Simplilearn SkillUp',
        date: 'May 2026',
        image: cert3,
    },
    {
        id: 'cert-4',
        label: 'SQL for Beginners: MySQL & Database Design',
        issuer: 'Scaler Topics',
        date: 'August 2025',
        image: cert2,
    },
    {
        id: 'cert-5',
        label: 'Web Development Training',
        issuer: 'Internshala Trainings',
        date: 'June 2025',
        image: cert7,
    },
    {
        id: 'cert-6',
        label: "QuizOff 2026: India's Biggest AI Quiz",
        issuer: 'Unstop / CampusCrew',
        date: 'July 2026',
        image: cert5,
    },
];

export const ACHIEVEMENTS_DATA = [
    {
        id: 'ach-1',
        label: "Udaan'26 — 1st Position",
        date: '2026',
        image: '/achievements/udaan-2026-certificate.png',
    },
    {
        id: 'ach-2',
        label: 'IKIGAI 2026 Hackathon — Finalist',
        date: '2026',
        image: '/achievements/ikigai-2026-certificate.png',
    },
    {
        id: 'ach-3',
        label: 'MIT Gwalior Hackathon — Finalist',
        date: '2026',
        image: '/achievements/mit-gwalior-hacksynapse-certificate.png',
    },
    {
        id: 'ach-4',
        label: 'EduSure — 100+ Live Users',
        date: '2026',
        image: '/achievements/edusure-100-live-users.png',
    },
];

export const STUDIO_RESOURCES = [
    {
        id: 'resource-resume',
        platform: 'resume',
        resourceType: 'resume',
        type: 'resume',
        title: 'RESUME',
        description: 'View and download my latest resume.',
        file: resumePdf,
        filename: 'Kundan_Kumar_Resume.pdf',
        status: 'active',
        active: true,
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        device: 'monitor',
    },
    {
        id: 'resource-certificates',
        platform: 'certificates',
        resourceType: 'certificates',
        type: 'certificates',
        layout: 'certificate_grid',
        title: 'CERTIFICATES',
        description: 'View my certifications, training and achievements.',
        items: CERTIFICATES_DATA,
        status: 'active',
        active: true,
        frontTexture: '/textures/studio/tv_front.webp',
        paintedFrontTexture: '/textures/studio/tv_front_painted.webp',
        device: 'tv',
    },
    {
        id: 'resource-marksheet',
        platform: 'marksheet',
        resourceType: 'marksheet',
        type: 'marksheet',
        title: 'COLLEGE MARKSHEET',
        description: 'College End-Semester Grade Report',
        file: marksheetImg,
        filename: 'Kundan_Kumar_Marksheet.jpeg',
        status: 'active',
        active: true,
        frontTexture: '/textures/studio/phone_front.webp',
        paintedFrontTexture: '/textures/studio/phone_front_painted.webp',
        device: 'phone',
    },
    {
        id: 'resource-achievements',
        platform: 'achievements',
        resourceType: 'achievements',
        type: 'achievements',
        layout: 'certificate_grid',
        title: 'ACHIEVEMENTS',
        description: 'My key achievements and recognitions.',
        items: ACHIEVEMENTS_DATA,
        status: 'active',
        active: true,
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        device: 'monitor',
    },
];

export const RAW_CONTENT_DATA = STUDIO_RESOURCES;
export const CONTENT_DATA = STUDIO_RESOURCES;

// Helper to get content by platform / resource type
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform || item.resourceType === platform || item.type === platform);
};

// Get latest content
export const getLatestContent = () => {
    return CONTENT_DATA[0];
};
