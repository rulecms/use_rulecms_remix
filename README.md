# RuleCMS React Router Demo

A comprehensive demonstration of RuleCMS widget integration with React Router, showcasing different rendering methods and modern web development patterns.

## 🚀 Live Demo

Visit the live demo to see all rendering methods in action:
- **Development**: `http://localhost:5173` (after running locally)

## 📋 Overview

This project demonstrates how to integrate RuleCMS widgets with a React Router application, featuring:

- **Client-Side Rendering (CSR)** - Default React Router behavior
- **Server-Side Rendering (SSR)** - Using loaders for dynamic data
- **Static Site Generation (SSG)** - Pre-rendered content at build time
- **Framework Features** - Showcasing React Router capabilities

Each demo includes detailed information about the rendering method, performance characteristics, use cases, and benefits.

## 🛠️ Technology Stack

- **React Router v6** - Modern routing solution for React
- **RuleCMS Widget React** - Content management widgets
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe development
- **CSS3** - Modern styling with dark theme

## 🏁 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd use_rulecms_remix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── CollapsibleCard.tsx   # Expandable content cards
│   ├── Navigation.tsx        # Route navigation component
│   └── RuleCMSWidget.tsx     # RuleCMS widget wrapper
├── routes/              # Route components
│   ├── CSR.tsx              # Client-side rendering demo
│   ├── SSR.tsx              # Server-side rendering demo
│   ├── SSG.tsx              # Static site generation demo
│   └── Features.tsx         # React Router features showcase
├── styles.css           # Global styles and theme
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🎨 Features

### Interactive UI Components
- **Collapsible Cards**: Expandable content sections with smooth animations
- **Navigation Grid**: Visual route selection with active state indication
- **Dark Theme**: Professional dark color scheme with excellent contrast
- **Responsive Design**: Mobile-friendly layout and navigation

### Rendering Method Demos
Each route demonstrates a different rendering approach:

1. **[CSR - Client-Side Rendering](http://localhost:5173/)**
   - Default React Router behavior
   - Dynamic client-side content generation
   - Fast page transitions

2. **[SSR - Server-Side Rendering](http://localhost:5173/ssr)**
   - Dynamic server-side data fetching
   - Improved SEO and initial load performance
   - Request-specific content

3. **[SSG - Static Site Generation](http://localhost:5173/ssg)**
   - Pre-rendered static content
   - Maximum performance and SEO benefits
   - CDN-friendly deployment

4. **[Features - React Router Capabilities](http://localhost:5173/features)**
   - Framework feature showcase
   - Development advantages
   - Comparison with other solutions

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# RuleCMS Configuration
VITE_RULECMS_APP_TOKEN=your_app_token_here
VITE_RULECMS_PUBLISHED_KEY=your_published_key_here

# Development settings
VITE_APP_TITLE=RuleCMS React Router Demo
VITE_APP_DESCRIPTION=A demo showcasing RuleCMS widgets with React Router rendering methods
```

### RuleCMS Setup

1. Sign up for a [RuleCMS account](https://rulecms.com)
2. Create a new app and obtain your app token
3. Create and publish a widget to get the published key
4. Update the environment variables with your credentials

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler

# Testing
npm run test         # Run tests (when configured)
```

## 🌐 Deployment

### Static Hosting (Recommended)
This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3 + CloudFront**: For enterprise-grade hosting

### Build Command
```bash
npm run build
```

### Output Directory
```bash
dist/
```

## 🔧 Customization

### Adding New Routes
1. Create a new component in `src/routes/`
2. Import and add the route to `src/App.tsx`
3. Update the navigation in `src/components/Navigation.tsx`

### Styling
- Global styles: `src/styles.css`
- Component-specific styles: Use CSS classes with the existing theme
- Color scheme: Modify CSS custom properties in `:root`

### RuleCMS Integration
- Widget configuration: `src/components/RuleCMSWidget.tsx`
- Provider setup: `src/App.tsx`
- Environment variables: `.env`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- **Documentation**: [React Router Docs](https://reactrouter.com/)
- **RuleCMS Docs**: [RuleCMS Documentation](https://docs.rulecms.com/)
- **Issues**: [GitHub Issues](../../issues)

## 🙏 Acknowledgments

- React Router team for the excellent routing solution
- RuleCMS team for the content management widgets
- Vite team for the fast development experience
- Open source community for inspiration and tools

---

Built with ❤️ using React Router and RuleCMS
