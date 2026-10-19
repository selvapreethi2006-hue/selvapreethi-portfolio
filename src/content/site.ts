// All portfolio content lives here. Edit this file to update text, links,
// skills, certificates or the portrait — every section reads from it.
// Optional fields (github, certificateUrl, portrait…) are hidden on the
// site while they are left empty, so nothing unverified is ever published.

export const profile = {
  name: 'Selva Preethi J',
  initials: 'SP',
  role: 'AI & Machine Learning Intern',
  identity: 'AI & Machine Learning Intern | Aspiring AI Engineer | Generative AI Enthusiast',
  headline: 'Building Intelligent Experiences with AI.',
  supportingHeadline:
    'Turning ideas into intelligent applications through AI, machine learning, and Generative AI.',
  tagline: 'Exploring the Future of Generative AI.',
  heroDescription:
    'I build and explore AI-powered solutions, combining data, intelligent systems, and creative problem-solving to create useful digital experiences.',
  brandStatement:
    'I am an Artificial Intelligence and Data Science student passionate about building practical AI applications, exploring Generative AI, and solving real-world problems through technology.',
  // Set to '' to hide the availability badge.
  availability: 'Open to AI/ML & Generative AI Internship Opportunities',
  /**
   * Portrait shown in the hero and About section.
   * Add your photo to `public/img/` (e.g. `public/img/portrait.jpg`) and set
   * `src: '/img/portrait.jpg'`. While `src` is empty, the SP monogram is shown
   * instead — no stand-in face is ever displayed.
   */
  portrait: {
    src: '',
    alt: 'Portrait of Selva Preethi J, AI & Machine Learning Intern',
  },
  location: 'Dindigul, Tamil Nadu, India',
  email: 'selvapreethi2006@gmail.com',
  phoneDisplay: '+91 98846 87415',
  phoneHref: 'tel:+919884687415',
  linkedin: 'https://www.linkedin.com/in/selva-preethi-j-0a421a312/',
  // Leave empty until you have a public GitHub profile to share.
  github: '',
  // Set to '' to hide the resume buttons.
  resumeUrl: '/resume/selva-preethi-j-resume.pdf',
}

export const about = {
  title: 'Beyond the Code.',
  paragraphs: [
    'I am Selva Preethi J, an Artificial Intelligence and Data Science student and an Artificial Intelligence & Machine Learning Intern at SURE ProEd.',
    'I am developing practical skills in Python, machine learning, data analytics, prompt engineering, and Generative AI. I enjoy exploring AI-powered applications and learning how intelligent systems can solve real-world problems.',
    'My goal is to grow into an AI Engineer or Generative AI Engineer by continuously learning, building useful projects, and gaining hands-on industry experience.',
  ],
  highlights: [
    { label: 'Current role', value: 'AI & ML Intern, SURE ProEd' },
    { label: 'Degree', value: 'B.Tech, AI and Data Science' },
    { label: 'Career interests', value: 'AI Engineering · Generative AI · LLM Applications' },
  ],
}

export const experience = [
  {
    role: 'Artificial Intelligence & Machine Learning Intern',
    organization: 'SURE ProEd',
    duration: 'August 2026 – Present',
    current: true,
    description:
      'Working on AI and machine learning tasks while developing practical skills in Python, prompt engineering, and data analysis.',
    responsibilities: [
      'Apply Python fundamentals and core machine learning concepts to practical tasks.',
      'Design and refine prompts for large language models to produce structured outputs.',
      'Prepare, clean, and analyze data to support model training and evaluation.',
      'Document work and improve solutions through mentor feedback.',
    ],
    tags: ['Python', 'Machine Learning', 'Prompt Engineering', 'Data Analysis'],
  },
]

export type Project = {
  slug: string
  title: string
  kicker: string
  description: string
  image: string
  imageAlt: string
  tags: string[]
  liveUrl?: string
  // Add the repository URL when it is public. Hidden while empty.
  github?: string
  accent: 'cyan' | 'violet' | 'blue' | 'teal'
  details: { label: string; text: string }[]
  note?: string
}

