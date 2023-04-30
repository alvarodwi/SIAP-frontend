<template>
	<main
		class="dark bg-background bg-opacity-95 inset-0 min-h-screen w-screen scroll-smooth flex flex-col"
	>
		<div v-if="loading" class="m-auto">
			<LoadingIndicator />
		</div>
		<slot v-else />
	</main>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loading = ref(false)

nuxtApp.hook('page:start', () => {
	loading.value = true
})
nuxtApp.hook('page:finish', () => {
	loading.value = false
})
</script>
