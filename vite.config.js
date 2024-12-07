import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY)
    },
    plugins: [react()],
    build: {
      outDir: 'dist', // Directorio de salida
    },
    server: {
      port: 3000, // Puerto del servidor local
      open: true, // Abrir en el navegador al iniciar
    },
    resolve: {
      alias: {
        '@': '/src', // Alias para rutas absolutas
      },
    },
    base: './', // Asegura rutas relativas para despliegue
  };
});
