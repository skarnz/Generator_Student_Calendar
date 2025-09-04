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