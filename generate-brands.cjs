// Generate brand SVG wordmarks for all 28 laboratory brands
const fs = require('fs');
const path = require('path');

const brandsDir = path.join(__dirname, 'public', 'images', 'brands');

// Brand definitions: [filename, display text, subtitle, primary color, font style]
const brands = [
  // Glassware
  ['pyrex', 'PYREX', '®', '#1a365d', 'bold', 4],
  ['mbl', 'MBL', '®', '#2c5282', 'bold', 6],
  ['duran', 'DURAN', '®', '#1a365d', 'bold', 5],
  ['quickfit', 'QUICKFIT', '®', '#2d3748', 'bold', 3],

  // Equipment  
  ['ohaus', 'OHAUS', '', '#00529b', 'bold', 4],
  ['mettler-toledo', 'METTLER TOLEDO', '', '#003366', 'bold', 1],
  ['memmert', 'MEMMERT', '', '#e53e3e', 'bold', 3],
  ['yamato', 'YAMATO', '', '#1a365d', 'bold', 4],
  ['wtw', 'WTW', '', '#0066b3', 'bold', 8],

  // Liquid Handling
  ['socorex', 'SOCOREX', '', '#c53030', 'bold', 3],
  ['brand', 'BRAND', '®', '#003399', 'bold', 5],
  ['gilson', 'GILSON', '', '#1a73e8', 'bold', 4],
  ['eppendorf', 'EPPENDORF', '', '#003366', 'bold', 2],
  ['sartorius', 'SARTORIUS', '', '#1a365d', 'bold', 2],

  // Paper
  ['whatman', 'WHATMAN', '™', '#1a365d', 'bold', 3],
  ['advantec', 'ADVANTEC', '', '#2d3748', 'bold', 3],
  ['macherey-nagel', 'MACHEREY-NAGEL', '', '#1a4d8c', 'bold', 1],
  ['toyo-roshi', 'TOYO ROSHI', '', '#c53030', 'bold', 2],

  // Plasticware
  ['azlon', 'AZLON', '®', '#2c5282', 'bold', 5],
  ['kartell', 'KARTELL', '', '#e53e3e', 'bold', 3],
  ['nalgene', 'NALGENE', '™', '#006699', 'bold', 3],
  ['vitlab', 'VITLAB', '', '#2d6b22', 'bold', 4],

  // Porcelainware
  ['haldenwanger', 'HALDENWANGER', '', '#4a5568', 'bold', 1],
  ['coorsteck', 'CoorsTek', '', '#1a365d', 'normal', 2],
  ['jizerska', 'JP', '', '#2c5282', 'bold', 8],

  // Safety
  ['ansell', 'ANSELL', '', '#f6ad55', 'bold', 4],
  ['honeywell', 'HONEYWELL', '', '#e53e3e', 'bold', 2],
  ['3m', '3M', '™', '#e53e3e', 'bold', 10],
  ['mapa', 'MAPA', '', '#003399', 'bold', 6],
  ['dupont', 'DuPont', '™', '#1a365d', 'normal', 3],

  // Silicaware
  ['techne', 'TECHNE', '', '#003399', 'bold', 4],
  ['electrothermal', 'ELECTROTHERMAL', '', '#4a5568', 'bold', 1],
  ['bel-art', 'BEL-ART', '™', '#2c5282', 'bold', 3],

  // Sundries
  ['fisherbrand', 'FISHERBRAND', '™', '#003366', 'bold', 1],
  ['cole-parmer', 'COLE-PARMER', '®', '#0066b3', 'bold', 2],
  ['bochem', 'BOCHEM', '', '#4a5568', 'bold', 4],
];

brands.forEach(([filename, text, trademark, color, weight, spacing]) => {
  // Calculate appropriate font size based on text length
  let fontSize = 28;
  if (text.length > 12) fontSize = 18;
  else if (text.length > 9) fontSize = 22;
  else if (text.length > 6) fontSize = 26;
  else if (text.length <= 2) fontSize = 36;
  else if (text.length <= 3) fontSize = 34;

  const fontWeight = weight === 'bold' ? '700' : '400';
  const tmSize = Math.max(8, fontSize * 0.35);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
  <text x="100" y="38" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" letter-spacing="${spacing}" fill="${color}">${text}</text>${trademark ? `<text x="${100 + (text.length * (fontSize * 0.3 + spacing) / 2) + 2}" y="24" font-family="Arial, Helvetica, sans-serif" font-size="${tmSize}" fill="${color}" opacity="0.6">${trademark}</text>` : ''}
</svg>`;

  const filepath = path.join(brandsDir, `${filename}.svg`);
  fs.writeFileSync(filepath, svg.trim());
  console.log(`Created: ${filename}.svg`);
});

console.log(`\nDone! Created ${brands.length} brand SVGs.`);
