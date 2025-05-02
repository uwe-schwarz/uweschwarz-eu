
import React, { useEffect } from 'react';

const SitemapXML = () => {
  const baseUrl = window.location.origin;
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

  useEffect(() => {
    // Set the content type to XML
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Content-Type';
    metaTag.content = 'text/xml; charset=utf-8';
    document.head.appendChild(metaTag);
    
    // This is a hack to get the browser to display the XML correctly
    document.body.innerHTML = `<pre>${xml}</pre>`;
    
    return () => {
      document.head.removeChild(metaTag);
    };
  }, [xml]);

  return null;
};

export default SitemapXML;
