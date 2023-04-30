import { useAdminStore } from '~/stores/admin'

export default defineNuxtRouteMiddleware(() => {
	const adminStore = useAdminStore()

	if (adminStore.token == '') {
		return navigateTo('/admin/login')
	}
})
