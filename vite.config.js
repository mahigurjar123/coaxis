import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Helper to find all index.html files
function getHtmlEntries(dir, entries = {}) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = resolve(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Skip common non-source directories
      if (file !== 'node_modules' && file !== 'dist' && !file.startsWith('.')) {
        getHtmlEntries(filePath, entries);
      }
    } else if (file === 'index.html') {
      // Create a unique key for each entry point
      const relativePath = filePath.replace(resolve(__dirname), '').replace(/\\/g, '/').replace(/^\//, '');
      const name = relativePath.replace(/\/index\.html$/, '') || 'main';
      entries[name] = filePath;
    }
  });
  return entries;
}

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getHtmlEntries(__dirname)
    }
  },
  server: {
    open: true
  }
});
