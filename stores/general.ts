import { defineStore } from 'pinia'
import { Kelas } from '~/models/Kelas'

export type GeneralState = {
	selectedClass: Kelas | null
	classes: Kelas[]
}

export const useGeneralStore = defineStore({
	id: 'general',
	state: () =>
		({
			selectedClass: null,
			classes: [],
		} as GeneralState),
	actions: {
		setSelectedClass(kelas: Kelas) {
			this.$state.selectedClass = kelas
		},
		getClassNames() {
			return ''
		},
	},
	persist: true,
})
