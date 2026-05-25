import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Austin Sternberg — Computer Science Student",
  author: "Austin Sternberg",
  description:
    "Decicated Computer Science student from Mentor, Ohio. Working twards a penetration testing or network engineering career. Event Coordinator for HacKSU, Kent State's largest CS club.",
  lang: "en",
  siteLogo: "/austin-small.jpg",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Projects", href: "#projects" },
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
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Austin Sternberg",
    specialty: "Computer Science Student",
    summary:
      "Student at Kent State University specializing in cybersecurity and network administration. Intern at Awtomaton, working on internal tools. President for HacKSU, Kent State's premier computer science club. President of Kent State Combat Robotics.",
    email: "austinsternberg45@gmail.com",
    resume: "https://resume.asternberg.xyz",
    blog: "https://blog.yoyojesus.xyz",
  },
  experience: [
    {
      company: "Awetomaton Ltd",
      position: "Information Technology Intern",
      startDate: "May 2026",
      endDate: "Present",
      workType: "Internship",
      summary: [
        "Develop internal tools to help streamline operations and improve efficiency across the company.",
        "Improve previous workflows, implementing strong and more scalable solutions to help the company grow.",
        "Work closely with one of the founders to improve tools and workflows, and learm some of the day-to-day of this small but growing company.",
      ],
    },
    {
      company: "HacKSU",
      position: "President",
      startDate: "August 2025",
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
    },
    {
      company: "KSU Combat Robotics",
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
  projects: [
    {
      name: "BluQ",
      summary: "TCP/IP implemented in Bluetooth to build a simple chat application. Built with python and Angular for user frontend. ",
      linkPreview: "/",
      linkSource: "https://github.com/IanRohrbacher/Dearborn-Hack-2025",
      linkWriteup: "/",
      image: "/bluq.png",
      languages: [
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
        { icon: "devicon-angularjs-plain colored", name: "Angular", languageLink: "https://angular.io/" },
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
      name: "Python INFOSEC",
      summary: "A collection of python scripts for various information security and reconnaissance tasks.",
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
      summary: "An automated ticketing assigment system for IT and DevOps teams. Built with Svelte, FastAPI, n8n, and Open Router.",
      linkPreview: "/",
      linkSource: "https://github.com/nexhacks2026/nexhacks-2026",
      linkWriteup: "https://devpost.com/software/triage-flow",
      image: "/narrow.png",
      languages: [
        { icon: "devicon-python-plain colored", name: "Python", languageLink: "https://www.python.org/" },
        { icon: "devicon-fastapi-plain colored", name: "FastAPI", languageLink: "https://fastapi.tiangolo.com/" },
        { icon: "devicon-svelte-plain colored", name: "Svelte", languageLink: "https://svelte.dev/" },
        { icon: "devicon-docker-plain colored", name: "Docker", languageLink: "https://www.docker.com/" },
        { icon : "https://n8n.io/favicon.ico", name: "n8n", languageLink: "https://n8n.io/" },
        { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/250px-Google_Gemini_icon_2025.svg.png",
          name: "OpenRouter", languageLink: "https://openrouter.ai/"
        },
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
      summary: "A website to allow users to make appointments with doctors and track diagoneses. Doctors can manage appointments and send information to billing. Billing puts in claims and insurance can see them. Build with flask and postgressql",
      linkPreview: "/",
      linkSource: "https://github.com/EnderHubris/MediTrack",
      linkWriteup: "https://blog.yoyojesus.xyz/blog/meditrack",
      image: "/meditrack.png",
      languages: [
        { icon: "devicon-flask-original colored", name: "Flask", languageLink: "https://flask.palletsprojects.com/" },
        { icon: "devicon-postgresql-plain colored", name: "PostgreSQL", languageLink: "https://www.postgresql.org/" },
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
      name: "SCI Smart Badge",
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
      name: "BarkNote",
      summary: "A suite of professional tools built with Svelte & WASM, hosted on Vercel. Uses the Typst typesetting system to generate beautiful, custom documents with a simple interface.",
      linkPreview: "https://barknote.top/",
      linkSource: "/",
      linkWriteup: "/",
      image: "/resume-builder.png",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "Svelte", languageLink: "https://svelte.dev/" },
        { icon: "https://typst.app/favicon.ico", name: "Typst", languageLink: "https://typst.app/" },
        { icon: "https://webassembly.org/favicon.ico", name: "WebAssembly", languageLink: "https://webassembly.org/" },
        { icon: "devicon-tailwindcss-plain colored", name: "TailwindCSS", languageLink: "https://tailwindcss.com/" },
      ],
     collaborators: [],
    },
    {
      name: "KSU Combat Robotics Website",
      summary: "A basic website to showcase Kent State's Combat Robotics club, built with React and hosted on Vercel. Currently being improved and moved to SvelteKit.",
      linkPreview: "https://ksucombat.club",
      linkSource: "https://github.com/CombatRoboticsKSU/KSU-Combat-Robotics-Website",
      linkWriteup: "/",
      image: "/ksucombat.png",
      languages: [
        { icon: "devicon-react-original colored", name: "React", languageLink: "https://react.dev/" },
        { icon: "devicon-markdown-plain colored", name: "Markdown", languageLink: "https://www.markdownguide.org/" },
        { icon: "devicon-bootstrap-plain colored", name: "Bootstrap", languageLink: "https://getbootstrap.com/" },
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
          profileLink: "https://github.com/ManOfNeptune27",
        },
      ],
    },
    {
      name: "Kent Hack It",
      summary: "Website and Challenges for Kent Hack It, HacKSU's annual CTF event. Built with React & MongoDB. Challenges written using a variety of technologies.",
      linkPreview: "https://ctf.hacksu.com",
      linkSource: "https://github.com/hacksu/kent-hack-it",
      linkWriteup: "/",
      image: "/khi.png",
      languages: [
        { icon: "devicon-react-original colored", name: "React", languageLink: "https://react.dev/" },
        { icon: "devicon-mongodb-plain colored", name: "MongoDB", languageLink: "https://www.mongodb.com/" },
        { icon: "devicon-nodejs-plain colored", name: "Node.js", languageLink: "https://nodejs.org/" },
        { icon: "devicon-bootstrap-plain colored", name: "Bootstrap", languageLink: "https://getbootstrap.com/" },
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
      summary: "A personal Linktree-style website built with SvelteKit and hosted on Vercel. Fully customizable and open source.",
      linkPreview: "https://yoyojesus.xyz",
      linkSource: "https://github.com/YoyoJesus/linktree-replacement",
      linkWriteup: "/",
      image: "/linktree-clone.png",
      languages: [
        { icon: "devicon-svelte-plain colored", name: "Svelte", languageLink: "https://svelte.dev/" },
        { icon: "devicon-tailwindcss-plain colored", name: "TailwindCSS", languageLink: "https://tailwindcss.com/" },
      ],
    },
    {
      name: "Sitch Replacement",
      summary: "Sitch is a company that provides smart rfid buisness cards. I like the card, but their website desinger is clunky and limited. So, I built my own version of their website using ElysiaJS and hosted on Vercel.",
      linkPreview: "https://sitch.yoyojesus.xyz",
      linkSource: "https://github.com/YoyoJesus/sitch-replacement",
      linkWriteup: "/",
      image: "/sitch-clone.png",
      languages: [
        { icon: "https://images.seeklogo.com/logo-png/58/2/elysia-logo-png_seeklogo-580325.png",
           name: "ElysiaJS", languageLink: "https://elysiajs.com/" 
        },
        { icon: "devicon-tailwindcss-plain colored", name: "TailwindCSS", languageLink: "https://tailwindcss.com/" },
      ],
    },
  ],
  about: {
    description: `
      Hi, I'm Austin Sternberg 👋. I'm a Computer Science student at Kent State and am passionate for cybersecurity and networking. 

      I am currently an intern at Awetomaton, a small but growing defense contractor based in Beavercreek, Ohio. I work in the IT department, developing internal tools to help streamline operations.
      
      I also currently serve as the President of HacKSU, as well as the President of Kent State's Combat Robotics club.

      In my free time, I've been working on a handful of personal project, mostly revolving around web development, though the python INFOSEC repository is a personal favorite of mine. Outside of CS, I enjoy combat robotics, where I am currently serving as the President of Kent State's Combat Robotics club.

      I'm always working on something or learning new skills. Feel free to reach out if you'd like to connect!
    `,
    image: "/austin-big.JPG",
  },
};

// #5755ff
