// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Shaikh Nabeel',
  role: 'Flutter Developer',
  location: 'Lucknow, India',
  email: 'snabeel130@gmail.com',
  status: 'Shipping at MonkHub',
  socials: [
    { label: 'GitHub', handle: 'Shaikh-Nabeel', href: 'https://github.com/Shaikh-Nabeel' },
    { label: 'LinkedIn', handle: 'in/shaikh-nabs', href: 'https://www.linkedin.com/in/shaikh-nabs' },
    { label: 'X', handle: '@shaikhnabs11', href: 'https://x.com/shaikhnabs11' },
  ],
}

export const nav = [
  { id: 'home', label: 'Home', short: 'Home' },
  { id: 'experience', label: 'Experience', short: 'Work' },
  { id: 'projects', label: 'Projects', short: 'Apps' },
  { id: 'stack', label: 'Stack', short: 'Stack' },
  { id: 'contact', label: 'Contact', short: 'Talk' },
]

// Career as app releases. Groups follow CHANGELOG conventions.
export const releases = [
  {
    version: 'v3.0.0',
    tag: 'latest',
    current: true,
    dates: 'Jan 2025 → now',
    // Drives the live "x yr y mo of Flutter" badge.
    since: '2025-01',
    sinceNote: 'including a 6-month internship',
    title: 'Flutter Developer',
    company: 'MonkHub Innovations',
    scope: 'Android + iOS',
    groups: [
      {
        type: 'Improved',
        items: [
          '<b>50% faster</b> app performance through lazy loading, modular architecture, optimized rendering and efficient state management.',
        ],
      },
      {
        type: 'Added',
        items: [
          'Production-grade Flutter apps for Android and iOS, built on GetX, reusable components and clean architecture.',
          'Offline synchronization, local caching, background services and REST API integrations.',
          'Firebase, push notifications, Branch.io deep linking, Mixpanel analytics and Agora Chat SDK.',
          'Real-time video streaming with optimized media loading for smooth playback.',
        ],
      },
    ],
  },
  // Jan 2023 → Jan 2025: back to school, drawn as a git branch off main.
  {
    branch: 'feat/btech-cse',
    dates: 'Nov 2022 → Jul 2025',
    title: 'B.Tech, Computer Science & Engineering',
    company: 'BBD Northern India Institute of Technology',
    scope: 'Lateral entry · 3-year program',
    checkout: 'git checkout -b feat/btech-cse',
    merge: 'git merge feat/btech-cse  →  v3.0.0',
    items: [
      'Paused releases to go back to school: lateral entry into B.Tech CSE, straight into second year after the IT diploma.',
      'Three years of full-time computer science on top of the hands-on Android work.',
      'Merged back into industry in Jan 2025, this time on Flutter.',
    ],
  },
  {
    version: 'v2.0.0',
    dates: 'Jul 2022 → Jan 2023',
    title: 'Android Developer',
    company: 'MonkHub Innovations',
    scope: 'Native Java',
    groups: [
      {
        type: 'Added',
        items: [
          'Native Android apps in Java, developed and maintained end to end.',
          'Firebase Authentication, Firestore, Cloud Messaging, deep links and in-app purchases.',
        ],
      },
      { type: 'Fixed', items: ['Production issues across live apps while delivering new features.'] },
    ],
  },
  {
    version: 'v1.0.0',
    tag: 'initial',
    dates: 'Nov 2021 → Jul 2022',
    title: 'Android Developer Intern',
    company: 'MonkHub Innovations',
    scope: 'Java + Android SDK',
    groups: [
      {
        type: 'Added',
        items: [
          'First production work: Android development with Java and the Android SDK.',
          'Firebase, REST APIs, debugging and production support.',
          'Client requirements delivered on schedule alongside senior developers.',
        ],
      },
    ],
  },
]

const play = (id) => `https://play.google.com/store/apps/details?id=${id}`

