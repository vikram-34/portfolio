// Profile content supplied by https://pulkitarora.vercel.app/.
// Dates, metrics and links preserve the supplied site's claims; no project dates,
// employers or proficiency percentages have been invented.
export const content = {
  name: 'Pulkit Arora', initials: 'PA', role: 'SDE & Backend Engineer',
  location: 'New Delhi, India', timezone: 'Asia/Kolkata', available: true,
  availability: 'AVAILABLE FOR SDE ROLES · 2027 TRACK',
  email: 'pulkitarora0714@gmail.com',
  resume: 'https://drive.google.com/file/d/12fEi-86Qx_tKJP8LDOAFQavjR_zg88oZ/view?usp=sharing',
  headline: ['Systems that', 'scale.'],
  intro: 'I build high-performance backend systems with low latency, real-time message routing, and reliable telemetry synchronization.',
  bio: 'I’m Pulkit, a final-year CSE student at BPIT, Delhi, working as a Java backend developer. I build production systems with Spring Boot, MySQL/PostgreSQL, and Docker, including a Manufacturing MIS deployed for a real client.',
  philosophy: 'Right now I’m deep into distributed systems work: Redis caching, RabbitMQ, and rate limiters with Lua scripting. I’m also exploring agentic AI architectures.',
  opportunity: 'Open to SDE / Backend internships with PPO or full-time opportunities for 2027. If you’re building something serious with Java, Spring Boot, or distributed data, I’m interested.',
  personal: 'Outside engineering, I’m an active football player and sports enthusiast.',
  metrics: [
    { value: '600+', label: 'Algorithm problems' },
    { value: '90%', label: 'DB reads cached' },
    { value: '100ms', label: 'Broadcast latency' },
    { value: '6+', label: 'Projects built' },
  ],
  socials: [
    { label: 'GitHub', icon: 'Github', url: 'https://github.com/Pulkitarora12' },
    { label: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/pulkit-arora-92502321a' },
    { label: 'LeetCode', icon: 'Code2', url: 'https://leetcode.com/u/pulkitarora0714/' },
  ],
  skills: [
    { name: 'Application core', items: ['Java', 'Spring Boot', 'C++', 'Spring Security', 'React.js', 'JavaScript'] },
    { name: 'Data & caching', items: ['Redis', 'PostgreSQL', 'MySQL', 'MongoDB'] },
    { name: 'Networking', items: ['WebSockets', 'REST APIs', 'Event-driven systems'] },
    { name: 'Operations & build', items: ['Docker', 'Nginx', 'AWS', 'Linux', 'Git'] },
    { name: 'AI & developer tools', items: ['Claude', 'Antigravity', 'Gemini'] },
  ],
  stack: ['Java', 'Spring Boot', 'Redis', 'PostgreSQL', 'Docker', 'React.js', 'WebSockets', 'AWS'],
  projects: [
    {
      id: 'codewar', name: 'CodeWar', number: '01', type: 'Real-time coding battles', theme: 'codewar',
      title: 'Real-time, rating-balanced developer face-offs.',
      tags: ['Spring Boot', 'WebSocket', 'Redis', 'React', 'MySQL'],
      summary: 'A competitive coding matchmaking platform hosting real-time, rating-balanced developer face-offs based on live Codeforces problem distributions.',
      repository: 'https://github.com/Pulkitarora12/CodeWar',
      visualNodes: ['React', 'WebSocket', 'Spring Boot', 'Redis · MySQL'],
      features: [
        'Competitive coding matchmaking for developer face-offs.',
        'Rating-balanced matches based on live Codeforces problem distributions.',
        'A React interface backed by Spring Boot, WebSocket, Redis, and MySQL.',
      ],
    },
    {
      id: 'authtemplate', name: 'AuthTemplate', number: '02', type: 'Spring Boot security', theme: 'authtemplate',
      title: 'A secure foundation for Spring Boot applications.',
      tags: ['Spring Security', 'JWT', 'OAuth2', 'Redis', 'TOTP MFA'],
      summary: 'A production-ready security starter pack providing modular authorization, token lifecycle controls, and robust audit logging.',
      repository: 'https://github.com/Pulkitarora12/AuthTemplate',
      visualNodes: ['OAuth2 · JWT', 'Spring Security', 'TOTP MFA', 'Audit logging'],
      features: [
        'Modular authorization with Spring Security.',
        'Token lifecycle controls using JWT, OAuth2, and Redis.',
        'TOTP multi-factor authentication and robust audit logging.',
      ],
    },
    {
      id: 'research-assistant', name: 'Research-Assistant', number: '03', type: 'AI-powered Chrome companion', theme: 'research',
      title: 'Context-aware explanations, right in the browser.',
      tags: ['Chrome Extension', 'Gemini AI API', 'JavaScript', 'HTML5', 'CSS'],
      summary: 'An intelligent browser extension that captures text selection context and triggers semantic explanations, summaries, or translations via Google’s Gemini AI.',
      repository: 'https://github.com/Pulkitarora12/Research-Assistant',
      visualNodes: ['Selected text', 'Chrome extension', 'Gemini AI', 'Explain · Summarize'],
      features: [
        'Captures the context of selected text in Chrome.',
        'Generates semantic explanations, summaries, and translations through the Gemini AI API.',
        'Built with JavaScript, HTML5, and CSS.',
      ],
    },
  ],
  experience: [
    {
      period: 'Nov 2025 — Jan 2026', role: 'Full Stack Developer (Freelance)', company: 'Remote',
      points: [
        'Architected and implemented a Manufacturing Management Information System (MIS) with Spring Boot and Thymeleaf, integrating Google Sheets SDK for real-time MySQL operational synchronization.',
        'Created an interactive production follow-up system with WebSockets and dynamic Role-Based Access Control, shortening operational issue resolution times by 30%.',
        'Deployed core microservices as background operations on Windows cloud infrastructure with monitoring telemetry.',
        'Wrote and executed end-to-end integration tests covering complex CRUD operations, API routes, and task-state queues.',
      ],
    },
    {
      period: 'Jun 2025 — Aug 2025', role: 'Software Engineer (Intern)', company: 'Delhi, India',
      points: [
        'Engineered a Sales Management SaaS platform featuring OAuth 2.0 security, fine-grained access matching, and responsive CSV reporting pipelines.',
        'Built responsive administrative panels and statistical telemetry tracking elements using Spring Boot and Spring Data JPA.',
        'Containerized backend modules with Docker and deployed on remote Linux systems behind Nginx reverse proxies with automated SSL handshakes.',
      ],
    },
  ],
  packages: [
    {
      name: 'npx whoami', subtitle: 'An interactive portfolio in your terminal.',
      description: 'Browse projects, download my resume, or send an email — all from an interactive CLI menu.',
      tags: ['Node.js', 'Inquirer', 'Chalk', 'Boxen'], command: 'npx pulkitarora',
      links: [{ label: 'GitHub', url: 'https://github.com/Pulkitarora12/pulkitarora-cli' }, { label: 'npm package', url: 'https://www.npmjs.com/package/pulkitarora' }],
    },
    {
      name: 'GrindLog', subtitle: 'A record of learning, one day at a time.',
      description: 'A personal productivity tracker and editorial blog for daily developer logs, skill checklists, and progress on an interactive activity calendar.',
      tags: ['Next.js', 'Prisma', 'PostgreSQL', 'React', 'TypeScript'],
      links: [{ label: 'GitHub', url: 'https://github.com/Pulkitarora12/GrindLog' }, { label: 'Live site', url: 'https://grind-log-one.vercel.app/' }],
    },
  ],
  education: [
    { degree: 'B.Tech in Computer Science & Engineering', school: 'Bhagwan Parshuram Institute of Technology (BPIT)', affiliation: 'Affiliated to GGSIPU · New Delhi, India', result: '8.78 CGPA', year: '2027 graduation' },
    { degree: 'Class XII · Senior Secondary', school: 'Ben-Hur Public School', affiliation: 'CBSE · Pilibhit, Uttar Pradesh', result: '91.6%', year: '2022 graduation' },
    { degree: 'Class X · Secondary', school: 'Ben-Hur Public School', affiliation: 'CBSE · Pilibhit, Uttar Pradesh', result: '94.6%', year: '2020 graduation' },
  ],
  leadership: {
    organization: 'Drishti — Rotaract Club of BPIT', tenure: '2 years 9 months',
    roles: [
      { role: 'Vice President', period: 'Jul 2025 — Jun 2026', duration: '1 year' },
      { role: 'Executive Board Member', period: 'Jul 2024 — Jun 2025', duration: '1 year' },
      { role: 'Member', period: 'Oct 2023 — Jun 2024', duration: '9 months' },
    ],
  },
};
