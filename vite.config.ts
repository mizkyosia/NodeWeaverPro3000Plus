import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true,
        port: parseInt(process.env.NODE_DOCKER_PORT ?? '3000')
    },
    plugins: [sveltekit()]
});