export const projects: Project[] = [
  {
    slug: 'sidayu',
    title: 'Sidayu AI Health Companion',
    kicker: 'Health-tech · Conversational AI',
    description:
      'An AI health companion project exploring how conversational AI can support health-related information and user interactions.',
    image: '/img/project-sidayu.png',
    imageAlt: 'Abstract health-tech visual of a glowing glass heart with a pulse line above floating chat cards',
    tags: ['Conversational AI', 'Generative AI', 'Health-tech'],
    liveUrl: 'https://sidayuai.netlify.app/',
    github: '',
    accent: 'cyan',
    details: [
      { label: 'Problem', text: 'Health information can feel hard to approach and navigate.' },
      { label: 'Approach', text: 'A conversational interface that helps users explore health-related information.' },
      { label: 'Learning', text: 'Designing AI conversations that are clear, careful and user-friendly.' },
    ],
    note: 'For general information only — it does not diagnose conditions or replace medical professionals.',
  },
  {
    slug: 'lexiai',
    title: 'LexiAI Legal Assistant',
    kicker: 'Legal-tech · AI Assistant',
    description:
      'An AI-powered legal assistance project exploring how AI can help users interact with legal information.',
    image: '/img/project-lexiai.png',
    imageAlt: 'Abstract legal-tech visual of a glowing glass balance scale over translucent documents',
    tags: ['AI Assistant', 'LLMs', 'Legal-tech'],
    liveUrl: 'https://lexi-ai-assistant.netlify.app/',
    github: '',
    accent: 'violet',
    details: [
      { label: 'Problem', text: 'Legal information is often dense and difficult for everyday users to read.' },
      { label: 'Approach', text: 'An AI assistant interface for interacting with legal information conversationally.' },
      { label: 'Learning', text: 'Shaping LLM responses for clarity in a sensitive, information-heavy domain.' },
    ],
    note: 'An exploratory project — it does not replace qualified legal advice.',
  },
  {
    slug: 'pokemind',
    title: 'PokeMind AI',
    kicker: 'AI Insights · Strategy Report',
    description:
      'An AI strategy-report experience demonstrating an interactive approach to presenting AI-generated insights.',
    image: '/img/project-pokemind.png',
    imageAlt: 'Abstract analytics visual of holographic glass dashboard panels with charts and node graphs',
    tags: ['Generative AI', 'Data Storytelling', 'Interactive UI'],
    liveUrl: 'https://pokemindai.netlify.app/strategy-report',
    github: '',
    accent: 'blue',
    details: [
      { label: 'Problem', text: 'AI-generated insights are only useful when they are easy to read and explore.' },
      { label: 'Approach', text: 'An interactive, dashboard-inspired strategy report presenting AI-generated analysis.' },
      { label: 'Learning', text: 'Turning model output into a structured, visual reading experience.' },
    ],
  },
  {
    slug: 'atm-safeguard',
    title: 'Brightness-Based Password Safeguard System for ATM',
    kicker: 'Security Concept · System Design',
    description:
      'Designed a security concept in which password visibility adapts to surrounding light intensity, aiming to reduce the risk of shoulder surfing at ATMs.',
    image: '/img/project-atm.png',
    imageAlt: 'Abstract security visual of a glass ATM keypad under a translucent protective shield',
    tags: ['Problem-solving', 'Security Awareness', 'Logic Design', 'User-focused Thinking'],
    github: '',
    accent: 'teal',
    details: [
      { label: 'Problem', text: 'Shoulder surfing can expose PINs entered at ATMs.' },
      { label: 'Approach', text: 'A concept where password visibility adapts to surrounding light intensity.' },
      { label: 'Learning', text: 'Problem-solving, security awareness, logic design and user-focused system thinking.' },
    ],
  },
]

export type Simulation = {
  organization: string
  title: string
  year: string
  description: string
  // Add certificate links / images once uploaded. Hidden while empty.
  certificateUrl?: string
  certificateImage?: string
}

export const simulations: Simulation[] = [
  {
    organization: 'Tata',
    title: 'GenAI Powered Data Analytics',
    year: '2026',
    description:
      'Practiced using Generative AI and prompt design to analyze data and derive business insights.',
    certificateUrl: '',
  },
  {
    organization: 'Deloitte',
    title: 'Data Analytics',
    year: '2026',
    description:
      'Practiced analyzing business data, preparing Excel summaries, and communicating findings clearly.',
    certificateUrl: '',
  },
  {
    organization: 'AWS APAC',
    title: 'Solutions Architecture',
    year: '2026',
    description:
      'Explored cloud solution design through an industry simulation, learning how AWS services can address client requirements.',
    certificateUrl: '',
  },
]

export type Certificate = {
  title: string
  issuer: string
  date: string
  // Path to an uploaded image (e.g. '/certificates/name.jpg') or PDF.
  image?: string
  fileUrl?: string
  credentialUrl?: string
  // Only certificates with `published: true` are shown.
  published: boolean
}

// Add verified certificates here as they are uploaded, for example:
// { title: 'Course name', issuer: 'Organization', date: 'Month 2026',
//   fileUrl: '/certificates/course.pdf', published: true }
export const certificates: Certificate[] = []

export const education = [
  {
    level: 'Degree',
    title: 'B.Tech — Artificial Intelligence and Data Science',
    institution: 'RVS College of Engineering and Technology',
    duration: '2025 – 2028',
    current: true,
  },
  {
    level: 'Diploma',
    title: 'Diploma — Computer Science Engineering',
    institution: 'RVS Polytechnic College',
    duration: '2022 – 2025',
    current: false,
  },
]

export const skillGroups = [
  {
    name: 'AI & Generative AI',
    icon: 'sparkles',
    skills: ['Prompt Engineering', 'AI Prompt Design', 'Large Language Models (LLMs)', 'Generative AI Fundamentals'],
  },
  { name: 'Programming', icon: 'code', skills: ['Python Fundamentals'] },
  { name: 'Data Analytics', icon: 'chart', skills: ['Data Analytics', 'Data Cleaning', 'Microsoft Excel'] },
  { name: 'Cloud', icon: 'cloud', skills: ['AWS Fundamentals', 'Cloud Solution Design Fundamentals'] },
  { name: 'Tools', icon: 'tools', skills: ['Microsoft Word', 'Microsoft PowerPoint'] },
] as const

export const softSkills = ['Communication', 'Problem Solving', 'Quick Learning', 'Teamwork']

export const languages = [
  { name: 'Tamil', level: 'Native' },
  { name: 'English', level: 'Intermediate' },
]

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]
