import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';
import { configDotenv } from 'dotenv';

// Loads env variables
configDotenv();

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: sveltePreprocess(),

    kit: {
        adapter: adapter(),
    }
};

export default config;
