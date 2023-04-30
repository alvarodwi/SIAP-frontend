<template>
	<div class="bg-surface border-outline border-2">
		<h1 class="text-display-lg text-on-surface">Hello World</h1>
	</div>
	<h1 class="text-label-md text-error">Hello World</h1>
	<h1 class="text-label-lg text-primary">Hello World</h1>
	<button @click="logout">Logout</button>
</template>

<script setup lang="ts">
useHead({
	title: 'Home',
})

const authStore = useAuthStore()

const logout = () => {
	authStore.onLogout()
	navigateTo('/login')
}

definePageMeta({ middleware: 'auth' })
</script>
