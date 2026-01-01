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
  canonicalURL: "https://astro-zen.vercel.app",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Austin Sternberg",
    specialty: "Computer Science Student",
    summary:
      "Student at Kent State University specializing in cybersecurity and network administration. Event Coordinator for HacKSU, Kent State's premier hacking club.",
    email: "austinsternberg45@gmail.com",
  },
  experience: [
    {
      company: "HacKSU",
      position: "Events Coordinator",
      startDate: "Jan 2025",
      endDate: "Present",
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
      endDate: "Aug 2025",
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
      summary: [
        "Assessed and repaired student devices, primarily chromebooks.",
        "Cleaned and inventoried tech equipment across the district.",
        "Prepared devices for sale or disposal, primarily through the deletion and destruction of data to DOTD standards.",
      ],
    },
  ],
  projects: [
    {
      name: "Spotifu Music",
      summary: "A music streaming app that emulates Spotify's core features.",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/spotifu.png",
    },
    {
      name: "Shopp App",
      summary: "An e-commerce platform that replicates Shopify's key features.",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/shopify-clon.png",
    },
    {
      name: "ClonTagram",
      summary: "A social network that replicates the features of Instagram",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/clone-ig.png",
    },
  ],
  about: {
    description: `
      Hi, I’m Austin Sternberg, a passionate Mobile and Web Developer with a knack for crafting seamless digital experiences. With a strong background in both Android and iOS development, as well as front-end web technologies, I thrive in the intersection where creativity meets technology.

      Over the years, I’ve honed my skills in building robust, user-friendly applications that not only meet the needs of users but also push the boundaries of what’s possible. My projects range from innovative mobile applications to responsive web designs, all with a focus on performance, security, and scalability.
    `,
    image: "/austin-big.JPG",
  },
};

// #5755ff
