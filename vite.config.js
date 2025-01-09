import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.BACKEND_URL': JSON.stringify(env.BACKEND_URL),
    },
    plugins: [react()],
    build: {
      outDir: 'dist', // Directorio de salida
    },
    server: {
      port: 3000, // Puerto del servidor local
      open: false,
    },
    resolve: {
      alias: {
        '@': '/src', // Alias para rutas absolutas
      },
    },
    base: './', // Asegura rutas relativas para despliegue
  };
});
