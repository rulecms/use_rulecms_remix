import { useState, useEffect } from 'react';
import { CollapsibleCard } from '../components/CollapsibleCard';
import { RuleCMSWidget } from '../components/RuleCMSWidget';
import { Navigation } from '../components/Navigation';

export function SSR() {
  const [renderTime] = useState(new Date().toLocaleString());
  const [userAgent, setUserAgent] = useState('Loading...');

  // Simulate data fetching on component mount
  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  const ssrInfo = [
    { label: 'Render Time', value: renderTime },
    { label: 'Method', value: 'Server-Side Rendering (SSR)' },
    { label: 'Framework', value: 'React Router v6' },
    { label: 'Runtime', value: 'Browser (Client-side for demo)' },
    { label: 'Render Location', value: 'Client (would be Server in real SSR)' },
    { label: 'User Agent', value: userAgent.substring(0, 50) + '...' }
  ];

  const benefits = [
    'Faster initial page load and Time to First Byte',
    'Better SEO with pre-rendered HTML content',
    'Improved performance on slower devices',
    'Works without JavaScript enabled',
    'Dynamic content based on request context',
    'Real-time data fetching on each request'
  ];

  const useCases = [
    'E-commerce product pages with dynamic pricing',
    'Blog posts and content management sites',
    'Marketing landing pages with A/B testing',
    'Applications requiring SEO optimization',
    'Pages with user-specific or location-based content',
    'Social media feeds and real-time dashboards'
  ];

  return (
    <div className="container">
      <Navigation />
      
      <div className="main-content">
        <div className="rulecms-section">
          <h1>Server-Side Rendering (SSR)</h1>
          <p className="rulecms-description">
            This page demonstrates RuleCMS widgets in a Server-Side Rendering context. 
            While this demo runs client-side, it showcases SSR concepts and benefits. 
            In a real SSR setup, the content would be generated on the server with each request.
          </p>
          
          <CollapsibleCard title="RuleCMS Widget Demo" defaultExpanded>
            <div className="widget-demo">
              <p>The RuleCMS widget below demonstrates SSR integration concepts:</p>
              <RuleCMSWidget />
            </div>
          </CollapsibleCard>
          
          <CollapsibleCard title="Server Rendering Information">
            <div className="info-grid">
              {ssrInfo.map((item, index) => (
                <div key={index} className="info-item">
                  <span className="info-label">{item.label}:</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Benefits of SSR">
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