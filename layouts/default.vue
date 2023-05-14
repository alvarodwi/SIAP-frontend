<template>
	<main
		class="inset-0 w-screen min-h-screen dark bg-background bg-opacity-95 scroll-smooth"
	>
		<TopAppBar
			:username="username()"
			@on-logout="logout"
			@open-sidebar="state.isSidebarOpen = true"
		/>
		<ToastWrapper />
		<Sidebar
			:class="state.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
			class="top-0 absolute w-[24%] transition-all duration-500 transform"
			@hide-sidebar="state.isSidebarOpen = false"
			@create-class="
				() => {
					toggleDialog('create-class')
					state.isSidebarOpen = false
				}
			"
			@join-class="
				() => {
					toggleDialog('join-class')
					state.isSidebarOpen = false
				}
			"
		/>
		<slot />
	</main>
</template>

<script setup lang="ts">
const { user, onLogout } = useAuthStore()
const { addToast, toggleDialog } = useGeneralStore()

const username = () => {
	if (user) {
		return user.name.split(' ').slice(0, 2).join(' ')
	} else {
		return ''
	}
}

interface State {
	isSidebarOpen: boolean
}

const state = reactive<State>({
	isSidebarOpen: false,
})

const logout = () => {
	onLogout()
	addToast({
		id: nanoid(),
		type: 'success',
		message: 'You have logged out',
	})
	navigateTo('/login')
}
</script>
