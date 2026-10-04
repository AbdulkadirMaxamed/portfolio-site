// CV / résumé content rendered by the CV document viewer.
// Source: Abdulkadir-Maxamed.pdf
//
// The downloadable PDF is generated from this same data by app/api/cv/route.ts,
// so updating this file updates both the on-screen CV and the PDF.
// (To serve a hand-made PDF instead, put it in public/cv/ and point `pdfPath` at it.)

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
  summary?: string;
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
  /** Optional line under the title, e.g. degrees */
  credentials?: string;
  summary: string;
  contacts: { kind: "email" | "phone" | "location" | "linkedin" | "github"; text: string; href?: string }[];
  experience: CVExperience[];
  education: CVEducation[];
  skills: { label: string; value: string }[];
  projects: CVProject[];
  certifications: string[];
  interests: string[];
  references?: string;
}

export const cv: CV = {
  fileName: "Abdulkadir-Maxamed-CV.pdf",
  pdfPath: "/api/cv",
  name: "Abdulkadir Maxamed",
  title: "Software Engineer",
  credentials: "MSc Cyber Security & BSc Computer Science",
  summary:
    "Associate software engineer adept in bringing forth expertise in designing, implementing, and testing solutions according to client specifications. Able to efficiently self-manage during independent projects, as well as collaborate effectively as part of a productive team.",
  contacts: [
    { kind: "email", text: "abdulkadir.q12@gmail.com", href: "mailto:abdulkadir.q12@gmail.com" },
    { kind: "phone", text: "07393864922", href: "tel:+447393864922" },
    { kind: "location", text: "Birmingham, West Midlands" },
    { kind: "linkedin", text: "LinkedIn", href: "https://www.linkedin.com/in/abdulkadir-maxamed/" },
    { kind: "github", text: "GitHub", href: "https://github.com/AbdulkadirMaxamed" },
  ],
  experience: [
    {
      role: "Founder",
      company: "CodersIO",
      period: "Aug 2022 – Present",
      location: "London",
      bullets: [
        "Scaling a small tech community to 400+ students.",
        "Providing students with live lessons and resource material to assist them with learning coding languages.",
        "Hosting several talks with established software engineers to inspire students with their journey in coding.",
        "Mentoring students in the community by providing CV help and interview preparations.",
        "Planning and executing marketing strategies in order to generate more sales.",
        "Outreach and networking through B2B in order to provide additional branches of opportunities for students.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Capgemini",
      period: "Nov 2021 – Present",
      location: "Telford, Shropshire",
      bullets: [
        "Implemented scalable solutions based on application data extracted and analysed by senior developers.",
        "Created and implemented automated testing solutions according to client's needs, along with deploying onto cloud infrastructure such as AWS.",
        "Designed and executed various test plans ranging from integration to system testing.",
        "Implemented and updated application modules under the direction of the solutions architect during projects.",
        "Regularly maintained and created technical specifications to include newly designed features for developed applications.",
        "Mentored new starters, providing knowledge transfers on systems used.",
      ],
    },
    {
      role: "Full Stack Software Developer",
      company: "OWO Living",
      period: "Oct 2018 – Aug 2019",
      location: "Birmingham, West Midlands",
      bullets: [
        "Designed, implemented, and monitored company stock management and sites for continuous improvement in a fast-paced environment all under one holistic software.",
        "Enhanced coding of CSS and JavaScript, improving user experience score from use of excel spreadsheets to a more appealing software.",
        "Utilised programming languages such as JavaScript and ReactJS to create and complete client projects according to the specification set beforehand.",
        "Created a bespoke backend system to maintain company's stock.",
        "Work independently with efficiency to meet client deadlines on projects.",
        "Applied the Software Development Life Cycle to keep track of project deadlines to ensure the client knows the progress of the project.",
      ],
    },
  ],
  education: [
    {
      degree: "MSc Cyber Security",
      school: "Coventry University",
      period: "Nov 2020",
      location: "Coventry",
    },
    {
      degree: "BSc Computer Science",
      school: "Coventry University",
      period: "Nov 2019",
      location: "Coventry",
    },
  ],
  skills: [
    { label: "Languages", value: "JavaScript, Dart, HTML 5 & CSS 3" },
    { label: "Frameworks", value: "Node JS, NextJS, Flutter" },
    { label: "Databases", value: "Oracle SQL, PL/SQL" },
    { label: "Cloud & APIs", value: "AWS, RESTful API implementation" },
    { label: "Practices", value: "TDD, Agile Scrum, Git Version Control" },
  ],
  projects: [
    {
      name: "Mobile App Development",
      description:
        "In my spare time, I develop mobile applications to improve my daily routine and expand my skills. I explore new programming languages and tools, currently focusing on Dart to create small apps and enhance my development techniques.",
      tags: ["Dart", "Flutter"],
    },
    {
      name: "theNames App",
      description:
        "Collaborated in a team to build a Restful API, responsible for implementing a TDD framework to test the API before development and configuring authentication to secure the API endpoints.",
      tags: ["RESTful API", "TDD", "Authentication"],
    },
  ],
  certifications: ["ISTQB Foundation Tester", "AWS Cloud Practitioner", "Microsoft Azure Fundamentals"],
  interests: ["Football", "Gym"],
  references: "Available upon request",
};
