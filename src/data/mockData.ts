export interface Destination {
  id: string;
  name: string;
  description: string;
  emirate: string;
  image: string;
  rating: number;
  priceUSD: number;
  priceAED: number;
  priceINR: number;
  duration: string;
  category: 'beach' | 'desert' | 'city' | 'culture' | 'adventure';
  highlights: string[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  priceUSD: number;
  priceAED: number;
  priceINR: number;
  duration: string;
  category: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  stars: number;
  pricePerNightUSD: number;
  pricePerNightAED: number;
  pricePerNightINR: number;
  amenities: string[];
}

export const services = [
  {
    title: 'Consultancy',
    desc: 'Expert strategic guidance for businesses and individuals entering the UAE market. We plan, advise, and execute.',
    image: 'https://images.pexels.com/photos/8068778/pexels-photo-8068778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    title: 'Business Setup',
    desc: 'Complete company formation, trade licensing, and free zone registrations across all UAE emirates.',
    image: 'https://images.pexels.com/photos/7821463/pexels-photo-7821463.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    title: 'Documentation Services',
    desc: 'Professional handling of attestation, notarization, translation, and all legal paperwork requirements.',
    image: 'https://images.pexels.com/photos/7876037/pexels-photo-7876037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    title: 'Jobs Providing / Employment',
    desc: 'Direct employment solutions, recruitment support, and workforce placement across multiple industries.',
    image: 'https://images.pexels.com/photos/4226115/pexels-photo-4226115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    title: 'Employment Visa Consultation',
    desc: 'End-to-end employment visa processing, medical coordination, Emirates ID and labor card support.',
    image: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=600&auto=format&fit=crop',
  },
  {
    title: 'Visit Visa Services',
    desc: 'Fast-track tourist, business, and family visit visa applications with guaranteed processing timelines.',
    image: 'https://images.pexels.com/photos/4173229/pexels-photo-4173229.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    title: 'Tickets Services',
    desc: 'Premium domestic and international flight bookings at competitive rates with flexible change options.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&auto=format&fit=crop',
  },
];

export const destinations: Destination[] = [
  {
    id: 'd1',
    name: 'Burj Khalifa Skylounge',
    description: 'Private VIP access to Level 148 with panoramic views, Arabic coffee, and dedicated lounge ambassador.',
    emirate: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
    rating: 4.95,
    priceUSD: 195,
    priceAED: 715,
    priceINR: 16200,
    duration: '3 Hours',
    category: 'city',
    highlights: ['Level 148 VIP Entry', 'Lounge Ambassador', 'Arabic Coffee & Dates', 'Fountain View'],
  },
  {
    id: 'd2',
    name: 'Sheikh Zayed Mosque Tour',
    description: 'Full-day chauffeur-driven cultural tour including the Grand Mosque and Louvre Abu Dhabi.',
    emirate: 'Abu Dhabi',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop',
    rating: 4.98,
    priceUSD: 240,
    priceAED: 880,
    priceINR: 19900,
    duration: 'Full Day',
    category: 'culture',
    highlights: ['Historian Guide', 'Louvre Access', 'Private Sedan', 'Gourmet Lunch'],
  },
  {
    id: 'd3',
    name: 'Royal Desert Safari',
    description: 'Premium desert wildlife experience with falconry, 6-course dinner, and stargazing under open skies.',
    emirate: 'Dubai',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&auto=format&fit=crop',
    rating: 4.91,
    priceUSD: 360,
    priceAED: 1320,
    priceINR: 29900,
    duration: '7 Hours',
    category: 'desert',
    highlights: ['Elite SUV Transport', 'Falconry Display', '6-Course Dinner', 'Stargazing'],
  },
  {
    id: 'd4',
    name: 'Palm Jumeirah Heli & Yacht',
    description: 'Helicopter flight over iconic Palm followed by a luxury yacht cruise along Dubai coastline.',
    emirate: 'Dubai',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop',
    rating: 4.89,
    priceUSD: 495,
    priceAED: 1815,
    priceINR: 41200,
    duration: '5 Hours',
    category: 'beach',
    highlights: ['Helicopter Ride', 'Private Yacht', 'Captain & Crew', 'BBQ Onboard'],
  },
  {
    id: 'd5',
    name: 'Jebel Jais Mountain Zipline',
    description: 'The world\'s longest zipline at 1,484m elevation with suspended sky bridge and peak-view dining.',
    emirate: 'Ras Al Khaimah',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop',
    rating: 4.86,
    priceUSD: 170,
    priceAED: 625,
    priceINR: 14100,
    duration: '6 Hours',
    category: 'adventure',
    highlights: ['World Record Zipline', 'Sky Bridge', 'Peak Lunch', 'Alpine Instructors'],
  },
  {
    id: 'd6',
    name: 'Sharjah Heritage Walk',
    description: 'Guided tour of Sharjah\'s museums, art galleries, and restored heritage village with cultural immersion.',
    emirate: 'Sharjah',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop',
    rating: 4.82,
    priceUSD: 85,
    priceAED: 310,
    priceINR: 7100,
    duration: '4 Hours',
    category: 'culture',
    highlights: ['Heritage Village', 'Art Galleries', 'Souq Walk', 'Traditional Lunch'],
  },
];

export const experiences: Experience[] = [
  {
    id: 'e1',
    title: 'Sunrise Hot Air Balloon',
    description: 'Float over Dubai desert dunes at sunrise with live falcon display and gourmet breakfast.',
    image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&auto=format&fit=crop',
    priceUSD: 390,
    priceAED: 1430,
    priceINR: 32300,
    duration: '4 Hours',
    category: 'VIP',
  },
  {
    id: 'e2',
    title: 'Supercar Rally Experience',
    description: 'Drive a Ferrari or Lamborghini on professionally mapped mountain and highway routes.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop',
    priceUSD: 980,
    priceAED: 3590,
    priceINR: 81500,
    duration: 'Full Day',
    category: 'Adventure',
  },
  {
    id: 'e3',
    title: 'Pearl Diving Heritage',
    description: 'Sail on a handcrafted wooden dhow to dive for real oysters and keep every pearl found.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop',
    priceUSD: 150,
    priceAED: 550,
    priceINR: 12500,
    duration: '4 Hours',
    category: 'Cultural',
  },
];

export const hotels: Hotel[] = [
  {
    id: 'h1',
    name: 'Burj Al Arab Jumeirah',
    location: 'Jumeirah Beach, Dubai',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
    rating: 4.99,
    stars: 7,
    pricePerNightUSD: 1950,
    pricePerNightAED: 7150,
    pricePerNightINR: 162000,
    amenities: ['24/7 Butler', 'Private Helipad', 'Hermès Amenities', 'Talise Spa'],
  },
  {
    id: 'h2',
    name: 'Qasr Al Sarab Desert Resort',
    location: 'Liwa Desert, Abu Dhabi',
    image: 'https://images.unsplash.com/photos/1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    rating: 4.96,
    stars: 5,
    pricePerNightUSD: 680,
    pricePerNightAED: 2490,
    pricePerNightINR: 56500,
    amenities: ['Private Pool', 'Camel Caravan', 'Stargazing Telescope'],
  },
  {
    id: 'h3',
    name: 'Atlantis The Royal',
    location: 'Palm Jumeirah, Dubai',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
    rating: 4.92,
    stars: 5,
    pricePerNightUSD: 890,
    pricePerNightAED: 3260,
    pricePerNightINR: 73900,
    amenities: ['Skypool', 'Nobu Restaurant', 'Cloud 22 Rooftop'],
  },
];

export const stats = [
  { value: '5000+', label: 'Clients Served' },
  { value: '12+', label: 'Years Experience' },
  { value: '98%', label: 'Success Rate' },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'city', label: 'City' },
  { id: 'desert', label: 'Desert' },
  { id: 'beach', label: 'Beach' },
  { id: 'culture', label: 'Culture' },
  { id: 'adventure', label: 'Adventure' },
];
