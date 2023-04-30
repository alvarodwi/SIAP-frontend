import { defineStore } from 'pinia'
import { User } from '~/models/User'

export type AuthState = {
	user: User | null
	token: string
	isAsisten: boolean
}

export const useAuthStore = defineStore({
	id: 'auth',
	state: () =>
		({
			user: null,
			token: '',
			isAsisten: false,
		} as AuthState),
	actions: {
		onLogin(user: User, token: string, isAsisten: boolean) {
			this.$state.user = user
			this.$state.token = token
			this.$state.isAsisten = isAsisten
		},
		onLogout() {
			this.$state.user = null
			this.$state.token = ''
			this.$state.isAsisten = false
		},
		getToken() {
			return this.$state.token
		},
	},
	persist: true,
})
