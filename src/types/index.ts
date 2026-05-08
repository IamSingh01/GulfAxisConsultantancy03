export interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  category: 'beach' | 'desert' | 'city' | 'culture' | 'adventure';
  highlights: string[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  maxGuests: number;
  includes: string[];
  category: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  stars: number;
  pricePerNight: number;
  amenities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  country: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
