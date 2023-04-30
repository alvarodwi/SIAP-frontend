// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	imports: {
		dirs: ['models', 'stores'],
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	modules: [
		// store
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		// tailwind
		'@nuxtjs/tailwindcss',
		// icons
		'nuxt-icon',
		// eslint
		'@nuxtjs/eslint-module',
	],
})
