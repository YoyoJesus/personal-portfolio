import type { SiteConfig, SiteContent } from "./types";

export const SITE_CONFIG: SiteConfig = {
  title: "Austin Sternberg - Computer Science Student",
  author: "Austin Sternberg",
  description:
    "CS Senior @ Kent State, with a passion for web development & cybersecurity.",
  lang: "en",
  siteLogo: "/austin-small.jpg",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Leadership", href: "#leadership" },
    { text: "Projects", href: "#projects" },
    { text: "Workspace", href: "#workspace" },
    { text: "When I'm Not Coding", href: "#not-coding" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "Linktree" , href: "https://yoyojesus.xyz" },
    { text: "LinkedIn", href: "https://www.linkedin.com/in/austin-sternberg/" },
    { text: "Github", href: "https://github.com/yoyojesus" },
    { text: "Youtube", href: "https://www.youtube.com/@yoyojesus" },
    
  ],
  socialImage: "/zen-og.png",
  canonicalURL: "https://dev.asternberg.xyz",
  activity: { letterboxd: "yoyojesus", lastfm: "yoyojesus", steam: "76561198820308988", github: "yoyojesus" },
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Austin Sternberg",
    specialty: "Computer Science Student",
    summary:
      "CS Senior at Kent State University. President for HacKSU, Kent State's premier computer science club. President of Kent State Combat Robotics.",
    email: "austinsternberg45@gmail.com",
    resume: "https://resume.asternberg.xyz",
    blog: "https://blog.yoyojesus.xyz",
  },
  hackerHero: {
    specialty: "CTF Competitor & Security Enthusiast",
    summary:
      "I take systems apart to see how they break, then put them back together stronger. Web apps, networks, and whatever the next challenge throws at me.",
    wins: [
      { place: "1st", event: "Hack Dearborn 4" },
      { place: "1st", event: "Nex Hacks 2026 - DevSwarm & Token Company Tracks" },
      { place: "1st", event: "Quantum CTF @ BSidesCLE 2026" },
      { place: "4th", event: "Capture Ohio CTF 2025" },
    ],
  },
  experience: [
    {
      company: "Awetomaton Ltd",
      position: "Information Technology Intern",
      startDate: "May 2026",
      endDate: "August 2026",
      workType: "Internship",
      summary: [
        "Developed internal tools to help streamline operations and improve efficiency across the company.",
        "Improved previous workflows, implementing strong and more scalable solutions to help the company grow.",
        "Worked closely with one of the founders to improve tools and workflows, and learm some of the day-to-day of this small but growing company.",
      ],
    },
    {
      company: "Riverside Local Schools",
      position: "IT Intern",
      startDate: "May 2025",
      endDate: "Jan 2026",
      workType: "Internship - Seasonal",
      summary: [
        "Supported network and device maintenance across district buildings.",
        "Troubleshooting hardware and software issues for staff, classrooms, and students.",
        "Assisted with system upgrades and deployment of new technologies.",
        "Worked closely with the IT team to troubleshoot and resolve networking issues and ensure optimal performance of school systems.",
        "Lead student workers in learning how to repair and maintain devices used by students and staff.",
      ],
    },
    {
      company: "Riverside Local Schools",
      position: "IT Student",
      startDate: "Jun 2022",
      endDate: "Feb 2025",
      workType: "Seasonal",
      summary: [
        "Assessed and repaired student devices, primarily chromebooks.",
        "Cleaned and inventoried tech equipment across the district.",
        "Prepared devices for sale or disposal, primarily through the deletion and destruction of data to DOTD standards.",
        "Took inventory of all technology assets in the district, and set up equipment for classroom use.",
      ],
    },
  ],
  leadership: [
    {
      company: "HacKSU",
      position: "President",
      startDate: "August 2026",
      endDate: "Present",
      workType: "Part-Time",
      summary: [
        "Manage a team of 15+ executive members to plan and execute events for a club of 100+ members.",
        "Oversee the planning and execution of the club's annual events, including a hackathon, CTF, and various workshops and speaker events throughout the year.",
        "Build connections with industry professionals to bring in speakers and sponsors for events, and to create opportunities for members.",
        "Lead weekly executive meetings to coordinate efforts across different teams and ensure the success of club events.",
      ],
      previousPositions: [
        {
          position: "Events Coordinator",
          startDate: "Jan 2025",
          endDate: "August 2026",
        }
      ],
      hacker: {
        position: "CTF Director",
        previousPositions: [
          { position: "President", startDate: "August 2026", endDate: "Present" },
          { position: "Events Coordinator", startDate: "Jan 2025", endDate: "August 2026" },
        ],
        summary: [
          "Run Kent Hack It, HacKSU's annual capture-the-flag competition, from challenge design through game day.",
          "Write and test challenges across web exploitation, forensics, cryptography, and reverse engineering.",
          "Teach members the fundamentals through workshops and practice challenges, and build HacKSU's competitive CTF team.",
        ],
      },
    },
    {
      company: "KSU Combat Robotics",
      hackerHidden: true,
      position: "President",
      startDate: "May 2025",
      endDate: "Present",
      workType: "Part-Time",
      summary: [
        "Lead a team of 30+ members in designing, building, and repairing combat robots for competition.",
        "Organize meetings, delegate tasks, and manage the club's budget and resources with the support of the executive team.",
        "Coordinate with departmental and university officials to ensure club events run smoothly and within guidelines.",
        "Develop lessons and workshops to teach members how to use tools like CAD software, soldering, and electronics.",
      ],
      previousPositions: [
        {
          position: "Project Manager",
          startDate: "May 2024",
          endDate: "May 2025",
        }
      ],
    },
  ],
  projects: [
    {
      name: "BluQ",
      status: "Prototype",
      openSource: true,
      awards: [
        { label: "1st place at Hack Dearborn 4", href: "https://devpost.com/software/bluq" },
      ],
      summary: "TCP/IP implemented in Bluetooth to build a simple chat application. Built with python and Angular for user frontend. ",
      linkPreview: "/",
      linkSource: "https://github.com/IanRohrbacher/Dearborn-Hack-2025",
      linkWriteup: "https://devpost.com/software/bluq",
      image: "/bluq.webp",
      languages: [
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
        { icon: "devicon-angular-plain colored", name: "Angular", languageLink: "https://angular.dev/" },
        { icon: "devicon-flask-original colored", name: "Flask", languageLink: "https://flask.palletsprojects.com/" },
        { icon: "devicon-raspberrypi-plain colored", name: "Raspberry Pi", languageLink: "https://www.raspberrypi.com/" },
        { icon: "devicon-bash-plain", name: "Bash", languageLink: "https://www.gnu.org/software/bash/" },
      ],
      collaborators: [
        {
          name: "Ian Rohrbacher",
          image: "/collaborators/ianr.jpg",
          profileLink: "http://rohrbacher.cc/",
        },
        {
          name: "Mason Bair",
          image: "/collaborators/masonb.jpg",
          profileLink: "https://www.masonbair.com/",
        },
        {
          name: "Noah Al-lahabi",
          image: "/collaborators/noaha.jpg",
          profileLink: "https://enderhubris.github.io/my_happy_site/",
        },
      ],
    },
    {
      name: "Holotrace",
      status: "Prototype",
      openSource: true,
      hackathon: { name: "SteelHacks XIII", href: "https://steelhacksxiii.devpost.com/" },
      summary: "Turns photos of hand-drawn circuits into editable digital circuits. Built with SvelteKit, Tauri, OpenCV, and custom PyTorch models. The AI model server is currently offline.",
      linkPreview: "https://app.ifyousmellityouwilleventuallydie.tech/",
      linkSource: "https://github.com/HappyCoderHackathons/holotrace",
      linkWriteup: "https://devpost.com/software/holotrace",
      image: "/holotrace.webp",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "SvelteKit", languageLink: "https://svelte.dev/" },
        { icon: "devicon-tauri-plain colored", name: "Tauri", languageLink: "https://tauri.app/" },
        { icon: "devicon-rust-original", name: "Rust", languageLink: "https://www.rust-lang.org/" },
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
        { icon: "devicon-opencv-plain colored", name: "OpenCV", languageLink: "https://opencv.org/" },
        { icon: "devicon-pytorch-original colored", name: "PyTorch", languageLink: "https://pytorch.org/" },
      ],
      collaborators: [
        { name: "Noah Al-lahabi", image: "/collaborators/noaha.jpg", profileLink: "https://enderhubris.github.io/my_happy_site/" },
        { name: "Ian Rohrbacher", image: "/collaborators/ianr.jpg", profileLink: "http://rohrbacher.cc/" },
        { name: "Savar Shrestha", image: "/collaborators/savars.jpg", profileLink: "https://www.linkedin.com/in/savar-shrestha/" },
      ],
    },
    {
      name: "Dependency Domino",
      status: "Prototype",
      openSource: true,
      hackathon: { name: "HackOHI/O 2026", href: "https://hackohio2026.devpost.com/" },
      summary: "Turns a project's lockfile into an interactive dependency graph. Pick any package to simulate a compromise and see everything that depends on it, with known advisories pulled from OSV.dev. Built with SvelteKit and Cytoscape.",
      hacker: {
        summary: "A supply-chain blast radius mapper. Feed it an npm, pnpm, Yarn, or Bun lockfile, mark any package as compromised, and trace every dependent back to the project root, with OSV.dev advisories layered on top.",
      },
      linkPreview: "https://dependency.toolsmith.online/",
      linkSource: "https://github.com/YoyoJesus/Dependency-Domino",
      linkWriteup: "https://devpost.com/software/dependency-domino",
      image: "/dependency-domino.webp",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "SvelteKit", languageLink: "https://svelte.dev/" },
        { icon: "devicon-typescript-plain colored", name: "TypeScript", languageLink: "https://www.typescriptlang.org/" },
        { icon: "https://js.cytoscape.org/img/cytoscape-logo.svg", name: "Cytoscape.js", languageLink: "https://js.cytoscape.org/" },
        { icon: "devicon-tailwindcss-plain colored", name: "TailwindCSS", languageLink: "https://tailwindcss.com/" },
        { icon: "https://osv.dev/static/img/favicon-32x32.png", name: "OSV.dev", languageLink: "https://osv.dev/" },
        { icon: "devicon-vitest-plain colored", name: "Vitest", languageLink: "https://vitest.dev/" },
      ],
      collaborators: [
        { name: "Savar Shrestha", image: "/collaborators/savars.jpg", profileLink: "https://www.linkedin.com/in/savar-shrestha/" },
        { name: "Conner Brunner", image: "/collaborators/connerb.jpg", profileLink: "https://www.linkedin.com/in/conner-brunner/" },
      ],
    },
    {
      name: "ToolSmith",
      status: "Active",
      summary: "A suite of professional tools built with Svelte & WASM, hosted on Vercel. Uses the Typst typesetting system to generate beautiful, custom documents with a simple interface. Some tooling backed by OpenAI's API platform, allowing for uploading of documents to fill in data.",
      linkPreview: "https://toolsmith.online/",
      linkSource: "/",
      linkWriteup: "/",
      image: "/toolsmith.webp",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "Svelte", languageLink: "https://svelte.dev/" },
        { icon: "https://typst.app/favicon.ico", name: "Typst", languageLink: "https://typst.app/" },
        { icon: "https://webassembly.org/favicon.ico", name: "WebAssembly", languageLink: "https://webassembly.org/" },
        { icon: "devicon-tailwindcss-plain colored", name: "TailwindCSS", languageLink: "https://tailwindcss.com/" },
        { icon: "https://ui.shadcn.com/favicon.ico", name: "ShadCN", languageLink: "https://ui.shadcn.com/"},
        { icon: "https://github.com/naptha/tesseract.js/raw/master/docs/images/tesseract_dark.png", name: "Tesseract JS", languageLink: "https://tesseract.projectnaptha.com/"},
        {icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg", name: "OpenAI API", languageLink: "https://openai.com/api/"},
      ],
     collaborators: [
        {
          name: "TJ Raklovits",
          image: "/collaborators/tjk.jpeg",
          profileLink: "https://monster0506.dev/",
        },
     ],
    },
    {
      name: "Python INFOSEC",
      status: "Active",
      openSource: true,
      summary: "A collection of python scripts for various information security and reconnaissance tasks.",
      hacker: {
        summary: "My personal recon toolkit: a collection of python scripts for scanning, enumeration, and other information security tasks.",
      },
      linkPreview: "/",
      linkSource: "https://github.com/YoyoJesus/python-INFOsec",
      linkWriteup: "/",
      image: "/infosec.png",
      languages: [
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
      ],
    },
    {
      name: "narr0w",
      status: "Prototype",
      openSource: true,
      awards: [
        { label: "2 track wins at NexHacks 2026", href: "https://devpost.com/software/triage-flow", details: "DevSwarm and The Token Company" },
      ],
      summary: "An automated ticketing assignment system for IT and DevOps teams. Built with SvelteKit, FastAPI, n8n, and OpenRouter.",
      linkPreview: "/",
      linkSource: "https://github.com/nexhacks2026/nexhacks-2026",
      linkWriteup: "https://devpost.com/software/triage-flow",
      image: "/narrow.png",
      languages: [
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
        { icon: "devicon-fastapi-plain colored", name: "FastAPI", languageLink: "https://fastapi.tiangolo.com/" },
        { icon: "devicon-svelte-plain colored", name: "SvelteKit", languageLink: "https://svelte.dev/" },
        { icon: "devicon-docker-plain colored", name: "Docker", languageLink: "https://www.docker.com/" },
        { icon : "https://n8n.io/favicon.ico", name: "n8n", languageLink: "https://n8n.io/" },
        { icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/openrouter-icon.png",
          name: "OpenRouter", languageLink: "https://openrouter.ai/"
        },
        { icon: "devicon-digitalocean-plain colored", name: "DigitalOcean", languageLink: "https://www.digitalocean.com/" }
        
      ],
      collaborators: [
        {
          name: "Andrew Roddy",
          image: "/collaborators/andrewr.jpg",
          profileLink: "https://andrewroddy.com/",
        },
        {
          name: "TJ Raklovits",
          image: "/collaborators/tjk.jpeg",
          profileLink: "https://monster0506.dev/",
        },
        {
          name: "Mason Bair",
          image: "/collaborators/masonb.jpg",
          profileLink: "https://www.masonbair.com/",
        },
      ],
    },
    {
      name: "MediTrack",
      status: "Prototype",
      openSource: true,
      summary: "A website for booking doctor appointments and tracking diagnoses, with workflows for doctors, billing, and insurance. Built with Flask and MySQL.",
      linkPreview: "/",
      linkSource: "https://github.com/EnderHubris/MediTrack",
      linkWriteup: "https://blog.yoyojesus.xyz/blog/meditrack",
      image: "/meditrack.png",
      languages: [
        { icon: "devicon-flask-original colored", name: "Flask", languageLink: "https://flask.palletsprojects.com/" },
        { icon: "devicon-mysql-plain colored", name: "MySQL", languageLink: "https://www.mysql.com/" },
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
      ],
      collaborators: [
        {
          name: "Noah Al-lahabi",
          image: "/collaborators/noaha.jpg",
          profileLink: "https://enderhubris.github.io/my_happy_site/",
        },
        {
          name: "Ian Rohrbacher",
          image: "/collaborators/ianr.jpg",
          profileLink: "http://rohrbacher.cc/",
        },
        {
          name: "Paige Ogden",
          image: "/collaborators/paigeo.jpg",
          profileLink: "https://www.linkedin.com/in/paige-ogden-57b254289/",
        },
      ],
    },
    {
      name: "Ripple Chat",
      status: "Prototype",
      openSource: true,
      summary: "A real-time chat, voice, and video application using websockets and peer-to-peer connections. Built with React, Node.js, and WebRTC.",
      linkPreview: "/",
      linkSource: "https://github.com/arizotaz/discord_clone",
      linkWriteup: "https://blog.yoyojesus.xyz/blog/ripple-chat",
      image: "/ripple-chat.png",
      languages: [
        { icon: "devicon-react-original colored", name: "React", languageLink: "https://react.dev/" },
        { icon: "devicon-nodejs-plain colored", name: "Node.js", languageLink: "https://nodejs.org/" },
        { icon: "https://webrtc.github.io/webrtc-org/assets/images/webrtc-logo-vert-retro-dist.svg", 
          name: "WebRTC", languageLink: "https://webrtc.org/" },
        { icon: "devicon-mongodb-plain colored", name: "MongoDB", languageLink: "https://www.mongodb.com/" },
      ],
      collaborators: [
        {
          name: "Colton Staiduhar",
          image: "/collaborators/coltons.jpg",
          profileLink: "https://colton.staiduhar.com/",
        },
        {
          name: "Noah Al-lahabi",
          image: "/collaborators/noaha.jpg",
          profileLink: "https://enderhubris.github.io/my_happy_site/",
        },
        {
          name: "Ian Rohrbacher",
          image: "/collaborators/ianr.jpg",
          profileLink: "http://rohrbacher.cc/",
        },
        {
          name: "Paige Ogden",
          image: "/collaborators/paigeo.jpg",
          profileLink: "https://www.linkedin.com/in/paige-ogden-57b254289/",
        },
      ],
    },
    {
      name: "TYPO",
      status: "Archived",
      summary: "A Simon Says-style memory game with solo challenges, leaderboards, and head-to-head multiplayer. Built with Python and pygame, with browser support through pygbag. No longer maintained; the hosted game is unavailable.",
      linkSource: "https://github.com/Typ0-SWE-Spring26/Typ0",
      image: "/typo.webp",
      languages: [
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
        { icon: "devicon-python-plain colored", name: "pygame", languageLink: "https://www.pygame.org/" },
        { icon: "devicon-typescript-plain colored", name: "TypeScript", languageLink: "https://www.typescriptlang.org/" },
        { icon: "https://webassembly.org/favicon.ico", name: "pygbag", languageLink: "https://github.com/pygame-web/pygbag" },
      ],
      collaborators: [
        { name: "Benjamin Purdum", image: "/collaborators/benp.jpg", profileLink: "https://benpurdum.github.io/portfolio/" },
        { name: "Dipen Thapa", image: "/collaborators/dipent.jpg", profileLink: "https://www.linkedin.com/in/dipen-thapa-7189042a4/" },
        { name: "Charlie Burrows", image: "/collaborators/charlieb.jpg", profileLink: "https://www.linkedin.com/in/charlie-burrows-043414402/" },
        { name: "Jude Skrzat", image: "/collaborators/judes.jpg", profileLink: "https://judeswebsite.netlify.app/" },
      ],
    },
    {
      name: "SCI Smart Badge",
      status: "Active",
      awards: [
        { label: "Best Presentation at COF 2026", href: "https://www.linkedin.com/in/austin-sternberg/overlay/1776200058946/single-media-viewer/?profileId=ACoAADborj0BvR99J5O7JokjCnzGMc21g64HgfY&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_projects_details%3B9%2BLM1ZWBQuKI90dkCQmo4Q%3D%3D", details: "Choose Ohio First Research Symposium" },
      ],
      summary: "An IOT badge that collects decibel levels and motion data to monitor engagement in small group settings. Built using an Arduino Sense board and integrated with a set of python scripts for data analysis.",
      linkPreview: "/",
      linkSource: "https://github.com/YoyoJesus/SCI-Lab-BadgeSoftware",
      linkWriteup: "/",
      image: "/bage.jpg",
      languages: [
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
        { icon: "devicon-arduino-plain colored", name: "Arduino", languageLink: "https://www.arduino.cc/" },
        { icon: "devicon-c-plain colored", name: "C/C++", languageLink: "https://isocpp.org/" },
      ],
      collaborators: [
        {
          name: "Bishop Kliskey",
          image: "/collaborators/bishopk.jpg",
          profileLink: "https://www.linkedin.com/in/bishop-kliskey-0074251b1/",
        }
      ],
    },
    {
      name: "KSU Combat Robotics Website",
      status: "Active",
      summary: "Kent State's Combat Robotics club website, with event registration, team updates, and club information. Built with SvelteKit, PostgreSQL, and Drizzle, and hosted on Vercel.",
      linkPreview: "https://ksucombat.club",
      linkSource: "https://github.com/CombatRoboticsKSU/KSU-Combat-Robotics-Website",
      linkWriteup: "/",
      image: "/ksucombat.webp",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "SvelteKit", languageLink: "https://svelte.dev/" },
        { icon: "devicon-typescript-plain colored", name: "TypeScript", languageLink: "https://www.typescriptlang.org/" },
        { icon: "devicon-postgresql-plain colored", name: "PostgreSQL", languageLink: "https://www.postgresql.org/" },
        { icon: "https://orm.drizzle.team/favicon.ico", name: "Drizzle", languageLink: "https://orm.drizzle.team/" },
      ],
      collaborators: [
        {
          name: "Noah Al-lahabi",
          image: "/collaborators/noaha.jpg",
          profileLink: "https://enderhubris.github.io/my_happy_site/",
        },
        {
          name: "Ian Rohrbacher",
          image: "/collaborators/ianr.jpg",
          profileLink: "http://rohrbacher.cc/",
        },
        {
          name: "Conner Brunner",
          image: "/collaborators/connerb.jpg",
          profileLink: "https://www.linkedin.com/in/conner-brunner/",
        },
      ],
    },
    {
      name: "Kent Hack It",
      status: "Active",
      summary: "The competition platform and challenges for Kent Hack It, HacKSU's annual CTF event. Built with SvelteKit, PostgreSQL, and Drizzle, with challenges spanning a variety of technologies.",
      hacker: {
        summary: "HacKSU's annual capture-the-flag. The scoring platform is built with SvelteKit and PostgreSQL, and the challenges span web, crypto, forensics, and reversing, each one built to be broken.",
      },
      linkPreview: "https://ctf.hacksu.com",
      linkSource: "https://github.com/hacksu/kent-hack-it",
      linkWriteup: "/",
      image: "/khi.webp",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "SvelteKit", languageLink: "https://svelte.dev/" },
        { icon: "devicon-typescript-plain colored", name: "TypeScript", languageLink: "https://www.typescriptlang.org/" },
        { icon: "devicon-postgresql-plain colored", name: "PostgreSQL", languageLink: "https://www.postgresql.org/" },
        { icon: "https://orm.drizzle.team/favicon.ico", name: "Drizzle", languageLink: "https://orm.drizzle.team/" },
        { icon: "devicon-tailwindcss-plain colored", name: "Tailwind CSS", languageLink: "https://tailwindcss.com/" },
      ],
      collaborators: [
        {
          name: "Noah Al-lahabi",
          image: "/collaborators/noaha.jpg",
          profileLink: "https://enderhubris.github.io/my_happy_site/",
        },
        {
          name: "Ian Rohrbacher",
          image: "/collaborators/ianr.jpg",
          profileLink: "http://rohrbacher.cc/",
        },
        {
          name: "TJ Raklovits",
          image: "/collaborators/tjk.jpeg",
          profileLink: "https://monster0506.dev/",
        },
      ],
    },
    {
      name: "Linktree Replacement",
      status: "Active",
      openSource: true,
      summary: "A personal Linktree-style website built with Svelte, Vite, and Tailwind CSS, hosted on Vercel. Fully customizable and open source.",
      linkPreview: "https://yoyojesus.xyz",
      linkSource: "https://github.com/YoyoJesus/linktree-replacement",
      linkWriteup: "/",
      image: "/linktree-clone.webp",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "Svelte", languageLink: "https://svelte.dev/" },
        { icon: "devicon-tailwindcss-plain colored", name: "TailwindCSS", languageLink: "https://tailwindcss.com/" },
      ],
    },
    {
      name: "Sitch Replacement",
      status: "Active",
      openSource: true,
      summary: "A custom profile page for my RFID business card, replacing Sitch's limited page builder. Built with SvelteKit and TypeScript, and hosted on Vercel.",
      linkPreview: "https://sitch.yoyojesus.xyz",
      linkSource: "https://github.com/YoyoJesus/sitch-replacement",
      linkWriteup: "/",
      image: "/sitch-clone.webp",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "SvelteKit", languageLink: "https://svelte.dev/" },
        { icon: "devicon-typescript-plain colored", name: "TypeScript", languageLink: "https://www.typescriptlang.org/" },
      ],
    },
  ],
  about: {
    description: `
      Hi, I'm Austin Sternberg 👋. I'm a Computer Science senior at Kent State with a passion for cybersecurity and networking.

      This past summer I interned at Awetomaton, a small but growing defense contractor based in Beavercreek, Ohio, where I built internal tools for the IT department to help streamline operations.

      On campus, I serve as President of HacKSU, Kent State's computer science club, and as President of Kent State's Combat Robotics club.

      Outside of class, I spend my time on personal projects, hackathons, and CTFs. Recently I placed first at Hack Dearborn 4 and the Quantum CTF at BSidesCLE 2026, and won two tracks at NexHacks 2026. The python INFOSEC repository is still a personal favorite of mine.

      I'm always working on something or learning new skills. Feel free to reach out if you'd like to connect!
    `,
    image: "/austin-big.JPG",
  },
  // Security work first, then networking/protocols, hardware, and apps handling sensitive data; plain web builds last.
  hackerProjectOrder: [
    "Kent Hack It",
    "Dependency Domino",
    "Python INFOSEC",
    "BluQ",
    "Ripple Chat",
    "MediTrack",
    "TYPO",
    "SCI Smart Badge",
    "Holotrace",
    "narr0w",
    "Sitch Replacement",
    "ToolSmith",
    "KSU Combat Robotics Website",
    "Linktree Replacement",
  ],
  workspace: {
    image: "/workspace.jpg",
    imageAlt: "My desk: a laptop and Samsung monitor with a mechanical keyboard, mic, and mouse on a circuit-board desk mat",
    // `pin` is percent from the photo's top-left and places a numbered marker.
    gear: [
      { name: "Laptop", detail: "Dell Inspiron 16 Plus, 32GB DDR5 RAM, RTX 3060 Laptop GPU, Intel Core i7-1700H", pin: { x: 69, y: 50 } },
      { name: "Monitor", detail: "Samsung, 27-inch", pin: { x: 27, y: 37 } },
      { name: "Keyboard", detail: "Redragon K707 PRO", pin: { x: 62, y: 60 } },
      { name: "Mouse", detail: "Logitech G305", pin: { x: 87, y: 62 } },
      { name: "Microphone", detail: "HyperX Solocast", pin: { x: 51, y: 46 } },
      {
        name: "Speakers",
        detail: "Anker, Soundcore 2",
        pin: [
          { x: 27, y: 60 },
          { x: 84, y: 14 },
        ],
      },
      { name: "USB-C hub/dock", detail: "Anker", pin: { x: 41, y: 57 } },
      { name: "Desk mat", detail: "Circuit-board print", pin: { x: 33, y: 66 } },
    ],
    groups: [
      {
        title: "Editor & Tools",
        items: [
          { name: "VS Code", icon: "devicon-vscode-plain colored", href: "https://code.visualstudio.com/" },
          { name: "T3 Code", icon: "https://t3.codes/favicon.ico", href: "https://t3.codes/" },
          { name: "Git", icon: "devicon-git-plain colored", href: "https://git-scm.com/" },
          { name: "GitHub Desktop", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github-light.svg", href: "https://desktop.github.com/" },
          { name: "Docker Desktop", icon: "devicon-docker-plain colored", href: "https://www.docker.com/products/docker-desktop/" },
          { name: "Podman", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/podman.svg", href: "https://podman.io/" },
          { name: "PGAdmin", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/pgadmin.svg", href: "https://www.pgadmin.org/" },
          { name: "Postman", icon: "devicon-postman-plain colored", href: "https://www.postman.com/" },
        ],
      },
      {
        title: "Go-To Stack",
        items: [
          { name: "SvelteKit", icon: "devicon-svelte-plain colored", href: "https://svelte.dev/" },
          { name: "TypeScript", icon: "devicon-typescript-plain colored", href: "https://www.typescriptlang.org/" },
          { name: "TailwindCSS", icon: "devicon-tailwindcss-plain colored", href: "https://tailwindcss.com/" },
          { name: "ShadCN", icon: "https://ui.shadcn.com/favicon.ico", href: "https://ui.shadcn.com/" },
          { name: "Drizzle", icon: "https://orm.drizzle.team/favicon.ico", href: "https://orm.drizzle.team/" },
          { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", href: "https://www.postgresql.org/" },
          { name: "Flask", icon: "devicon-flask-original colored", href: "https://flask.palletsprojects.com/" },
          { name: "Playwright", icon: "devicon-playwright-plain colored", href: "https://playwright.dev/" },
          { name: "Typst", icon: "https://typst.app/favicon.ico", href: "https://typst.app/", trying: true },
          { name: "OpenAI API", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai-light.svg", href: "https://openai.com/api/", trying: true },
          { name: "Astro", icon: "devicon-astro-plain colored", href: "https://astro.build/", trying: true },
        ],
      },
      {
        title: "Everyday",
        items: [
          { name: "Zen Browser", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/zen-browser.svg", href: "https://zen-browser.app/" },
          { name: "Floorp Browser", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/floorp.svg", href: "https://floorp.dev/" },
          { name: "Spotify", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/spotify.svg", href: "https://open.spotify.com/" },
          { name: "Obsidian", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/obsidian.svg", href: "https://obsidian.md/" },
          { name: "Discord", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/discord.svg", href: "https://discord.com/" },
        ],
      },
    ],
  },
  hackerWorkspace: {
    image: "/workspace.jpg",
    imageAlt: "My hacking setup",
    gear: [
      { name: "Laptop", detail: "Dell Inspiron 16 Plus, 32GB DDR5 RAM, RTX 3060 Laptop GPU, Intel Core i7-1700H", pin: { x: 69, y: 50 } },
      { name: "Mouse", detail: "Logitech G305", pin: { x: 87, y: 62 } },
      { name: "Keyboard", detail: "Redragon K707 PRO", pin: { x: 62, y: 60 } },
      { name: "Monitor", detail: "Samsung, 27-inch", pin: { x: 27, y: 37 } },
      { name: "Microphone", detail: "HyperX Solocast", pin: { x: 51, y: 46 } },
      {
        name: "Speakers",
        detail: "Anker, Soundcore 2",
        pin: [
          { x: 27, y: 60 },
          { x: 84, y: 14 },
        ],
      },
      { name: "USB-C hub/dock", detail: "Anker", pin: { x: 41, y: 57 } },
      { name: "Attack box", detail: "Kali / Parrot VM" },
    ],
    groups: [
      {
        title: "Recon & Network",
        items: [
          { name: "nmap", icon: "https://nmap.org/favicon.ico", href: "https://nmap.org/" },
          { name: "Wireshark", icon: "devicon-wireshark-plain colored", href: "https://www.wireshark.org/" },
          { name: "Angry IP Scanner", icon: "https://angryip.org/favicon.ico", href: "https://angryip.org/" },
          { name: "Scapy", icon: "devicon-python-plain colored", href: "https://scapy.net/" },
        ],
      },
      {
        title: "Web & Cracking",
        items: [
          { name: "Burp Suite", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/burpsuite.svg", href: "https://portswigger.net/burp" },
          { name: "Hashcat", icon: "https://hashcat.net/favicon.ico", href: "https://hashcat.net/hashcat/" },
          { name: "John the Ripper", icon: "https://www.openwall.com/favicon.ico", href: "https://www.openwall.com/john/" },
          { name: "CyberChef", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/cyberchef.svg", href: "https://gchq.github.io/CyberChef/" },
        ],
      },
      {
        title: "Exploitation",
        items: [
          { name: "pwntools", icon: "devicon-python-plain colored", href: "https://github.com/Gallopsled/pwntools" },
          { name: "Python", icon: "devicon-python-plain colored", href: "https://www.python.org/" },
          { name: "Bash", icon: "devicon-bash-plain", href: "https://www.gnu.org/software/bash/" },
        ],
      },
      {
        title: "Ops & Privacy",
        items: [
          { name: "Proton VPN", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/proton-vpn.svg", href: "https://protonvpn.com/" },
          { name: "Docker", icon: "devicon-docker-plain colored", href: "https://www.docker.com/" },
        ],
      },
    ],
  },
  hackerAbout: {
    description: `
      Hello, friend. Online I go by yoyojesus.

      I got into security because every system has an edge case someone forgot about, and finding it is the best kind of puzzle. Networks, web apps, and CTF challenges are where I spend most of that curiosity.

      Most of my free time goes to capture-the-flag competitions and to writing my own tooling for recon and automation. The python INFOSEC repository is a personal favorite.

      If you're building something and want a second pair of eyes on how it might break, feel free to reach out.
    `,
  },
};

// #5755ff
