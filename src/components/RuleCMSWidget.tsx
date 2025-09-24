import { RuleCMSWidget as RuleCMSWidgetCore } from '@rulecms/widget-react';

export function RuleCMSWidget() {
  // Get environment variables from Vite - using correct env var names
  const publishedKey = import.meta.env.VITE_PUBLISHED_KEY || 'ab0ea12b-af32-4d61-90b2-6af534f87290---widget-27eec7b6-669a-4ceb-b37c-14fdb7abb743';

  return <RuleCMSWidgetCore publishedKey={publishedKey} />;
}
