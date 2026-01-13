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
      "Student at Kent State University specializing in cybersecurity and network administration. Event Coordinator for HacKSU, Kent State's premier computer science club.",
    email: "austinsternberg45@gmail.com",
    resume: "https://resume.asternberg.xyz",
    blog: "https://blog.yoyojesus.xyz",
  },
  experience: [
    {
      company: "HacKSU",
      position: "Events Coordinator",
      startDate: "Jan 2025",
      endDate: "Present",
      workType: "Part-Time",
      summary: [
        "Manage the budget, timeline, and marketing effort for four events spread across each academic year.",
        "Delegate tasks including emailing sponsors, picking up items, and advertising outside of Kent State.",
        "Serve as the main point of contact & head of events. Work with University departments to secure funding, locations, and interest.",
        "Coordinate with sponsors to provide prizes, swag, and food for events.",
        "Work directly with Department Heads to ensure events run smoothly, safely, and within University guidelines.",
      ],
    },
    {
      company: "Riverside Local Schools",
      position: "IT Intern",
      startDate: "May 2025",
      endDate: "Present",
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
    },
    {
      name: "MediTrack",
      summary: "A website to allow users to make appointments with doctors and track diagoneses. Doctors can manage appointments and send information to billing. Billing puts in claims and insurance can see them. Build with flask and postgressql",
      linkPreview: "/",
      linkSource: "https://github.com/EnderHubris/MediTrack",
      linkWriteup: "/",
      image: "/meditrack.png",
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
      linkWriteup: "/",
      image: "/ripple-chat.png",
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
      summary: "A basic website to showcase Kent State's Combat Robotics club, built with React and hosted on Vercel. Currently being improved and moved to SvelteKit.",
      linkPreview: "https://ksucombat.club",
      linkSource: "https://github.com/CombatRoboticsKSU/KSU-Combat-Robotics-Website",
      linkWriteup: "/",
      image: "/ksucombat.png",
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
      linkPreview: "/",
      linkSource: "https://github.com/hacksu/kent-hack-it",
      linkWriteup: "/",
      image: "/khi.png",
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
    },
    {
      name: "Sitch Replacement",
      summary: "Sitch is a company that provides smart rfid buisness cards. I like the card, but their website desinger is clunky and limited. So, I built my own version of their website using ElysiaJS and hosted on Vercel.",
      linkPreview: "https://sitch.yoyojesus.xyz",
      linkSource: "https://github.com/YoyoJesus/sitch-replacement",
      linkWriteup: "/",
      image: "/sitch-clone.png",
    },
  ],
  about: {
    description: `
      Hi, I'm Austin Sternberg 👋. I'm a Computer Science student at Kent State and am passionate for cybersecurity and networking. I've been working with computers since I was a kid, loving to tinker with hardware and software. I currently work two part-time/seasonal jobs between Riverside Local Schools, where I serve as an IT Intern, and HacKSU, where I am the Events Coordinator.

      In my free time, I've been working on a handful of personal project, mostly revolving around web development, though the python INFOSEC repository is a personal favorite of mine. Outside of CS, I enjoy combat robotics, where I am currently serving as the President of Kent State's Combat Robotics club.

      I'm always working on something or learning new skills. Feel free to reach out if you'd like to connect!
    `,
    image: "/austin-big.JPG",
  },
};

// #5755ff
