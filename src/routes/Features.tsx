import { CollapsibleCard } from '../components/CollapsibleCard';
import { RuleCMSWidget } from '../components/RuleCMSWidget';
import { Navigation } from '../components/Navigation';

export function Features() {
  const currentTime = new Date().toLocaleString();

  const featuresInfo = [
    { label: 'Rendered at', value: currentTime },
    { label: 'Framework', value: 'React Router v6' },
    { label: 'Routing Type', value: 'Client-side with nested routes' },
    { label: 'Bundle Splitting', value: 'Code splitting enabled' },
    { label: 'Hot Reload', value: 'Development mode active' }
  ];

  const routerFeatures = [
    {
      feature: 'Nested Routing',
      description: 'Hierarchical route structures with layout sharing'
    },
    {
      feature: 'Data Loading',
      description: 'Route-based data fetching with loaders'
    },
    {
      feature: 'Error Boundaries',
      description: 'Route-level error handling and recovery'
    },
    {
      feature: 'Code Splitting',
      description: 'Automatic bundle splitting by route'
    },
    {
      feature: 'Form Handling',
      description: 'Built-in form submission and validation'
    },
    {
      feature: 'Search Params',
      description: 'URL search parameter management'
    }
  ];

  const advantages = [
    'File-based routing with automatic code splitting',
    'Built-in data loading patterns',
    'Seamless client-side navigation',
    'Progressive enhancement support',
    'TypeScript-first development experience',
    'Excellent developer tooling and debugging'
  ];

  const comparisonPoints = [
    {
      aspect: 'Learning Curve',
      description: 'Moderate - familiar React patterns with routing conventions'
    },
    {
      aspect: 'Performance',
      description: 'Excellent client-side performance with optimized bundling'
    },
    {
      aspect: 'SEO',
      description: 'Good with SSR setup, requires additional configuration'
    },
    {
      aspect: 'Deployment',
      description: 'Flexible - works with various hosting platforms'
    }
  ];

  return (
    <div className="container">
      <Navigation />
      
      <div className="main-content">
        <div className="rulecms-section">
          <h1>React Router Features</h1>
          <p className="rulecms-description">
            This page showcases React Router v6 capabilities alongside RuleCMS widgets. 
            React Router provides powerful routing features for single-page applications 
            with excellent developer experience and performance optimization.
          </p>
          
          <CollapsibleCard title="RuleCMS Integration Demo" defaultExpanded>
            <div className="widget-demo">
              <p>RuleCMS widgets work seamlessly with React Router's routing system:</p>
              <RuleCMSWidget />
            </div>
          </CollapsibleCard>
          
          <CollapsibleCard title="Current Environment">
            <div className="info-grid">
              {featuresInfo.map((item, index) => (
                <div key={index} className="info-item">
                  <span className="info-label">{item.label}:</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Key React Router Features">
            <div className="features-grid">
              {routerFeatures.map((item, index) => (
                <div key={index} className="feature-item">
                  <h4>{item.feature}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Development Advantages">
            <ul className="benefits-list">
              {advantages.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
          </CollapsibleCard>

          <CollapsibleCard title="Framework Comparison">
            <div className="comparison-grid">
              {comparisonPoints.map((point, index) => (
                <div key={index} className="comparison-item">
                  <span className="comparison-label">{point.aspect}:</span>
                  <span className="comparison-value">{point.description}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}