import { defineStore } from 'pinia'

export type PresensiState = {
	indexValidasi: number
}

export const usePresensiStore = defineStore({
	id: 'presensi',
	state: () =>
		({
			indexValidasi: 0,
		} as PresensiState),
	actions: {
		setIndex(index: number) {
			this.$state.indexValidasi = index
		},
	},
})
