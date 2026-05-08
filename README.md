# VisitUAE - UAE Tourism Website

A stunning, modern tourism website for the United Arab Emirates built with React, Vite, Tailwind CSS, and Framer Motion. Features Firebase and Supabase integration ready for backend connectivity.

![UAE Tourism](https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200)

## ✨ Features

- 🎨 **Modern Design** - Clean, minimal aesthetic with amber/gold accent colors
- 📱 **Fully Responsive** - Optimized for all screen sizes (mobile, tablet, desktop)
- 🎬 **Smooth Animations** - Powered by Framer Motion
- 🎠 **Interactive Carousels** - Testimonials and experiences using Embla Carousel
- 🔥 **Firebase Ready** - Configuration file included
- 🚀 **Supabase Ready** - Client setup and helper functions included
- 📊 **Mock Data** - Sample data for destinations, hotels, and experiences
- ⚡ **Fast Performance** - Built with Vite for optimal build times

## 🏗️ Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Entry point
├── types/
│   └── index.ts           # TypeScript type definitions
├── data/
│   └── mockData.ts        # Sample tourism data
├── config/
│   ├── firebase.ts        # Firebase configuration
│   └── supabase.ts        # Supabase configuration
└── utils/
    └── cn.ts              # Tailwind class merging utility
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔥 Firebase Setup

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication, Firestore, and Storage as needed
3. Copy your Firebase config and update `src/config/firebase.ts`
4. Set environment variables in `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🚀 Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Set up your database tables (destinations, experiences, hotels, contact_submissions)
3. Copy your project URL and anon key
4. Set environment variables in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Recommended Database Schema

```sql
-- Destinations table
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  image TEXT,
  rating NUMERIC,
  reviews INTEGER,
  price NUMERIC,
  duration TEXT,
  category TEXT,
  highlights TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Experiences table
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  price NUMERIC,
  duration TEXT,
  max_guests INTEGER,
  includes TEXT[],
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hotels table
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT,
  image TEXT,
  rating NUMERIC,
  stars INTEGER,
  price_per_night NUMERIC,
  amenities TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Amber) | `#F59E0B` | CTAs, accents, highlights |
| Secondary (Slate) | `#0F172A` | Text, dark backgrounds |
| Background | `#F8FAFC` | Section backgrounds |
| White | `#FFFFFF` | Cards, content areas |

## 📱 Sections

1. **Hero** - Full-screen banner with call-to-action
2. **Destinations** - Filterable grid of UAE destinations
3. **Experiences** - Curated activities and tours
4. **Hotels** - Featured luxury accommodations
5. **Testimonials** - Customer reviews carousel
6. **Contact** - Contact form and information
7. **Footer** - Links and newsletter signup

## 🛠️ Technologies

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Carousel**: Embla Carousel
- **Icons**: Lucide React
- **Backend**: Firebase & Supabase (ready)

## 📝 Customization

### Adding New Destinations

Edit `src/data/mockData.ts` to add new destinations:

```typescript
{
  id: '7',
  name: 'Your Destination',
  description: 'Description here',
  location: 'Location',
  image: 'image-url',
  rating: 4.8,
  reviews: 1000,
  price: 200,
  duration: '3 hours',
  category: 'culture',
  highlights: ['Feature 1', 'Feature 2'],
}
```

### Changing Colors

Update the color classes in components or modify Tailwind config. The primary accent is `amber-500`.

## 🌐 Deployment

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for the UAE
