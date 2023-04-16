// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		// store
		'@pinia/nuxt',
		// tailwind
		'@nuxtjs/tailwindcss',
		// eslint
		'@nuxtjs/eslint-module',
	],
});
