export interface CommunityImage {
  id: string;
  url: string;
  alt: string;
  category: 'event' | 'community' | 'workshop' | 'buildathon';
}

// Real Generator photos only - no placeholders
export const communityImages: CommunityImage[] = [
  {
    id: '3',
    url: '/images/events/generator-event-1.jpg',
    alt: 'Students collaborating at Generator event',
    category: 'event'
  },
  {
    id: '4',
    url: '/images/events/generator-event-2.jpg',
    alt: 'Team working at The Generator',
    category: 'event'
  },
  {
    id: '5',
    url: '/images/events/generator-event-3.jpg',
    alt: 'Networking event at The Generator',
    category: 'event'
  },
  {
    id: '6',
    url: '/images/events/generator-event-4.jpg',
    alt: 'Speaker presenting at Generator',
    category: 'event'
  },
  {
    id: '7',
    url: '/images/misc/buildathon-1.jpg',
    alt: 'Buildathon participants collaborating',
    category: 'buildathon'
  },
  {
    id: '8',
    url: '/images/misc/buildathon-2.jpg',
    alt: 'Teams working at Buildathon',
    category: 'buildathon'
  },
  {
    id: '9',
    url: '/images/misc/workshop-1.jpg',
    alt: 'Workshop session at Generator',
    category: 'workshop'
  },
  {
    id: '10',
    url: '/images/misc/workshop-2.jpg',
    alt: 'Hands-on learning at Generator workshop',
    category: 'workshop'
  },
  {
    id: '11',
    url: '/images/community/generator-community-1.jpg',
    alt: 'Generator community collaboration',
    category: 'community'
  },
  // Additional photos from extra-photos directory
  {
    id: '12',
    url: '/images/misc/extra-photos/IMG_5936.JPG',
    alt: 'Generator community event',
    category: 'event'
  },
  {
    id: '13',
    url: '/images/misc/extra-photos/IMG_5938.JPG',
    alt: 'Students networking at Generator',
    category: 'event'
  },
  {
    id: '14',
    url: '/images/misc/extra-photos/IMG_5940.JPG',
    alt: 'Generator workshop in progress',
    category: 'workshop'
  },
  {
    id: '15',
    url: '/images/misc/extra-photos/IMG_5941.JPG',
    alt: 'Team collaboration at Generator',
    category: 'community'
  },
  {
    id: '16',
    url: '/images/misc/extra-photos/IMG_5945.JPG',
    alt: 'Generator presentation session',
    category: 'event'
  },
  {
    id: '17',
    url: '/images/misc/extra-photos/IMG_5946.JPG',
    alt: 'Students at Generator mixer',
    category: 'event'
  },
  {
    id: '18',
    url: '/images/misc/extra-photos/IMG_5947.JPG',
    alt: 'Generator community gathering',
    category: 'community'
  },
  {
    id: '19',
    url: '/images/misc/extra-photos/IMG_5949.JPG',
    alt: 'Innovation workshop at Generator',
    category: 'workshop'
  },
  {
    id: '20',
    url: '/images/misc/extra-photos/IMG_5951.JPG',
    alt: 'Students brainstorming at Generator',
    category: 'event'
  },
  {
    id: '21',
    url: '/images/misc/extra-photos/IMG_5953.JPG',
    alt: 'Generator team meeting',
    category: 'community'
  },
  {
    id: '22',
    url: '/images/misc/extra-photos/IMG_5954.JPG',
    alt: 'Creative session at Generator',
    category: 'workshop'
  },
  {
    id: '23',
    url: '/images/misc/extra-photos/IMG_5956.JPG',
    alt: 'Generator networking event',
    category: 'event'
  },
  {
    id: '24',
    url: '/images/misc/extra-photos/IMG_5957.JPG',
    alt: 'Students collaborating on project',
    category: 'community'
  },
  {
    id: '25',
    url: '/images/misc/extra-photos/IMG_5958.JPG',
    alt: 'Generator workshop presentation',
    category: 'workshop'
  },
  {
    id: '26',
    url: '/images/misc/extra-photos/IMG_5959.JPG',
    alt: 'Community event at Generator',
    category: 'event'
  },
  {
    id: '27',
    url: '/images/misc/extra-photos/IMG_5960.JPG',
    alt: 'Students engaged in discussion',
    category: 'community'
  },
  {
    id: '28',
    url: '/images/misc/extra-photos/IMG_7241.jpg',
    alt: 'Generator outdoor event',
    category: 'event'
  },
  {
    id: '29',
    url: '/images/misc/extra-photos/IMG_7260.jpg',
    alt: 'Team building at Generator',
    category: 'community'
  },
  {
    id: '30',
    url: '/images/misc/extra-photos/_Z8A8512.jpg',
    alt: 'Generator professional development',
    category: 'workshop'
  },
  {
    id: '31',
    url: '/images/misc/extra-photos/IMG_4288.JPG',
    alt: 'Students at Generator event',
    category: 'event'
  },
  {
    id: '32',
    url: '/images/misc/extra-photos/IMG_5215.jpg',
    alt: 'Generator community workspace',
    category: 'community'
  },
  {
    id: '33',
    url: '/images/misc/extra-photos/IMG_5463.JPEG',
    alt: 'Innovation session at Generator',
    category: 'workshop'
  },
  {
    id: '34',
    url: '/images/misc/extra-photos/IMG_5464.JPEG',
    alt: 'Generator collaborative space',
    category: 'community'
  },
  {
    id: '35',
    url: '/images/misc/extra-photos/IMG_5771.JPEG',
    alt: 'Students presenting at Generator',
    category: 'event'
  },
  {
    id: '36',
    url: '/images/misc/extra-photos/IMG_5933.JPG',
    alt: 'Generator workshop activities',
    category: 'workshop'
  },
  {
    id: '37',
    url: '/images/misc/extra-photos/generator_redsox.png',
    alt: 'Generator Red Sox event',
    category: 'event'
  },
  {
    id: '38',
    url: '/images/misc/extra-photos/Buildathon-Media-IMG-5946.jpg',
    alt: 'Buildathon team collaboration',
    category: 'buildathon'
  },
  {
    id: '39',
    url: '/images/misc/extra-photos/IMG_5936-2.JPG',
    alt: 'Generator event atmosphere',
    category: 'event'
  },
  {
    id: '40',
    url: '/images/misc/extra-photos/IMG_5936-3.JPG',
    alt: 'Students networking at Generator',
    category: 'community'
  },
  {
    id: '41',
    url: '/images/misc/extra-photos/IMG_5946-2.JPG',
    alt: 'Generator mixer event',
    category: 'event'
  }
];

// Instructions for adding real images:
// 1. Add photos to appropriate folders in public/images/
//    - Community photos: public/images/community/
//    - Event photos: public/images/events/
//    - Logos: public/images/logos/
//    - Other images: public/images/misc/
// 2. Update the communityImages array with proper file paths
// 3. Use format: /images/[category]/filename.jpg
// 4. Ensure images are optimized for web (compressed, proper dimensions)
// 5. Use descriptive filenames with hyphens instead of spaces
// 6. See public/images/README.md for detailed guidelines