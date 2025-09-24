import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  {
    href: '/',
    label: 'CSR',
    title: 'Client-Side Rendering',
    description: 'Default React Router client-side rendering'
  },
  {
    href: '/ssr',
    label: 'SSR',
    title: 'Server-Side Rendering',
    description: 'Dynamic rendering with loaders'
  },
  {
    href: '/ssg',
    label: 'SSG',
    title: 'Static Site Generation',
    description: 'Pre-rendered at build time'
  },
  {
    href: '/features',
    label: 'Features',
    title: 'React Router Features',
    description: 'Nested routing and more'
  }
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation-container">
      <div className="nav-header">
        <h3>React Router Rendering Methods</h3>
        <p>Choose a rendering method to see RuleCMS widgets in action:</p>
      </div>
      
      <div className="nav-grid">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-card ${isActive ? 'nav-card-active' : ''}`}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-title">{item.title}</div>
              <div className="nav-card-description">{item.description}</div>
              {isActive && <div className="nav-card-badge">Current</div>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}