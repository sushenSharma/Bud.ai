# BUD.ai Landing Page

A modern, responsive landing page for BUD.ai - an AI-powered cannabis recommendation platform. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Clean, minimalist interface with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Scrolling**: Elegant scroll animations using Intersection Observer API
- **AI-Focused Branding**: Professional presentation of AI-powered cannabis recommendations
- **Contact Form**: Integrated signup/contact form for user registration
- **Performance Optimized**: Built with Next.js for optimal loading speeds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd budai-landing
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** - CSS post-processor
- **[ESLint](https://eslint.org/)** - Code linting and formatting

## 📁 Project Structure

```
budai-landing/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind imports
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Main landing page component
│   └── hooks/
│       └── useScrollAnimation.ts # Custom hook for scroll animations
├── public/                      # Static assets
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Sections

### Navigation
- Fixed header with smooth scroll navigation
- Responsive menu for mobile devices
- Brand logo and navigation links

### Hero Section
- Eye-catching headline with AI branding
- Call-to-action buttons ("Get Started" and "Learn More")
- Animated phone mockup visualization

### Features Section
- Three key value propositions:
  - Personalized Recommendations
  - Expert Community
  - Track Your Journey
- Icon-based presentation with hover effects

### Testimonials
- User reviews with star ratings
- Diverse user personas (Medical, Recreational, New Users)
- Professional testimonial cards

### Contact/Signup Form
- User registration form
- Responsive form layout
- Professional styling with focus states

### Footer
- Organized navigation links
- Company information
- Professional branding

## 🎯 Key Features

### Animations
- Scroll-triggered fade-in animations
- Hover effects on interactive elements
- Smooth transitions throughout the site

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Prevents horizontal scrolling

### Performance
- Optimized build output
- Static site generation
- Minimal JavaScript bundle

## 📜 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms
The project can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Configuration

### Environment Variables
Currently no environment variables are required for basic functionality.

### Customization
- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Fonts**: Update in `src/app/layout.tsx`
- **Content**: Edit sections in `src/app/page.tsx`
- **Animations**: Customize in `src/hooks/useScrollAnimation.ts`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please contact [support@budai.com](mailto:support@budai.com)