// `icon`: a full image URL (e.g. the Play Store icon), or a PNG dropped into /public/apps/
// referenced as '/apps/propkee.png'. Without one, or if it fails to load, a monogram tile is shown.
// Big cards at the top of Projects, in order. `art` picks the illustration.
export const featured = [
  {
    art: 'shots',
    name: 'Propkee',
    kicker: 'Featured · Real estate',
    href: play('com.app.propkee'),
    icon: '/apps/propkee.png',
    brand: '#C99A5B',
    // Play Store screenshots: [left, centre, right].
    shots: [
      { src: '/apps/propkee-2.webp', alt: 'Property listing card with price, payment plan and contact buttons' },
      { src: '/apps/propkee-3.webp', alt: 'Reels-style property video feed' },
      { src: '/apps/propkee-4.webp', alt: 'Agent profile with property video bites' },
    ],
    hue: 200,
    description:
      'A production-scale Flutter app for property discovery, reels-style media and buyer–seller communication.',
    points: [
      'Instagram-style vertical video feeds with smart caching, autoplay and dynamic aspect-ratio handling.',
      'Agora Chat SDK, Branch.io deep linking, Mixpanel analytics and currency conversion.',
    ],
    stack: ['Flutter', 'GetX', 'Agora Chat', 'Branch.io', 'Mixpanel'],
  },
  {
    art: 'compass',
    name: 'E-Netra',
    kicker: 'Featured · Forest monitoring',
    href: play('com.app.enetra'),
    icon: null,
    hue: 140,
    description:
      'A Flutter forest-monitoring app for the State Forest Department. The backend turns satellite imagery into deforestation and encroachment alerts. The app sends each alert to field rangers, who visit the spot and collect geo-tagged evidence for review.',
    points: [
      'Sensor-fusion direction checking for evidence photos: GPS, compass and accelerometer confirm the camera faces the target site before the shutter unlocks, with smoothed heading, true-north correction, tilt limits and on-screen "turn left / right" guidance within a configurable angle tolerance.',
      'Separate Ranger and DFO flows behind OTP login with reCAPTCHA and JWT sessions. Rangers receive and close alerts; DFOs review them and send officers out. FCM push notifications, in English and Hindi.',
      'Works offline in forests with no signal. Alerts and evidence are stored on the device with Hive, WorkManager uploads them in the background once there is a connection, and geo-fencing makes sure evidence is captured at the actual alert location.',
    ],
    stack: ['Flutter', 'Sensor fusion', 'Platform channels', 'Hive', 'WorkManager', 'Geo-fencing', 'FCM', 'reCAPTCHA', 'JWT', 'EN / हिंदी'],
  },
]

export const projects = [
  {
    name: 'BDE & State Head App',
    kicker: 'Field operations · Flutter',
    href: play('com.apnibus.sales'),
    icon: null,
    hue: 150,
    description:
      'Role-based field management with attendance, lead management and approval workflows. Live GPS tracking, map visualization and media uploads.',
    stack: ['Live GPS', 'Maps', 'Role-based'],
  },
  {
    name: 'TestBot',
    kicker: 'EdTech · Native Android',
    href: play('com.monkhub.testbot'),
    icon: null,
    hue: 30,
    description:
      'A JEE / NEET preparation app in native Android. Implemented the Resume Test feature and fixed production issues before release.',
    stack: ['Java', 'Android SDK'],
  },
]

export const moreApps = [
  { name: 'CCS Survey', note: 'Android', href: play('com.app.enetra_field_survey'), icon: null, hue: 175 },
  { name: 'The Most Ai', note: 'TV app', href: play('themost.tv'), icon: null, hue: 330 },
  { name: 'Tuskin Coffee', note: 'Android', href: play('com.app.tuskincoffee'), icon: null, hue: 25 },
]

export const marquee = [
  'Flutter', 'GetX', 'Clean Architecture', 'Firebase', 'Agora Chat', 'Branch.io deep links',
  'Mixpanel', 'Offline sync', 'Push notifications', 'Java · Kotlin · Dart',
]

export const education = [
  {
    title: 'B.Tech, Computer Science & Engineering (lateral entry)',
    where: 'Babu Banarasi Das Northern India Institute of Technology',
    meta: '2022–2025 · CGPA 7.5',
  },
  { title: 'Diploma, Information Technology', where: 'Government Polytechnic Lucknow', meta: '2019–2022 · 77%' },
]
