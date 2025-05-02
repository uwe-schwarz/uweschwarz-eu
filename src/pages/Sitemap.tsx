
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { siteContent } from '@/content/content';

const Sitemap = () => {
  const { t } = useSettings();
  const baseUrl = window.location.origin;
  
  // Get current date in format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Create XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/imprint</loc>
    <lastmod>${today}</lastmod>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${today}</lastmod>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/cv</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/sitemap</loc>
    <lastmod>${today}</lastmod>
    <priority>0.3</priority>
  </url>
</urlset>`;

  // Default title and description with fallbacks
  const sitemapTitle = siteContent.sitemap?.title 
    ? t(siteContent.sitemap.title) 
    : 'Sitemap';
  
  const sitemapDescription = siteContent.sitemap?.description 
    ? t(siteContent.sitemap.description) 
    : 'Here are all the pages on this website:';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{sitemapTitle}</h1>
        <div className="mb-8">
          <p className="mb-4">{sitemapDescription}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><a href="/" className="text-primary hover:underline">Homepage</a></li>
            <li><a href="/cv" className="text-primary hover:underline">CV / Resume</a></li>
            <li><a href="/imprint" className="text-primary hover:underline">Imprint</a></li>
            <li><a href="/privacy" className="text-primary hover:underline">Privacy Policy</a></li>
            <li><a href="/sitemap.xml" className="text-primary hover:underline">XML Sitemap</a></li>
          </ul>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">XML Sitemap</h2>
          <p className="mb-4">View the <a href="/sitemap.xml" className="text-primary hover:underline">XML Sitemap</a> for search engines.</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
            {xml}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
