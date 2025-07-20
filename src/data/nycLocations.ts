export interface Location {
  id: string;
  name: string;
  description: string;
  category: string[];
  tags: string[];
  address: string;
  neighborhood: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  featuredImage: string;
  rating: number;
  priceRange: string;
  bestTimeToVisit: string;
  tips: string[];
  createdAt: any;
  updatedAt: any;
}

export const nycLocations: Location[] = [
  // HIDDEN GEMS
  {
    id: 'hidden-gem-1',
    name: 'Roosevelt Island Tram',
    description: 'A hidden aerial tramway offering stunning Manhattan skyline views without the tourist crowds.',
    category: ['Transportation', 'Scenic'],
    tags: ['hidden-gem', 'scenic', 'budget-friendly'],
    address: '59th St & 2nd Ave, New York, NY 10022',
    neighborhood: 'Roosevelt Island',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.7,
    priceRange: 'Budget',
    bestTimeToVisit: 'Sunset (5-7 PM)',
    tips: [
      'Best views during golden hour',
      'Avoid rush hour (8-9 AM, 5-6 PM)',
      'Combine with Roosevelt Island walk'
    ],
    createdAt: null,
    updatedAt: null
  },
  {
    id: 'hidden-gem-2',
    name: 'Green-Wood Cemetery',
    description: 'A historic cemetery with beautiful architecture, rolling hills, and panoramic city views.',
    category: ['History', 'Parks'],
    tags: ['hidden-gem', 'local-only', 'scenic'],
    address: '500 25th St, Brooklyn, NY 11232',
    neighborhood: 'Greenwood Heights',
    coordinates: { lat: 40.6565, lng: -73.9942 },
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.5,
    priceRange: 'Budget',
    bestTimeToVisit: 'Weekday afternoons',
    tips: [
      'Visit the chapel for stunning architecture',
      'Walk to the highest point for city views',
      'Respect the peaceful atmosphere'
    ],
    createdAt: null,
    updatedAt: null
  },
  {
    id: 'hidden-gem-3',
    name: 'The Cloisters',
    description: 'Medieval art museum in a castle-like building overlooking the Hudson River.',
    category: ['Culture', 'Museums'],
    tags: ['hidden-gem', 'local-only', 'scenic'],
    address: '99 Margaret Corbin Dr, New York, NY 10040',
    neighborhood: 'Washington Heights',
    coordinates: { lat: 40.8649, lng: -73.9319 },
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.6,
    priceRange: 'Mid-range',
    bestTimeToVisit: 'Weekday mornings',
    tips: [
      'Free with Metropolitan Museum membership',
      'Visit the gardens for tranquility',
      'Combine with Fort Tryon Park walk'
    ],
    createdAt: null,
    updatedAt: null
  },

  // FEATURED EXPERIENCES - FIRST TIMER SPOTS
  {
    id: 'first-timer-1',
    name: 'Times Square',
    description: 'The iconic crossroads of the world with dazzling lights and energy.',
    category: ['Entertainment', 'Landmarks'],
    tags: ['first-timer', 'trending'],
    address: 'Manhattan, NY 10036',
    neighborhood: 'Midtown',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.2,
    priceRange: 'Budget',
    bestTimeToVisit: 'Evening (after sunset)',
    tips: [
      'Visit at night for the full light show',
      'Avoid peak tourist hours (12-2 PM)',
      'Don\'t miss the New Year\'s Eve ball'
    ],
    createdAt: null,
    updatedAt: null
  },
  {
    id: 'first-timer-2',
    name: 'Central Park',
    description: '843 acres of urban oasis with lakes, trails, and iconic landmarks.',
    category: ['Parks', 'Nature'],
    tags: ['first-timer', 'scenic', 'budget-friendly'],
    address: 'Central Park, New York, NY',
    neighborhood: 'Upper East Side',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.8,
    priceRange: 'Budget',
    bestTimeToVisit: 'Early morning or late afternoon',
    tips: [
      'Rent bikes to cover more ground',
      'Visit Bethesda Fountain',
      'Walk the Mall for tree-lined paths'
    ],
    createdAt: null,
    updatedAt: null
  },

  // LOCAL-ONLY PLACES
  {
    id: 'local-only-1',
    name: 'DUMBO Waterfront',
    description: 'Brooklyn\'s trendy neighborhood with cobblestone streets and Manhattan Bridge views.',
    category: ['Culture', 'Scenic'],
    tags: ['local-only', 'content-creator', 'scenic'],
    address: 'DUMBO, Brooklyn, NY 11201',
    neighborhood: 'DUMBO',
    coordinates: { lat: 40.7033, lng: -73.9871 },
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    rating: 4.6,
    priceRange: 'Mid-range',
    bestTimeToVisit: 'Weekend mornings',
    tips: [
      'Visit Washington Street for iconic bridge photo',
      'Try local coffee shops',
      'Walk the Brooklyn Bridge back to Manhattan'
    ],
    createdAt: null,
    updatedAt: null
  },
  {
    id: 'local-only-2',
    name: 'Astoria Park',
    description: 'Queens\' hidden gem with Olympic-size pool and stunning East River views.',
    category: ['Parks', 'Recreation'],
    tags: ['local-only', 'budget-friendly', 'scenic'],
    address: '19 19th St, Astoria, NY 11105',
    neighborhood: 'Astoria',
    coordinates: { lat: 40.7795, lng: -73.9207 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.4,
    priceRange: 'Budget',
    bestTimeToVisit: 'Summer afternoons',
    tips: [
      'Visit the pool in summer',
      'Walk along the waterfront',
      'Combine with Astoria food tour'
    ],
    createdAt: null,
    updatedAt: null
  },

  // CHILL & SCENIC VIEWS
  {
    id: 'scenic-1',
    name: 'Brooklyn Heights Promenade',
    description: 'Peaceful walkway with uninterrupted Manhattan skyline views.',
    category: ['Scenic', 'Parks'],
    tags: ['scenic', 'local-only', 'content-creator'],
    address: 'Brooklyn Heights Promenade, Brooklyn, NY',
    neighborhood: 'Brooklyn Heights',
    coordinates: { lat: 40.6997, lng: -73.9969 },
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    rating: 4.7,
    priceRange: 'Budget',
    bestTimeToVisit: 'Sunset',
    tips: [
      'Best photos during golden hour',
      'Visit the nearby Brooklyn Bridge Park',
      'Quiet and peaceful atmosphere'
    ],
    createdAt: null,
    updatedAt: null
  },

  // BUDGET-FRIENDLY NYC
  {
    id: 'budget-1',
    name: 'High Line Park',
    description: 'Elevated park built on historic freight rail line with art installations.',
    category: ['Parks', 'Culture'],
    tags: ['budget-friendly', 'scenic', 'first-timer'],
    address: 'High Line, New York, NY 10011',
    neighborhood: 'Chelsea',
    coordinates: { lat: 40.7484, lng: -74.0047 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.5,
    priceRange: 'Budget',
    bestTimeToVisit: 'Weekday afternoons',
    tips: [
      'Start at Gansevoort Street entrance',
      'Visit the Chelsea Market nearby',
      'Check for seasonal art installations'
    ],
    createdAt: null,
    updatedAt: null
  },

  // CONTENT CREATORS
  {
    id: 'content-creator-1',
    name: 'Vessel',
    description: 'Interactive art structure with 154 flights of stairs and unique photo opportunities.',
    category: ['Art', 'Landmarks'],
    tags: ['content-creator', 'trending', 'first-timer'],
    address: '20 Hudson Yards, New York, NY 10001',
    neighborhood: 'Hudson Yards',
    coordinates: { lat: 40.7505, lng: -74.0086 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.3,
    priceRange: 'Mid-range',
    bestTimeToVisit: 'Early morning for photos',
    tips: [
      'Reserve free tickets online',
      'Best photos from the top',
      'Visit the Edge observation deck nearby'
    ],
    createdAt: null,
    updatedAt: null
  },

  // POPULAR DESTINATIONS - FOOD
  {
    id: 'food-1',
    name: 'Katz\'s Delicatessen',
    description: 'Iconic Jewish deli famous for pastrami sandwiches since 1888.',
    category: ['Food', 'History'],
    tags: ['trending', 'first-timer'],
    address: '205 E Houston St, New York, NY 10002',
    neighborhood: 'Lower East Side',
    coordinates: { lat: 40.7223, lng: -73.9874 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.4,
    priceRange: 'Mid-range',
    bestTimeToVisit: 'Weekday lunch (avoid weekends)',
    tips: [
      'Order at the counter, not table service',
      'Try the pastrami on rye',
      'Famous from "When Harry Met Sally"'
    ],
    createdAt: null,
    updatedAt: null
  },

  // POPULAR DESTINATIONS - CULTURE
  {
    id: 'culture-1',
    name: 'Metropolitan Museum of Art',
    description: 'World-famous art museum with collections spanning 5,000+ years.',
    category: ['Culture', 'Museums'],
    tags: ['trending', 'first-timer'],
    address: '1000 5th Ave, New York, NY 10028',
    neighborhood: 'Upper East Side',
    coordinates: { lat: 40.7794, lng: -73.9632 },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.7,
    priceRange: 'Mid-range',
    bestTimeToVisit: 'Weekday mornings',
    tips: [
      'Pay what you wish (suggested $25)',
      'Visit the rooftop garden in summer',
      'Don\'t miss the Temple of Dendur'
    ],
    createdAt: null,
    updatedAt: null
  }
];

// Helper functions to filter locations
export const getHiddenGems = () => nycLocations.filter(loc => loc.tags.includes('hidden-gem'));
export const getFirstTimerSpots = () => nycLocations.filter(loc => loc.tags.includes('first-timer'));
export const getLocalOnlyPlaces = () => nycLocations.filter(loc => loc.tags.includes('local-only'));
export const getScenicViews = () => nycLocations.filter(loc => loc.tags.includes('scenic'));
export const getBudgetFriendly = () => nycLocations.filter(loc => loc.tags.includes('budget-friendly'));
export const getContentCreatorSpots = () => nycLocations.filter(loc => loc.tags.includes('content-creator'));
export const getTrendingSpots = () => nycLocations.filter(loc => loc.tags.includes('trending'));
export const getLocationsByCategory = (category: string) => nycLocations.filter(loc => loc.category.includes(category)); 