export interface CommunityImage {
  id: string;
  url: string;
  alt: string;
  category: 'event' | 'community' | 'workshop' | 'buildathon';
}

// These would be replaced with actual images of Generator events and community
export const communityImages: CommunityImage[] = [
  {
    id: '1',
    url: '/lovable-uploads/0ae39654-597b-4a29-9627-34589cc78afe.png',
    alt: 'The Generator Logo',
    category: 'community'
  },
  {
    id: '2',
    url: '/lovable-uploads/bb1515d1-8646-4719-9d4f-a615463b3467.png',
    alt: 'Generator Event',
    category: 'event'
  },
  // Placeholder images - these would be replaced with actual event photos
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    alt: 'Students collaborating at Builder\'s Day',
    category: 'workshop'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    alt: 'Team working on AI project',
    category: 'buildathon'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop',
    alt: 'Networking event at The Generator',
    category: 'event'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
    alt: 'Speaker presenting at B.R.A.I.N. Talk',
    category: 'event'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    alt: 'Demo Day presentations',
    category: 'event'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
    alt: 'Workshop participants learning AI',
    category: 'workshop'
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    alt: 'Startup pitch session',
    category: 'event'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop',
    alt: 'Brainstorming session at Generator',
    category: 'workshop'
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
    alt: 'Team collaboration space',
    category: 'community'
  }
];

// Instructions for adding real images:
// 1. Add event/community photos to public/lovable-uploads folder
// 2. Update the communityImages array with proper file paths
// 3. Use format: /lovable-uploads/filename.jpg
// 4. Ensure images are optimized for web (compressed, proper dimensions)