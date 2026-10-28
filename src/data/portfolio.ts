export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tagline: string;
  description: string;
  details: string[];
  techStack: string[];
  metrics: string[];
  githubUrl: string;
  demoUrl: string;
  category: "AI/ML" | "Full-Stack" | "NLP";
  highlights: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  specialization: string;
  institution: string;
  campus: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  badge: string;
  date?: string;
  verificationUrl?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  description: string;
  tag: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    callsign: string;
    roles: string[];
    tagline: string;
    about: string;
    stats: {
      label: string;
      value: string;
      numericValue: number;
      suffix?: string;
      subtext: string;
    }[];
    location: string;
    email: string;
    phone: string;
    resumeUrl: string;
    social: {
      github: string;
      linkedin: string;
      leetcode: string;
    };
  };
  education: Education;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: { language: string; proficiency: string; code: string }[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Raj Dwivedi",
    callsign: "RD-AI-2027",
    roles: ["AI/ML Engineer", "Full-Stack Developer", "Problem Solver"],
    tagline:
      "Engineering scalable AI/ML solutions, resilient cloud backends, and intelligent distributed architectures with rigorous problem-solving.",
    about:
      "Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning with hands-on experience in software development, backend engineering, and AI/ML projects through internships and academic work. Proficient in Python, Java, SQL, REST APIs, and database-driven application development. Strong problem-solving mindset, passionate about learning, optimizing complex workflows, and building scalable applications.",
    stats: [
      {
        label: "Industry Internships",
        value: "2",
        numericValue: 2,
        subtext: "Infosys Springboard & Edunet Foundation",
      },
      {
        label: "Flagship Projects",
        value: "3",
        numericValue: 3,
        subtext: "Urban Resilience, Eco-Packaging & NLP",
      },
      {
        label: "Academic CGPA",
        value: "8.88",
        numericValue: 8.8,
        suffix: " / 10",
        subtext: "SRM Institute of Science & Technology",
      },
    ],
    location: "Chennai, India",
    email: "rajiaf202704@gmail.com",
    phone: "+91-9740010439",
    resumeUrl: "/resume.pdf",
    social: {
      github: "https://github.com/Raj-Dwivedi2005",
      linkedin: "https://www.linkedin.com/in/raj-dwivedi-9935952a2/",
      leetcode: "https://leetcode.com/u/rajdwivedi27/",
    },
  },

  education: {
    degree: "B.Tech in Computer Science and Engineering",
    specialization: "Artificial Intelligence and Machine Learning",
    institution: "SRM Institute of Science and Technology",
    campus: "Ramapuram",
    location: "Chennai, Tamil Nadu",
    period: "2023 - 2027",
    cgpa: "8.88 / 10.0",
    highlights: [
      "Specialization in Artificial Intelligence & Machine Learning algorithms",
      "Consistently high academic standing with CGPA 8.88",
      "Core coursework: Advanced DSA, Machine Learning, DBMS, Operating Systems, Computer Networks",
      "Active participant in technical symposiums, coding competitions, and system design challenges",
    ],
  },

  skills: [
    {
      category: "Languages",
      iconName: "Code2",
      skills: ["Python", "Java", "SQL", "TypeScript", "JavaScript"],
    },
    {
      category: "Core CS",
      iconName: "Cpu",
      skills: [
        "Data Structures & Algorithms",
        "OOP",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
      ],
    },
    {
      category: "Web & Backend",
      iconName: "Server",
      skills: [
        "HTML",
        "CSS",
        "React.js",
        "Next.js",
        "Node.js",
        "FastAPI",
        "REST APIs",
      ],
    },
    {
      category: "AI/ML & Analytics",
      iconName: "Brain",
      skills: [
        "Machine Learning",
        "NumPy",
        "Pandas",
        "Regression",
        "Classification",
        "NLP",
        "TensorFlow",
        "Scikit-learn",
      ],
    },
    {
      category: "Databases",
      iconName: "Database",
      skills: ["MongoDB", "SQL (Relational)"],
    },
    {
      category: "Tools & DevOps",
      iconName: "Terminal",
      skills: ["Git", "Docker", "Linux", "Postman"],
    },
  ],

  experience: [
    {
      id: "infosys-springboard",
      role: "AI Intern",
      company: "Infosys Springboard",
      type: "Remote Internship",
      period: "Nov 2025 - Mar 2026",
      location: "Remote, India",
      description:
        "Engineered an end-to-end intelligent recommendation web application for eco-friendly packaging materials based on strict product specifications and environmental constraints.",
      bullets: [
        "Built a responsive Next.js frontend and high-performance FastAPI backend to analyze item dimensions, fragility, and protection requirements.",
        "Implemented multi-attribute decision algorithms comparing packaging alternatives across unit cost, drop-protection rating, volumetric efficiency, and lifecycle environmental footprint.",
        "Integrated carbon-impact estimation calculators delivering actionable lifecycle greenhouse gas savings to enterprises.",
        "Designed clean RESTful endpoints and optimized JSON payloads for sub-100ms response latencies.",
      ],
      technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "REST APIs", "Tailwind CSS"],
    },
    {
      id: "edunet-foundation",
      role: "AI Intern",
      company: "Edunet Foundation",
      type: "Remote Internship",
      period: "Apr 2025 - May 2025",
      location: "Remote, India",
      description:
        "Developed a computer-vision powered machine learning application for rapid, automated diagnosis of plant-leaf diseases from raw agricultural imagery.",
      bullets: [
        "Constructed deep learning image classification pipelines utilizing convolutional neural networks to classify multiple crop leaf diseases.",
        "Developed an intuitive, friction-free web interface allowing users to upload foliage images and instantly view disease diagnoses and confidence scores.",
        "Conducted extensive data preprocessing, augmentation, and model evaluation to achieve robust predictive accuracy across diverse lighting conditions.",
      ],
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Computer Vision", "REST APIs", "Streamlit/Web"],
    },
  ],

  projects: [
    {
      id: "hydroguard-ai",
      title: "HydroGuard.ai",
      subtitle: "AI-Powered Urban Flood Resilience Platform",
      date: "Jan 2026",
      tagline:
        "Real-time urban flood risk prediction and geospatial vulnerability mapping using Random Forest ensembles.",
      description:
        "A full-stack predictive resilience web platform that forecasts urban flood risks by processing real-time and historical environmental telemetry (rainfall precipitation, elevation gradients, soil saturation, and urban drainage factors).",
      details: [
        "Built and tuned Random Forest classification and regression models to predict flood occurrence probability and classify severity risk levels with high precision.",
        "Engineered a dynamic Next.js 14 dashboard with interactive geospatial flood zone heatmaps, emergency alert thresholds, and risk telemetry.",
        "Developed a modular FastAPI backend serving vectorized predictions, batch risk scoring, and structured GeoJSON telemetry.",
        "Integrated responsive data visualization cards highlighting elevation profiles, drainage bottlenecks, and rainfall intensity trends.",
      ],
      techStack: ["Next.js", "TypeScript", "FastAPI", "Python", "Scikit-learn", "Tailwind CSS"],
      metrics: ["Random Forest Ensemble", "Real-time Telemetry", "Interactive Heatmaps", "Sub-second Inference"],
      githubUrl: "https://github.com/Raj-Dwivedi2005/hydroguard-ai",
      demoUrl: "https://hydroguard-ai.vercel.app/dashboard",
      category: "AI/ML",
      highlights: [
        "Multi-variable flood risk estimation",
        "Geospatial vulnerability breakdown",
        "FastAPI microservices architecture",
      ],
    },
    {
      id: "ecopack-ai",
      title: "EcoPackAI",
      subtitle: "Intelligent Sustainable Packaging Recommendation Engine",
      date: "Nov 2025",
      tagline:
        "Algorithmic eco-friendly packaging selection engine balancing cost, protection, volumetric efficiency, and carbon savings.",
      description:
        "An enterprise-ready sustainable packaging decision engine that analyzes physical product dimensions, weight, fragility rating, and shipping transit risks to recommend optimal biodegradable and recyclable packaging alternatives.",
      details: [
        "Engineered multi-criteria comparative algorithms evaluating packaging options across four core vectors: unit procurement cost, structural protection, volumetric fit, and environmental impact score.",
        "Developed a rich Next.js interactive dashboard presenting side-by-side packaging comparisons, trade-off matrices, and downloadable compliance summaries.",
        "Integrated life-cycle carbon savings calculators illustrating potential CO2 reduction and plastic offset metrics.",
        "Created scalable RESTful APIs in FastAPI with comprehensive OpenAPI schema validation.",
      ],
      techStack: ["Next.js", "TypeScript", "FastAPI", "Python", "Tailwind CSS", "REST APIs"],
      metrics: ["Multi-attribute Comparison", "Carbon Offset Calculator", "Trade-off Matrices", "FastAPI Service"],
      githubUrl: "https://github.com/Raj-Dwivedi2005/EcoPackAI",
      demoUrl: "https://github.com/Raj-Dwivedi2005",
      category: "Full-Stack",
      highlights: [
        "Environmental lifecycle metric quantification",
        "Algorithmic material matching",
        "Modern glassmorphism user interface",
      ],
    },
    {
      id: "ai-text-detector",
      title: "AI-Generated Text Detection System",
      subtitle: "Linguistic & Statistical NLP Classifier",
      date: "Sept 2025",
      tagline:
        "NLP system classifying text as human-written or AI-generated through perplexity, burstiness, and stylistic feature analysis.",
      description:
        "A machine learning and NLP application that inspects textual documents to distinguish between human-authored writing and synthetic LLM-generated prose by evaluating linguistic distributions, token predictability, and syntactic variance.",
      details: [
        "Engineered NLP feature extraction pipelines analyzing n-gram frequencies, token entropy, vocabulary diversity, and syntactic sentence length variance.",
        "Trained and evaluated Scikit-learn classification models on diverse corpora of human essays and AI-synthesized responses.",
        "Built a FastAPI backend pipeline that calculates sentence-level probability heatmaps and overall confidence scores.",
        "Created an interactive user interface enabling direct paste analysis, confidence meter visualization, and highlighted suspicious segments.",
      ],
      techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "NLP libraries", "FastAPI", "Streamlit"],
      metrics: ["Perplexity & Burstiness", "Confidence Scoring", "Sentence Breakdown", "FastAPI Engine"],
      githubUrl: "https://github.com/Raj-Dwivedi2005/ai-text-detector",
      demoUrl: "https://github.com/Raj-Dwivedi2005",
      category: "NLP",
      highlights: [
        "Deep stylistic and statistical feature engineering",
        "Real-time confidence level estimation",
        "Dual interface support (API & interactive web UI)",
      ],
    },
  ],

  certifications: [
    {
      title: "Python for Data Science",
      issuer: "NPTEL - IIT Madras",
      badge: "Elite / Certified",
      date: "NPTEL Certified",
    },
    {
      title: "Database Management System",
      issuer: "NPTEL - IIT Kharagpur",
      badge: "Elite / Certified",
      date: "NPTEL Certified",
    },
    {
      title: "MongoDB Basics",
      issuer: "MongoDB University",
      badge: "Certified Associate",
      date: "MongoDB Certified",
    },
  ],

  achievements: [
    {
      title: "SSB Interview Candidate (Twice)",
      organization: "Services Selection Board (SSB)",
      description:
        "Recommended / appeared for the rigorous Services Selection Board (SSB) interview on two separate occasions for Indian Armed Forces officer selection, demonstrating exceptional leadership qualities, psychological resilience, team synergy, situational awareness, and high-pressure decision-making capabilities.",
      tag: "Officer Selection Milestone",
    },
  ],

  languages: [
    {
      language: "English",
      proficiency: "Professional Working & Academic Proficiency",
      code: "ENG",
    },
    {
      language: "Hindi",
      proficiency: "Native / Bilingual Proficiency",
      code: "HIN",
    },
  ],
};
