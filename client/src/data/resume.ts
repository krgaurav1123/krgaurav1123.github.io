import { ResumeData } from "@/lib/types";

export const resumeData: ResumeData = {
  basics: {
    name: "Gaurav Kumar",
    label: "Senior Software Developer",
    image: "",
    email: "kr.gaurav1123@gmail.com",
    phone: "+91 8984274952",
    url: null,
    summary:
      "A passionate and results-driven Senior Software Developer with 7+ years of experience in developing and optimizing tools using C++ and the Qt framework. Proven ability to design and implement graphical user interfaces (GUI) and collaborate with stakeholders to deliver high-quality software. Strong proficiency in object-oriented programming, CI/CD practices, Docker, QEMU, Prometheus, Grafana, and Git. Adept at driving improvements in code quality, ensuring scalability, and working in cross-functional teams to achieve development goals. Expertise in developing plugins for vCAN interfaces for CAN communication.",
    location: {
      address: "Bommanahalli, Karnataka",
      postalCode: "",
      city: "Bengaluru",
      countryCode: "IN",
      region: "Karnataka",
    },
    profiles: [
      {
        network: "LinkedIn",
        username: "Gaurav Kumar",
        url: null,
        icon: "linkedin",
      },
    ],
  },
  work: [
    {
      company: "Bosch Global Software Technologies",
      position: "Senior Software Engineer",
      website: "https://www.bosch.in/",
      startDate: "2022-04-01",
      endDate: null,
      summary:
        "Developed and optimized core C++ and Qt libraries for autonomous driving simulation tools.",
      highlights: [
        "Developed and optimized core C++ and Qt libraries for autonomous driving simulation tools.",
        "Integrated Docker to create isolated and reproducible development environments, streamlining the build process and facilitating seamless multi-container communication.",
        "Led the implementation of real-time performance monitoring using Prometheus, Grafana, and Node Exporter, enabling proactive identification and resolution of performance bottlenecks.",
        "Managed CI/CD pipelines using GitHub Actions for automating build, test, and deployment.",
        "Delivered frequent progress presentations to stakeholders, ensuring alignment with project goals and timely resolution of blockers.",
        "Developed C++ and Qt plugins to interface with vCAN (virtual CAN) interfaces, enabling efficient communication and testing of CAN-based components within the simulation environment.",
      ],
    },
    {
      company: "IIC Technologies Limited",
      position: "Software Developer",
      website: "https://www.iictechnologies.com/",
      startDate: "2021-04-01",
      endDate: "2022-03-31",
      summary:
        "Developed GIS-based system software for DRDL using Qt and PostgreSQL.",
      highlights: [
        "Developed GIS-based system software for DRDL using Qt and PostgreSQL.",
        "Implemented Docker containerization for development environments.",
        "Optimized Qt-based graphical user interfaces, improving user efficiency and enhancing data visualization capabilities for the GIS system.",
        "Worked closely with stakeholders to deliver feature updates.",
      ],
    },
    {
      company: "Bharat Electronics Limited",
      position: "Contract Engineer",
      website: "https://www.bel-india.in/",
      startDate: "2018-12-01",
      endDate: "2021-03-31",
      summary:
        "Developed a simulation system for the Close-In Weapon System (CIWS) using Qt for GUI and C++ for backend with distributed system communication using UDP protocol.",
      highlights: [
        "Developed a simulation system for the Close-In Weapon System (CIWS) using Qt for GUI and C++ for backend with distributed system communication using UDP protocol.",
        "Enhanced user interaction within the CIWS simulation system by improving Qt widgets.",
      ],
    },
    {
      company: "Bharat Electronics Limited",
      position: "Graduate Apprentice Trainee",
      website: "https://www.bel-india.in/",
      startDate: "2018-02-01",
      endDate: "2018-12-01",
      summary:
        "Designed a web application for the TCW Product Life Cycle using ASP.NET and C#.",
      highlights: [
        "Designed a web application for the TCW Product Life Cycle using ASP.NET and C#.",
        "Managed backend with MySQL and created responsive front-end with HTML, CSS, and Bootstrap.",
      ],
    },
  ],
  education: [
    {
      institution: "Biju Patnaik University of Technology",
      url: "https://www.bput.ac.in/",
      area: "Computer Science & Engineering",
      studyType: "Bachelor of Technology",
      startDate: "2012-06-01",
      endDate: "2016-05-31",
      score: null,
      courses: [],
    },
  ],
  skills: [
    {
      name: "Programming",
      level: null,
      keywords: ["C", "C++", "Python", "C#"],
      category: "Technical",
    },
    {
      name: "Development Tools",
      level: null,
      keywords: ["VSCode", "Qt", "Visual Studio"],
      category: "Tools & Platforms",
    },
    {
      name: "Testing & CI/CD",
      level: null,
      keywords: ["GTest", "CMake", "GitHub Actions"],
      category: "Testing",
    },
    {
      name: "Containerization & Virtualization",
      level: null,
      keywords: ["Docker", "QEMU"],
      category: "Tools & Platforms",
    },
    {
      name: "Databases & Monitoring",
      level: null,
      keywords: [
        "MySQL",
        "PostgreSQL",
        "Prometheus",
        "Grafana",
        "Node Exporter",
      ],
      category: "Tools & Platforms",
    },
    {
      name: "CAN Communication",
      level: null,
      keywords: ["vCAN"],
      category: "Technical",
    },
  ],
  projects: [
    {
      name: "Web App for Employee Self Help",
      description: "Developed for Tata Steel Ltd.",
      highlights: [],
      keywords: [],
      startDate: null,
      endDate: null,
      url: null,
      roles: [],
      entity: "Tata Steel Ltd.",
      type: null,
      image: null,
    },
    {
      name: "LLLR Simulator",
      description:
        "Developed radar and target modeling simulation tool using Qt for GUI and SQLite for database management.",
      highlights: [],
      keywords: [],
      startDate: null,
      endDate: null,
      url: null,
      roles: [],
      entity: "Bharat Electronics Limited",
      type: null,
      image: null,
    },
    {
      name: "5S Principles Web Application",
      description:
        "Created a web application to assess the cleanliness and punctuality of the TCW Division, incorporating report generation and data visualization.",
      highlights: [],
      keywords: [],
      startDate: null,
      endDate: null,
      url: null,
      roles: [],
      entity: "Bharat Electronics Limited",
      type: null,
      image: null,
    },
  ],
  certificates: [
    {
      name: ".NET Certification",
      date: null,
      issuer: "WebTown Solution",
      url: null,
    },
  ],
  languages: [
    {
      language: "English",
      fluency: "Fluent",
    },
    {
      language: "Hindi",
      fluency: "Native",
    },
  ],
  awards: [],
};
