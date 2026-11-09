import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Buffer } from 'node:buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distServerDir = path.resolve(rootDir, 'dist-server');
const indexPath = path.resolve(distDir, 'index.html');

// 1. Locate the built server entry in dist-server
if (!fs.existsSync(distServerDir)) {
  console.error(`[prerender] Error: SSR output directory not found at "${distServerDir}".`);
  process.exit(1);
}

const files = fs.readdirSync(distServerDir);
const entryFile =
  files.find((f) => f.startsWith('entry-server') && (f.endsWith('.js') || f.endsWith('.mjs'))) ||
  files.find((f) => f.endsWith('.js') || f.endsWith('.mjs'));

if (!entryFile) {
  console.error(`[prerender] Error: No server entry file (.js or .mjs) found in "${distServerDir}".`);
  process.exit(1);
}

// 2. Import the server entry and get render function
const entryPath = path.resolve(distServerDir, entryFile);
const entryUrl = pathToFileURL(entryPath).href;

let serverModule;
try {
  serverModule = await import(entryUrl);
} catch (err) {
  console.error(`[prerender] Error importing server entry from "${entryPath}":`, err);
  process.exit(1);
}

const render = serverModule.render || serverModule.default;
if (typeof render !== 'function') {
  console.error(`[prerender] Error: "render" function not found in "${entryFile}".`);
  process.exit(1);
}

// 3. Call render() and check output
let html;
try {
  html = render();
} catch (err) {
  console.error('[prerender] Error during render():', err);
  process.exit(1);
}

if (!html || typeof html !== 'string' || html.trim() === '') {
  console.error('[prerender] Error: render() returned an empty string or invalid HTML output.');
  process.exit(1);
}

// 4. Read dist/index.html and replace placeholder
if (!fs.existsSync(indexPath)) {
  console.error(`[prerender] Error: dist/index.html not found at "${indexPath}".`);
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf-8');
const placeholder = '<div id="root"></div>';

if (!indexHtml.includes(placeholder)) {
  console.error(`[prerender] Error: Placeholder "${placeholder}" not found in "${indexPath}".`);
  process.exit(1);
}

const updatedHtml = indexHtml.replace(placeholder, () => `<div id="root">${html}</div>`);
fs.writeFileSync(indexPath, updatedHtml, 'utf-8');

// 5. Print size in bytes
const size = Buffer.byteLength(updatedHtml, 'utf-8');
console.log(`Pre-rendered dist/index.html successfully (${size} bytes).`);

// 6. Clean up dist-server directory
try {
  if (fs.existsSync(distServerDir)) {
    fs.rmSync(distServerDir, { recursive: true, force: true });
  }
} catch (err) {
  console.warn(`[prerender] Warning: could not remove "${distServerDir}":`, err.message);
}
