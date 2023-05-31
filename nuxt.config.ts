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
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.API_BASE_URL,
		},
	},
	build: {
		transpile: ['@vuepic/vue-datepicker', '@headlessui/vue'],
	},
	app: {
		head: {
			script: [
				{
					textContent: `(function (m, a, z, e) {
						var s, t;
						try {
						  t = m.sessionStorage.getItem('maze-us');
						} catch (err) {}
					  
						if (!t) {
						  t = new Date().getTime();
						  try {
							m.sessionStorage.setItem('maze-us', t);
						  } catch (err) {}
						}
					  
						s = a.createElement('script');
						s.src = z + '?t=' + t + '&apiKey=' + e;
						s.async = true;
						a.getElementsByTagName('head')[0].appendChild(s);
						m.mazeUniversalSnippetApiKey = e;
					  })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '297d9c3d-1eee-4cc4-b6c1-4d406fc8f3fe');`,
				},
			],
		},
	},
})
