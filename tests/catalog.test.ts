import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Catalog Flat-File Integrity Tests', () => {
  const catalogDir = path.resolve(__dirname, '../src/content/catalog');

  it('should have exactly 9 core category JSON files', () => {
    const files = fs.readdirSync(catalogDir).filter(file => file.endsWith('.json'));
    expect(files.length).toBe(9);
    
    // Explicit lists of standard categories in schema
    const expectedCategories = [
      'glassware.json',
      'porcelainware.json',
      'chemicals.json',
      'plasticware.json',
      'sundries.json',
      'safety.json',
      'paper.json',
      'liquid.json',
      'equipment.json'
    ];
    expect(files.sort()).toEqual(expectedCategories.sort());
  });

  it('should validate every category item against the required data schema', () => {
    const files = fs.readdirSync(catalogDir).filter(file => file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(catalogDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Validate string fields
      expect(content.title).toBeDefined();
      expect(typeof content.title).toBe('string');
      expect(content.title.length).toBeGreaterThan(0);

      expect(content.description).toBeDefined();
      expect(typeof content.description).toBe('string');
      expect(content.description.length).toBeGreaterThan(0);

      expect(content.icon).toBeDefined();
      expect(typeof content.icon).toBe('string');
      expect(content.icon.length).toBeGreaterThan(0);

      // Validate subcategories array
      expect(Array.isArray(content.subcategories)).toBe(true);
      expect(content.subcategories.length).toBeGreaterThan(0);
      content.subcategories.forEach((sub: any) => {
        if (typeof sub === 'string') {
          expect(sub.length).toBeGreaterThan(0);
        } else {
          expect(typeof sub).toBe('object');
          expect(typeof sub.name).toBe('string');
          expect(sub.name.length).toBeGreaterThan(0);
          expect(typeof sub.description).toBe('string');
          expect(sub.description.length).toBeGreaterThan(0);
        }
      });

      // Validate brands array
      expect(Array.isArray(content.brands)).toBe(true);
      expect(content.brands.length).toBeGreaterThan(0);
      content.brands.forEach((brand: any) => {
        expect(typeof brand).toBe('string');
        expect(brand.length).toBeGreaterThan(0);
      });

      // Validate catalogPage formatting (e.g. 12-25)
      expect(content.catalogPages).toBeDefined();
      expect(typeof content.catalogPages).toBe('string');
      
      const pageMatch = content.catalogPages.match(/^(\d+)-(\d+)$/);
      expect(pageMatch).not.toBeNull();
      
      if (pageMatch) {
        const startPage = parseInt(pageMatch[1], 10);
        const endPage = parseInt(pageMatch[2], 10);
        expect(startPage).toBeLessThanOrEqual(endPage);
        expect(startPage).toBeGreaterThan(0);
      }
    }
  });
});
