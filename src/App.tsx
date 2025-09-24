import { Routes, Route } from 'react-router-dom';
import { RuleCMSWidgetProvider } from '@rulecms/widget-react';
import { CSR } from './routes/CSR';
import { SSR } from './routes/SSR';
import { SSG } from './routes/SSG';
import { Features } from './routes/Features';
import './styles.css';

export default function App() {
  const token = import.meta.env.VITE_RULECMS_TOKEN || 'lEYWhW85gwxHXj3cyomTsNra6MaXu8Q90aa1Q5zjNNVUdrGko7VYLZtMH5n9FI5E';
  const endpoint = import.meta.env.VITE_RULECMS_ENDPOINT || 'https://rulecms.com';

  return (
    <RuleCMSWidgetProvider
      token={token}
      endpoint={endpoint}
    >
      <div className="app">
        <Routes>
          <Route path="/" element={<CSR />} />
          <Route path="/ssr" element={<SSR />} />
          <Route path="/ssg" element={<SSG />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </div>
    </RuleCMSWidgetProvider>
  );
}
