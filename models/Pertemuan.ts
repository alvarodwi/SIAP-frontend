import { Perizinan } from './Perizinan'
import { Presensi } from './Presensi'

export interface Pertemuan {
	id: string
	judul: string
	deskripsi: string
	startDate: Date
	endDate: Date
	indexPert: number
	presensi: Presensi[]
	perizinan: Perizinan[]
}
