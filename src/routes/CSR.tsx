import { useState } from 'react';
import { CollapsibleCard } from '../components/CollapsibleCard';
import { RuleCMSWidget } from '../components/RuleCMSWidget';
import { Navigation } from '../components/Navigation';

export function CSR() {
  const [renderTime] = useState(new Date().toLocaleString());

  const csrInfo = [
    { label: 'Rendered at', value: renderTime },
    { label: 'Method', value: 'Client-Side Rendering (CSR)' },
    { label: 'Framework', value: 'React Router v6' },
    { label: 'Bundle Type', value: 'Client JavaScript' },
    { label: 'Hydration', value: 'Not applicable' }
  ];

  const benefits = [
    'Fast page transitions between routes',
    'Rich interactivity and dynamic updates',
    'Reduced server load after initial bundle',
    'Offline capabilities with service workers',
    'Familiar React development patterns'
  ];

  const useCases = [
    'Single-page applications (SPAs)',
    'Admin dashboards and internal tools',
    'Interactive web applications',
    'Applications with frequent user interactions',
    'Progressive web apps (PWAs)'
  ];

  return (
    <div className="container">
      <Navigation />
      
      <div className="main-content">
        <div className="rulecms-section">
          <h1>Client-Side Rendering (CSR)</h1>
          <p className="rulecms-description">
            This page demonstrates RuleCMS widgets rendered using React Router's default 
            client-side rendering. The content is rendered entirely in the browser 
            using JavaScript after the initial HTML loads.
          </p>
          
          <CollapsibleCard title="RuleCMS Widget Demo" defaultExpanded>
            <div className="widget-demo">
              <p>The RuleCMS widget below is rendered client-side:</p>
              <RuleCMSWidget />
            </div>
          </CollapsibleCard>
          
          <CollapsibleCard title="Rendering Information">
            <div className="info-grid">
              {csrInfo.map((item, index) => (
                <div key={index} className="info-item">
                  <span className="info-label">{item.label}:</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Benefits of CSR">
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