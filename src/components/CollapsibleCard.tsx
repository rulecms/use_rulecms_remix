import { useState } from 'react';

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  defaultExpanded?: boolean;
}

export function CollapsibleCard({ 
  title, 
  children, 
  defaultCollapsed,
  defaultExpanded 
}: CollapsibleCardProps) {
  // If defaultExpanded is provided, use !defaultExpanded, otherwise use defaultCollapsed (default true)
  const initialCollapsed = defaultExpanded !== undefined ? !defaultExpanded : (defaultCollapsed ?? true);
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  return (
    <div className="collapsible-card">
      <div className="collapsible-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="collapsible-title-row">
          <strong className="collapsible-title">{title}</strong>
          <button className="collapsible-toggle" aria-label={isCollapsed ? 'Expand' : 'Collapse'}>
            <svg 
              className={`collapsible-icon ${isCollapsed ? 'collapsed' : 'expanded'}`}
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="currentColor"
            >
              <path d="M8 12L3 7h10l-5 5z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={`collapsible-content ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="collapsible-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
}