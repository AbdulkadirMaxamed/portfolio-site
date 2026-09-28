// CV / résumé content rendered by the CV document viewer.
// PLACEHOLDER content taken from the design — replace with your own.
//
// To offer your real PDF for download/print, drop it at
//   public/cv/resume.pdf
// and keep `pdfPath` pointing at it.

export interface CVExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface CVEducation {
  degree: string;
  school: string;
  period: string;
  location: string;
  summary: string;
}

export interface CVProject {
  name: string;
  description: string;
  tags: string[];
  href?: string;
}

export interface CV {
  fileName: string;
  pdfPath: string;
  name: string;
  title: string;
  summary: string;
  contacts: { kind: "email" | "phone" | "location" | "linkedin" | "github"; text: string; href?: string }[];
  experience: CVExperience[];
  education: CVEducation[];
  skills: { label: string; value: string }[];
  projects: CVProject[];
}

export const cv: CV = {
  fileName: "Resume.pdf",
  pdfPath: "/cv/resume.pdf",
  name: "Alex Morgan",
  title: "Full-Stack Developer",
  summary:
    "I build web applications with a focus on great user experience, clean code, and real-world impact. Passionate about creating tools that make people's lives easier.",
  contacts: [
    { kind: "email", text: "alex.morgan@example.com", href: "mailto:alex.morgan@example.com" },
    { kind: "phone", text: "+1 (555) 123-4567" },
    { kind: "location", text: "San Francisco, CA" },
    { kind: "linkedin", text: "linkedin.com/in/alexmorgan", href: "https://linkedin.com/in/alexmorgan" },
    { kind: "github", text: "github.com/alexmorgan", href: "https://github.com/alexmorgan" },
  ],
  experience: [
    {
      role: "Senior Full-Stack Developer",
      company: "TechCorp",
      period: "Jan 2022 – Present",
      location: "San Francisco, CA",
      bullets: [
        "Developed and maintained scalable web applications using React, Node.js, and PostgreSQL.",
        "Led a small team of engineers and collaborated with product designers to ship new features.",
        "Improved application performance by 40% through optimization and caching strategies.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "StartupCo",
      period: "Jun 2019 – Dec 2021",
      location: "Remote",
      bullets: [
        "Built and shipped multiple product features from concept to production.",
        "Worked across the stack with TypeScript, React, and AWS.",
        "Collaborated closely with cross-functional teams to deliver high-quality software.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "University of California, Berkeley",
      period: "2015 – 2019",
      location: "Berkeley, CA",
      summary: "Focused on software engineering, algorithms, and distributed systems.",
    },
  ],
  skills: [
    { label: "Frontend", value: "React, Next.js, TypeScript, Tailwind CSS" },
    { label: "Backend", value: "Node.js, Python, Express, Django" },
    { label: "Databases", value: "PostgreSQL, MongoDB, Redis" },
    { label: "DevOps", value: "Docker, AWS, CI/CD, GitHub Actions" },
    { label: "Tools", value: "Git, VS Code, Linux, Figma" },
  ],
  projects: [
    {
      name: "Portfolio OS",
      description: "A personal productivity and portfolio desktop experience built with Next.js and TypeScript.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      href: "#",
    },
    {
      name: "Task Manager",
      description: "A full-stack task management application with real-time collaboration.",
      tags: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      href: "#",
    },
  ],
};
