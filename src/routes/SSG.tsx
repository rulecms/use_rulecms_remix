import { CollapsibleCard } from '../components/CollapsibleCard';
import { RuleCMSWidget } from '../components/RuleCMSWidget';
import { Navigation } from '../components/Navigation';

export function SSG() {
  // Build time would be injected during build process
  const buildTime = '2024-01-15T10:30:00.000Z'; // Simulated build time

  const ssgInfo = [
    { label: 'Built at', value: new Date(buildTime).toLocaleString() },
    { label: 'Method', value: 'Static Site Generation (SSG)' },
    { label: 'Framework', value: 'React Router v6' },
    { label: 'Bundle Type', value: 'Pre-built Static HTML' },
    { label: 'Runtime', value: 'CDN/Static Server' },
    { label: 'Regeneration', value: 'On deployment' }
  ];

  const benefits = [
    'Lightning-fast page loads from CDN',
    'Excellent SEO with static HTML',
    'High security with no server runtime',
    'Cost-effective hosting on CDNs',
    'Perfect Lighthouse scores',
    'Global distribution capabilities'
  ];

  const useCases = [
    'Marketing websites and landing pages',
    'Documentation sites',
    'Blogs with infrequent updates',
    'Portfolio and showcase sites',
    'E-commerce product catalogs',
    'Company websites and brochures'
  ];

  const buildProcess = [
    'Content fetched at build time',
    'Pages pre-rendered to static HTML',
    'Assets optimized and bundled',
    'Files deployed to CDN',
    'Client hydration for interactivity'
  ];

  return (
    <div className="container">
      <Navigation />
      
      <div className="main-content">
        <div className="rulecms-section">
          <h1>Static Site Generation (SSG)</h1>
          <p className="rulecms-description">
            This page demonstrates RuleCMS widgets in a statically generated page. 
            The content is pre-rendered at build time, providing maximum performance 
            and SEO benefits while maintaining full interactivity after hydration.
          </p>
          
          <CollapsibleCard title="RuleCMS Widget Demo" defaultExpanded>
            <div className="widget-demo">
              <p>The RuleCMS widget below is rendered in a static page with client-side hydration:</p>
              <RuleCMSWidget />
            </div>
          </CollapsibleCard>
          
          <CollapsibleCard title="Static Generation Information">
            <div className="info-grid">
              {ssgInfo.map((item, index) => (
                <div key={index} className="info-item">
                  <span className="info-label">{item.label}:</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Build Process">
            <ol className="benefits-list">
              {buildProcess.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </CollapsibleCard>

          <CollapsibleCard title="Benefits of SSG">
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </CollapsibleCard>

          <CollapsibleCard title="Ideal Use Cases">
            <ul className="benefits-list">
              {useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}