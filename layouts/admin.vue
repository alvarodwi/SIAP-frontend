<template>
	<main
		class="inset-0 w-screen min-h-screen dark bg-background bg-opacity-95 scroll-smooth"
	>
		<TopAppBar hide-sidebar username="Admin" @on-logout="logout" />
		<ToastWrapper />
		<slot />
	</main>
</template>

<script setup lang="ts">
const adminStore = useAdminStore()
const store = useGeneralStore()

const logout = () => {
	adminStore.onLogout()
	store.addToast({
		id: nanoid(),
		type: 'success',
		message: 'You have logged out',
	})
	navigateTo('/admin/login')
}
</script>
