import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network addresses (0.0.0.0) so mobile phones on same Wi-Fi can connect
    port: 3000,
    open: true
  }
});

