export const CATEGORIES = ['All', 'Video Editing', 'Design', 'Writing', 'Marketing', 'Tech'];

export const GIGS = [
  {
    id: '1',
    title: 'Cinematic Video Editor for YouTube & Social Media',
    tagline: 'I will edit your videos into cinematic masterpieces with advanced color grading and sound design.',
    category: 'Video Editing',
    price: 150,
    thumbnail: 'https://picsum.photos/seed/vid1/800/600',
    trending: true,
    creator: {
      id: 'c1',
      name: 'Alex Chen',
      avatar: 'https://picsum.photos/seed/alex/150/150',
      tagline: 'Visual Storyteller & Motion Designer',
      level: 'Top Rated',
      isTopCreator: true,
      phone: '+15550100123',
      verified: true,
      socials: {
        instagram: 'https://instagram.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
        twitter: 'https://twitter.com/alexchen'
      },
      academics: {
        branch: 'B.Tech Computer Science',
        semester: '6th Semester',
        cgpa: 8.9,
        subjects: ['Computer Graphics', 'HCI', 'Machine Learning']
      },
      stats: {
        streak: 14,
        points: 2450,
        projectsCompleted: 32,
        endorsements: 45
      },
      badges: [
        { icon: '🏆', name: 'Top Rated Seller' },
        { icon: '🔥', name: '14-Day Streak' },
        { icon: '⭐', name: '5-Star Club' }
      ],
      achievements: [
        { title: '1st Place - National Hackathon', issuer: 'TechFest 2023', date: 'Oct 2023' },
        { title: 'Advanced Motion Graphics Cert', issuer: 'Motion Design School', date: 'Jan 2024' }
      ],
      portfolio: [
        { id: 'p1', title: 'Cyberpunk Short Film', type: 'Video', image: 'https://picsum.photos/seed/port1/400/300' },
        { id: 'p2', title: 'Tech Startup Promo', type: 'Motion Graphics', image: 'https://picsum.photos/seed/port2/400/300' },
        { id: 'p3', title: 'Music Video VFX', type: 'VFX', image: 'https://picsum.photos/seed/port3/400/300' }
      ],
      learningInterests: ['Unreal Engine 5', 'Generative AI for Video', '3D Animation'],
      goals: [
        { title: 'Master Unreal Engine', progress: 65 },
        { title: 'Complete 50 Freelance Projects', progress: 64 },
        { title: 'Maintain 9.0+ CGPA', progress: 90 }
      ]
    },
    tags: ['Premiere Pro', 'Color Grading', 'VFX'],
    rating: 4.9,
    reviews: 124,
    reviewsList: [
      { id: 'r1', user: 'Sarah M.', rating: 5, comment: 'Alex completely transformed my vlog. The color grading was cinematic and the pacing was perfect!', date: '1 week ago' },
      { id: 'r2', user: 'David K.', rating: 5, comment: 'Incredible attention to detail. Delivered ahead of schedule.', date: '3 weeks ago' }
    ]
  },
  {
    id: '2',
    title: 'Modern UI/UX Design for Web & Mobile Apps',
    tagline: 'Clean, user-centric, and modern interface designs that convert.',
    category: 'Design',
    price: 200,
    thumbnail: 'https://picsum.photos/seed/ui1/800/600',
    trending: true,
    creator: {
      id: 'c2',
      name: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/seed/sarah/150/150',
      tagline: 'Product Designer',
      level: 'Level 2',
      isTopCreator: false,
      phone: '+15550100456',
      verified: true,
      socials: {
        instagram: 'https://instagram.com/sarahdesigns',
        linkedin: 'https://linkedin.com/in/sarahjenkins',
        twitter: 'https://twitter.com/sarahux'
      },
      academics: {
        branch: 'B.Des Interaction Design',
        semester: '8th Semester',
        cgpa: 9.2,
        subjects: ['User Research', 'Prototyping', 'Design Systems']
      },
      stats: { streak: 5, points: 1200, projectsCompleted: 18, endorsements: 22 },
      badges: [{ icon: '🎨', name: 'Design Wizard' }],
      achievements: [{ title: 'Best UI Award', issuer: 'Designathon', date: 'Nov 2023' }],
      portfolio: [
        { id: 'p4', title: 'Fintech App Redesign', type: 'UI/UX', image: 'https://picsum.photos/seed/port4/400/300' },
        { id: 'p5', title: 'E-commerce Dashboard', type: 'Web Design', image: 'https://picsum.photos/seed/port5/400/300' }
      ],
      learningInterests: ['Framer', 'Spatial Design', 'Accessibility'],
      goals: [{ title: 'Learn Framer Motion', progress: 40 }]
    },
    tags: ['Figma', 'Prototyping', 'UI/UX'],
    rating: 4.8,
    reviews: 89,
    reviewsList: [
      { id: 'r3', user: 'TechFlow Inc.', rating: 5, comment: 'Sarah understood our vision immediately. The Figma files were incredibly organized.', date: '2 days ago' }
    ]
  },
  {
    id: '3',
    title: 'Full Stack React & Node.js Development',
    tagline: 'I will build a scalable, performant web application from scratch.',
    category: 'Tech',
    price: 350,
    thumbnail: 'https://picsum.photos/seed/code1/800/600',
    trending: false,
    creator: {
      id: 'c3',
      name: 'David Kim',
      avatar: 'https://picsum.photos/seed/david/150/150',
      tagline: 'Software Engineer',
      level: 'Top Rated',
      isTopCreator: true,
      phone: '+15550100789',
      verified: true,
      socials: {
        linkedin: 'https://linkedin.com/in/davidkimdev',
        twitter: 'https://twitter.com/davidkimcode'
      },
      academics: {
        branch: 'B.Tech Information Technology',
        semester: '7th Semester',
        cgpa: 8.5,
        subjects: ['Web Technologies', 'Database Systems', 'Cloud Computing']
      },
      stats: { streak: 21, points: 3500, projectsCompleted: 45, endorsements: 80 },
      badges: [{ icon: '💻', name: 'Code Ninja' }, { icon: '🚀', name: 'Fast Deliverer' }],
      achievements: [{ title: 'AWS Certified Developer', issuer: 'Amazon', date: 'Aug 2023' }],
      portfolio: [
        { id: 'p6', title: 'SaaS Platform', type: 'Full Stack', image: 'https://picsum.photos/seed/port6/400/300' }
      ],
      learningInterests: ['Web3', 'GraphQL', 'System Design'],
      goals: [{ title: 'Contribute to Open Source', progress: 80 }]
    },
    tags: ['React', 'Node.js', 'TypeScript'],
    rating: 5.0,
    reviews: 210,
    reviewsList: [
      { id: 'r4', user: 'StartupFounder', rating: 5, comment: 'Flawless execution. The code is clean and the app is blazing fast.', date: '1 month ago' }
    ]
  },
  {
    id: '4',
    title: 'SEO Optimized Tech Blog Writing',
    tagline: 'Engaging, technically accurate, and SEO-friendly articles for your tech blog.',
    category: 'Writing',
    price: 45,
    thumbnail: 'https://picsum.photos/seed/write1/800/600',
    trending: false,
    creator: {
      id: 'c4',
      name: 'Emily Watson',
      avatar: 'https://picsum.photos/seed/emily/150/150',
      tagline: 'Technical Writer',
      level: 'Level 1',
      isTopCreator: false,
      phone: '+15550100321',
      verified: false,
      socials: {
        linkedin: 'https://linkedin.com/in/emilywatsonwriter',
        twitter: 'https://twitter.com/emilywrites'
      },
      academics: {
        branch: 'B.A. English Literature',
        semester: '4th Semester',
        cgpa: 8.8,
        subjects: ['Creative Writing', 'Digital Media', 'Linguistics']
      },
      stats: { streak: 2, points: 450, projectsCompleted: 12, endorsements: 15 },
      badges: [{ icon: '✍️', name: 'Wordsmith' }],
      achievements: [],
      portfolio: [],
      learningInterests: ['Technical SEO', 'Content Strategy'],
      goals: [{ title: 'Publish 100 Articles', progress: 12 }]
    },
    tags: ['SEO', 'Copywriting', 'Tech'],
    rating: 4.7,
    reviews: 42,
    reviewsList: [
      { id: 'r5', user: 'DevBlog', rating: 4, comment: 'Great article, required very few edits. Will hire again.', date: '2 weeks ago' }
    ]
  },
  {
    id: '5',
    title: 'Social Media Marketing Strategy & Management',
    tagline: 'Grow your audience with data-driven social media strategies.',
    category: 'Marketing',
    price: 120,
    thumbnail: 'https://picsum.photos/seed/market1/800/600',
    trending: true,
    creator: {
      id: 'c5',
      name: 'Marcus Johnson',
      avatar: 'https://picsum.photos/seed/marcus/150/150',
      tagline: 'Growth Hacker',
      level: 'Level 2',
      isTopCreator: true,
      phone: '+15550100654',
      verified: true,
      socials: {
        instagram: 'https://instagram.com/marcusgrowth',
        linkedin: 'https://linkedin.com/in/marcusjohnson',
        twitter: 'https://twitter.com/marcusj'
      },
      academics: {
        branch: 'BBA Marketing',
        semester: '6th Semester',
        cgpa: 8.2,
        subjects: ['Digital Marketing', 'Consumer Behavior', 'Analytics']
      },
      stats: { streak: 8, points: 1800, projectsCompleted: 25, endorsements: 34 },
      badges: [{ icon: '📈', name: 'Growth Master' }],
      achievements: [{ title: 'HubSpot Inbound Certified', issuer: 'HubSpot', date: 'Feb 2024' }],
      portfolio: [],
      learningInterests: ['Performance Marketing', 'Data Analytics'],
      goals: [{ title: 'Manage $10k Ad Spend', progress: 50 }]
    },
    tags: ['Instagram', 'TikTok', 'Strategy'],
    rating: 4.9,
    reviews: 156,
    reviewsList: [
      { id: 'r6', user: 'LocalCafe', rating: 5, comment: 'Our engagement went up 300% in just one month. Marcus knows his stuff.', date: '5 days ago' }
    ]
  },
  {
    id: '6',
    title: 'Custom 3D Animations & Modeling',
    tagline: 'High-quality 3D models and animations for games and product showcases.',
    category: 'Design',
    price: 280,
    thumbnail: 'https://picsum.photos/seed/3d1/800/600',
    trending: false,
    creator: {
      id: 'c6',
      name: 'Leo Martinez',
      avatar: 'https://picsum.photos/seed/leo/150/150',
      tagline: '3D Artist',
      level: 'Top Rated',
      isTopCreator: false,
      phone: '+15550100987',
      verified: true,
      socials: {
        instagram: 'https://instagram.com/leo3d',
        linkedin: 'https://linkedin.com/in/leomartinez3d'
      },
      academics: {
        branch: 'B.F.A Animation',
        semester: '8th Semester',
        cgpa: 9.5,
        subjects: ['3D Modeling', 'Character Rigging', 'Lighting']
      },
      stats: { streak: 12, points: 2100, projectsCompleted: 28, endorsements: 50 },
      badges: [{ icon: '🧊', name: '3D Virtuoso' }],
      achievements: [{ title: 'Best 3D Short', issuer: 'AnimFest', date: 'Dec 2023' }],
      portfolio: [
        { id: 'p7', title: 'Sci-Fi Character Model', type: '3D Modeling', image: 'https://picsum.photos/seed/port7/400/300' }
      ],
      learningInterests: ['ZBrush', 'Procedural Generation'],
      goals: [{ title: 'Create Indie Game Asset Pack', progress: 20 }]
    },
    tags: ['Blender', 'Animation', 'Modeling'],
    rating: 5.0,
    reviews: 78,
    reviewsList: [
      { id: 'r7', user: 'IndieDev', rating: 5, comment: 'The character models were exactly what we needed for our game. Perfect topology.', date: '1 week ago' }
    ]
  }
];
