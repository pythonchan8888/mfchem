import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * SEO Regression Tests
 *
 * These tests validate the built HTML output for correct SEO implementation.
 * Run `npm run build` before executing these tests.
 */

const distDir = path.resolve(__dirname, '../dist');

// Helper to read an HTML file from dist
const readHtml = (relativePath: string): string => {
  const filePath = path.join(distDir, relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Built file not found: ${filePath}. Run 'npm run build' first.`);
  }
  return fs.readFileSync(filePath, 'utf-8');
};

// All expected page paths
const pageFiles = [
  'index.html',
  '404.html',
  'catalog/glassware/index.html',
  'catalog/porcelainware/index.html',
  'catalog/silicaware/index.html',
  'catalog/plasticware/index.html',
  'catalog/sundries/index.html',
  'catalog/safety/index.html',
  'catalog/paper/index.html',
  'catalog/liquid/index.html',
  'catalog/equipment/index.html',
];

describe('SEO Infrastructure Files', () => {
  it('should have a robots.txt in the build output', () => {
    const robotsPath = path.join(distDir, 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);

    const content = fs.readFileSync(robotsPath, 'utf-8');
    expect(content).toContain('Sitemap:');
    expect(content).toContain('User-agent:');
  });

  it('should have a sitemap-index.xml in the build output', () => {
    const sitemapPath = path.join(distDir, 'sitemap-index.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const content = fs.readFileSync(sitemapPath, 'utf-8');
    expect(content).toContain('sitemapindex');
  });

  it('should have llms.txt in the build output', () => {
    const llmsPath = path.join(distDir, 'llms.txt');
    expect(fs.existsSync(llmsPath)).toBe(true);

    const content = fs.readFileSync(llmsPath, 'utf-8');
    expect(content).toContain('MF Chemicals');
    expect(content).toContain('mfchemicals.net');
  });

  it('should have llms-full.txt in the build output', () => {
    const llmsFullPath = path.join(distDir, 'llms-full.txt');
    expect(fs.existsSync(llmsFullPath)).toBe(true);

    const content = fs.readFileSync(llmsFullPath, 'utf-8');
    expect(content).toContain('Glassware');
    expect(content).toContain('Pyrex');
    expect(content.length).toBeGreaterThan(2000); // Should be comprehensive
  });

  it('should have a CNAME file for custom domain', () => {
    const cnamePath = path.join(distDir, 'CNAME');
    expect(fs.existsSync(cnamePath)).toBe(true);

    const content = fs.readFileSync(cnamePath, 'utf-8').trim();
    expect(content).toBe('www.mfchemicals.net');
  });
});

describe('Meta Tags — All Pages', () => {
  for (const pageFile of pageFiles) {
    describe(`Page: ${pageFile}`, () => {
      let html: string;

      beforeAll(() => {
        html = readHtml(pageFile);
      });

      it('should have exactly one <title> tag', () => {
        const matches = html.match(/<title>/g);
        expect(matches).not.toBeNull();
        expect(matches!.length).toBe(1);
      });

      it('should have a non-empty <title>', () => {
        const match = html.match(/<title>([^<]+)<\/title>/);
        expect(match).not.toBeNull();
        expect(match![1].trim().length).toBeGreaterThan(5);
      });

      it('should have a meta description', () => {
        expect(html).toMatch(/<meta\s+name="description"\s+content="[^"]+"/);
      });

      it('should have a canonical URL', () => {
        expect(html).toMatch(/<link\s+rel="canonical"\s+href="https:\/\/www\.mfchemicals\.net/);
      });

      it('should have Open Graph meta tags', () => {
        expect(html).toMatch(/<meta\s+property="og:title"/);
        expect(html).toMatch(/<meta\s+property="og:description"/);
        expect(html).toMatch(/<meta\s+property="og:image"/);
      });

      it('should have Twitter Card meta tags', () => {
        expect(html).toMatch(/<meta\s+name="twitter:card"/);
        expect(html).toMatch(/<meta\s+name="twitter:title"/);
      });

      it('should have a robots meta tag', () => {
        expect(html).toMatch(/<meta\s+name="robots"/);
      });

      it('should have Google Search Console verification', () => {
        expect(html).toContain('google-site-verification');
        expect(html).toContain('r9icCZEU9vZLgLmcHD_nmaSXk3MA_6ejFXa8y3Yq1sQ');
      });

      it('should have geo-targeting meta tags', () => {
        expect(html).toContain('geo.region');
        expect(html).toContain('MY-07');
      });

      it('should have hreflang tags', () => {
        expect(html).toContain('hreflang="en-MY"');
      });

      it('should have AI content declaration', () => {
        expect(html).toContain('ai-content-declaration');
      });

      it('should have exactly one <h1>', () => {
        const h1Matches = html.match(/<h1[\s>]/g);
        expect(h1Matches).not.toBeNull();
        expect(h1Matches!.length).toBe(1);
      });
    });
  }
});

describe('JSON-LD Structured Data', () => {
  it('should have Organization schema on every page', () => {
    for (const pageFile of pageFiles) {
      const html = readHtml(pageFile);
      const ldMatches = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/g);
      expect(ldMatches).not.toBeNull();
      
      const allLd = ldMatches!.join(' ');
      expect(allLd).toContain('"Organization"');
      expect(allLd).toContain('MF Chemicals');
    }
  });

  it('should have LocalBusiness schema on the homepage', () => {
    const html = readHtml('index.html');
    const ldMatches = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/g);
    expect(ldMatches).not.toBeNull();

    const allLd = ldMatches!.join(' ');
    expect(allLd).toContain('"LocalBusiness"');
    expect(allLd).toContain('"GeoCoordinates"');
    expect(allLd).toContain('5.3299');
  });

  it('should have WebSite schema on the homepage (without SearchAction — no search exists)', () => {
    const html = readHtml('index.html');
    const ldMatches = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/g);
    expect(ldMatches).not.toBeNull();

    const allLd = ldMatches!.join(' ');
    expect(allLd).toContain('"WebSite"');
    // SearchAction was intentionally removed — the site has no search functionality
    expect(allLd).not.toContain('"SearchAction"');
  });

  it('should have BreadcrumbList schema on catalog pages', () => {
    const catalogPages = pageFiles.filter(f => f.startsWith('catalog/'));
    for (const pageFile of catalogPages) {
      const html = readHtml(pageFile);
      const ldMatches = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/g);
      expect(ldMatches).not.toBeNull();

      const allLd = ldMatches!.join(' ');
      expect(allLd).toContain('"BreadcrumbList"');
    }
  });

  it('should have ItemList schema on catalog pages', () => {
    const catalogPages = pageFiles.filter(f => f.startsWith('catalog/'));
    for (const pageFile of catalogPages) {
      const html = readHtml(pageFile);
      const ldMatches = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/g);
      expect(ldMatches).not.toBeNull();

      const allLd = ldMatches!.join(' ');
      expect(allLd).toContain('"ItemList"');
    }
  });
});

describe('Content Quality — Subcategory Descriptions', () => {
  it('should have unique descriptions across catalog pages (no duplicate content)', () => {
    const allDescriptions: string[] = [];
    const catalogPages = pageFiles.filter(f => f.startsWith('catalog/'));

    for (const pageFile of catalogPages) {
      const html = readHtml(pageFile);
      // Extract text from subcategory description paragraphs
      const descMatches = html.match(/<p class="text-xs text-brand-slate-500 leading-relaxed">\s*([^<]+)\s*<\/p>/g);
      if (descMatches) {
        allDescriptions.push(...descMatches.map(d => d.replace(/<[^>]+>/g, '').trim()));
      }
    }

    // Check for significant duplication (allow some overlap but not identical blocks)
    const uniqueDescriptions = new Set(allDescriptions);
    // At minimum, most descriptions should be unique
    expect(uniqueDescriptions.size).toBeGreaterThan(allDescriptions.length * 0.5);
  });
});
