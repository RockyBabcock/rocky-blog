import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const rootEnv = loadEnv(mode, path.resolve(__dirname, '..'), ['VITE_', 'BLOG_', 'CMS_']);
  const blogPort = process.env.VITE_BLOG_PORT || process.env.BLOG_PORT || rootEnv.VITE_BLOG_PORT || rootEnv.BLOG_PORT || '';
  const blogDevUrl = process.env.VITE_BLOG_DEV_SERVER_URL || rootEnv.VITE_BLOG_DEV_SERVER_URL || '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_BLOG_PORT': JSON.stringify(blogPort),
      'import.meta.env.VITE_BLOG_DEV_SERVER_URL': JSON.stringify(blogDevUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
