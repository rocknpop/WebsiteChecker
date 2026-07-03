import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App, { getSeoMetadata } from './App';

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <App initialPath={url} />
    </StrictMode>
  );
  const seo = getSeoMetadata(url);
  return { html, seo };
}
