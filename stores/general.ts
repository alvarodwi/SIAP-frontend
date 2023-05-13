import { defineStore } from 'pinia'
import { Kelas } from '~/models/Kelas'
import { ToastData } from '~/models/ToastData'
import { DialogType } from '~/models/state/DialogType'

export type GeneralState = {
	selectedClass: Kelas | null
	classes: Kelas[]
	toasts: ToastData[]
	showDialog: DialogType | 'none'
	loading: boolean // full page loading
}

export const useGeneralStore = defineStore({
	id: 'general',
	state: () =>
		({
			selectedClass: null,
			classes: [],
			toasts: [],
			showDialog: 'none',
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
		toggleDialog(type: DialogType) {
			this.$state.showDialog = type
		},
		hideDialog() {
			this.$state.showDialog = 'none'
		},
		refreshClass(classes: Kelas[]) {
			this.$state.classes = []
			this.$state.classes.push(...classes)
		},
		updateSelectedClass(kelas: Kelas | null) {
			this.$state.selectedClass = kelas
		},
	},
	persist: true,
})
