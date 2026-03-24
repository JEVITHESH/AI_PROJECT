import React, { createContext, useContext, useState } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  category: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: number;
  type: 'work' | 'education' | 'award';
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface AchievementItem {
  id: number;
  title: string;
  date: string;
  image?: string;
  video?: string;
  category: string;
  description: string;
  quote: string;
  stats: { label: string; value: string }[];
}

interface PortfolioData {
  portfolioName: string;
  contactEmail: string;
  heroTitle: string;
  aboutText: string;
  githubUrl: string;
  linkedinUrl: string;
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  achievements: AchievementItem[];
}

interface PortfolioContextType {
  data: Readonly<PortfolioData>;
  updateData: (newData: Partial<PortfolioData>) => void;
}

const defaultData: PortfolioData = {
  portfolioName: "JEVITHESH S",
  contactEmail: "jev0760@gmail.com",
  heroTitle: "AI & Machine Learning Engineer | Software Developer | AI Developer",
  aboutText: "AI & ML student with hands-on experience in computer vision and NLP, focused on building real-time intelligent systems. I developed a YOLOv11-based gesture detection system and BERT-based NLP models with proven accuracy. I am seeking to apply practical ML skills in production-level applications.",
  githubUrl: "https://github.com/JEVITHESH/AI_PROJECT",
  linkedinUrl: "https://www.linkedin.com/in/jevithesh-s-865548292/",
  projects: [
    {
      id: 1,
      title: "Chemical-predicitor-pro",
      description: "An advanced chemical property prediction system leveraging machine learning to analyze and forecast chemical behaviors.",
      tech: ['Python', 'Scikit-Learn', 'Flask', 'Machine Learning'],
      github: 'https://github.com/JEVITHESH/AI_PROJECT/tree/master/Chemical-predicitor-pro',
      demo: 'https://chemisafe-predictor-pro.web.app/',
      category: 'AI/ML'
    },
    {
      id: 2,
      title: "Cricket-web",
      description: "A comprehensive web application for cricket enthusiasts, featuring tournament management and live score tracking.",
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/JEVITHESH/AI_PROJECT/tree/master/Cricket-web',
      demo: 'https://tournament.ksrct.ac.in',
      category: 'Web'
    },
    {
      id: 3,
      title: "Image-Classification-yolo",
      description: "Real-time object detection and image classification system built using the YOLO architecture for high-speed inference.",
      tech: ['Python', 'YOLO', 'OpenCV', 'PyTorch'],
      github: 'https://github.com/JEVITHESH/AI_PROJECT/tree/master/Image-Classification-yolo',
      demo: '#',
      category: 'AI/ML'
    },
    {
      id: 4,
      title: "Kidney Disease Prediction",
      description: "A medical AI project that predicts the likelihood of kidney disease based on clinical data using machine learning algorithms.",
      tech: ['Python', 'Pandas', 'XGBoost', 'Healthcare AI'],
      github: 'https://github.com/JEVITHESH/AI_PROJECT/tree/master/Kidney%20Disease%20Prediction%20using%20Machine%20Learning',
      demo: '#',
      category: 'AI/ML'
    },
    {
      id: 5,
      title: "Langchain WebSearch",
      description: "An intelligent web search agent powered by Langchain and LLMs to perform automated research and summaries.",
      tech: ['Langchain', 'OpenAI', 'Python', 'Streamlit'],
      github: 'https://github.com/JEVITHESH/AI_PROJECT/tree/master/Langchain/WebSearch',
      demo: '#',
      category: 'AI/ML'
    },
    {
      id: 6,
      title: "Sencor_project",
      description: "Sensor data analysis and visualization system for monitoring environmental or industrial parameters in real-time.",
      tech: ['Python', 'IoT', 'Data Science', 'Visualization'],
      github: 'https://github.com/JEVITHESH/AI_PROJECT/tree/master/Sencor_project',
      demo: '#',
      category: 'Web'
    },
    {
      id: 7,
      title: "Team-app",
      description: "A team collaboration and productivity platform designed to streamline communication and task management within organizations.",
      tech: ['React', 'Node.js', 'Firebase', 'Real-time Chat'],
      github: 'https://github.com/JEVITHESH/AI_PROJECT/tree/master/Team-app',
      demo: 'https://teamsync-793c2.web.app/#/login',
      category: 'Web'
    }
  ],
  skillCategories: [
    {
      title: 'Frontend & Web Dev',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Vite', level: 85 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'Firebase', level: 80 },
      ]
    },
    {
      title: 'Languages & API',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Java', level: 80 },
        { name: 'REST APIs', level: 85 },
        { name: 'MySQL', level: 75 },
      ]
    },
    {
      title: 'Machine Learning',
      skills: [
        { name: 'PyTorch', level: 85 },
        { name: 'Scikit-learn', level: 80 },
        { name: 'TensorFlow', level: 75 },
        { name: 'OpenCV', level: 80 },
      ]
    },
    {
      title: 'Data & NLP',
      skills: [
        { name: 'BERT & LSTM', level: 85 },
        { name: 'Hugging Face', level: 80 },
        { name: 'Pandas & NumPy', level: 90 },
        { name: 'Data Preprocessing', level: 95 },
      ]
    }
  ],
  experience: [
    {
      id: 1,
      type: 'work',
      title: 'Research & Development Intern',
      company: 'Igrad AI Labs, Erode',
      period: 'Sep 2025 - Nov 2025',
      description: 'Developed a real-time cricket umpire signal detection system using YOLOv11 and computer vision. Implemented model training pipelines and collaborated in an Agile development environment.',
      tags: ['Python', 'OpenCV', 'YOLOv11', 'Flask']
    },
    {
      id: 2,
      type: 'education',
      title: 'B.E. – AI & Machine Learning',
      company: 'K.S. Rangasamy College of Technology, Tiruchengode',
      period: 'May 2027',
      description: 'CGPA: 7.8. Studying advanced concepts in AI, Machine Learning, and Software Engineering.',
      tags: ['AI', 'Data Structures', 'Algorithms']
    },
    {
      id: 3,
      type: 'education',
      title: 'HSC (12th Grade)',
      company: 'The Modern Academy Matric Higher Sec School, Namakkal',
      period: 'May 2023',
      description: '78.9%. Completed high school with a focus on science and mathematics.',
      tags: ['Mathematics', 'Physics', 'Chemistry']
    },
    {
      id: 4,
      type: 'award',
      title: 'Student Representative, AEVA Club',
      company: 'Department AI & Engineering club',
      period: 'Present',
      description: 'Driving student engagement and technical events for the AI department.',
      tags: ['Leadership', 'Event Management']
    }
  ],
  achievements: [
    {
      id: 1,
      title: "1-Year Journey @ TRAIT Center",
      date: "2025 - 2026",
      category: "Milestone Journey",
      description: "From ideas to impact, TRAIT (Technology Readiness for Artificial Intelligence Transformation) Center has become a space where companies meet talent. Industry CEOs, real-world execution, and professional growth.",
      quote: "Thanks to our principal Dr. Gopalakrishnan Radhakrishnan and our guide Dr. Rajan C for the constant guidance. Ready for the next milestones!",
      stats: [
        { label: "Organization", value: "TRAIT Center" },
        { label: "Impact", value: "Industry Ready" }
      ]
    },
    {
      id: 2,
      title: "Annual Day Celebrations & Recognition",
      date: "March 18, 2026",
      category: "Team Excellence Award",
      description: "Our team from the Trait Centre was honored on stage during our college Annual Day for our dedication and contribution to the Trait Send initiative. This recognition reflects our consistent effort, teamwork, and commitment.",
      quote: "Grateful to our mentors Dr. Rajan C and Principal Dr. Gopalakrishnan Radhakrishnan for their unwavering support.",
      stats: [
        { label: "Initiative", value: "Trait Send" },
        { label: "Award", value: "KSRCT Honors" }
      ]
    },
    {
      id: 3,
      title: "Inter-University Women's Cricket Web App Launch",
      date: "Official Launch",
      category: "Real-World Project Launch",
      description: "Successfully developed and launched a web application for the South Zone Inter-University Women’s Cricket Tournament, organized by Anna University. Proud to be a contributing member of the TRAIT Center team development.",
      quote: "Sincere thanks to Dr. Gopalakrishnan Radhakrishnan and Dr. Rajan C for guidance throughout. Officially launched by cricketer Shahrukh Khan.",
      stats: [
        { label: "Organization", value: "Anna University" },
        { label: "Tech", value: "Sports Tech" }
      ]
    },
    {
      id: 4,
      title: "Selected as 3rd-Year Representative",
      date: "AEVA Association",
      category: "Student Leadership",
      description: "Grateful and honored to be selected as the 3rd-year representative of the AEVA Association. Received my batch from our respected HOD Dr. Rajan C sir, our Principal Dr. Gopalakrishnan Radhakrishnan, and Santhosh NC Sir.",
      quote: "Excited to organize events and support students to make this year successful. Looking forward to working with my fellow members.",
      stats: [
        { label: "Role", value: "3rd-Year Rep" },
        { label: "Association", value: "AEVA Club" }
      ]
    },
    {
      id: 5,
      title: "Sophomore Representative for AIML",
      date: "Sophomore Year",
      category: "Appointed Role",
      description: "Honored to be appointed as the Sophomore Representative for the AIML department at KSRCT. Representing the 2nd-year students and acting as a vital bridge between my peers and the association leadership.",
      quote: "Voicing the needs, interests, and ideas of my cohort while promoting vibrant association activities and initiatives.",
      stats: [
        { label: "Role", value: "Sophomore Rep" },
        { label: "Department", value: "AI & ML" }
      ]
    },
    {
      id: 6,
      title: "1st Runner Up @ IDEAFORGE'24",
      date: "2024",
      category: "Competition Success",
      description: "Awarded 1st Runner Up for our project DYNASEC at IDEAFORGE'24, focusing on innovative electrical safety solutions. A remarkable experience working with teammates Praveen S and Meganadhitha K.",
      quote: "Here’s to engineering a safer and sustainable future! Thanks to all mentors and organizers who made this possible.",
      stats: [
        { label: "Project", value: "DYNASEC" },
        { label: "Event", value: "IDEAFORGE'24" }
      ]
    }
  ]
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge logic to handle new keys in defaultData
        return { ...defaultData, ...parsed };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  const updateData = (newData: Partial<PortfolioData>) => {
    setData((prev: PortfolioData) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('portfolioData', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
