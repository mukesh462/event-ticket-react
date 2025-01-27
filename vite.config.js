import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
 
    server: {
      allowedHosts: ['c9ab-116-72-127-11.ngrok-free.app'],
    },
    // Other Vite configurations
})
