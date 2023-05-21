import { Kelas } from './Kelas'

export interface Pertemuan {
	id: string
	judul: string
	deskripsi: string
	startDate: string
	endDate: string
	indexPert: number
	kelas: Kelas
}
