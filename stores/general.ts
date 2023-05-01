import { defineStore } from 'pinia'
import { Kelas } from '~/models/Kelas'
import { ToastData } from '~/models/ToastData'

export type GeneralState = {
	selectedClass: Kelas | null
	classes: Kelas[]
	toasts: ToastData[]
	loading: boolean // full page loading
}

export const useGeneralStore = defineStore({
	id: 'general',
	state: () =>
		({
			selectedClass: null,
			classes: [],
			toasts: [],
			loading: false,
		} as GeneralState),
	actions: {
		addToast(toast: ToastData) {
			this.$state.toasts.push(toast)
		},
		clearToast(id: string) {
			const index = this.$state.toasts.findIndex((t) => t.id == id)
			this.$state.toasts.splice(index, 1)
		},
		toggleLoading() {
			this.$state.loading = !this.$state.loading
		},
	},
	persist: true,
})
