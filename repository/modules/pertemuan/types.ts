import { Pertemuan } from '~/models/Pertemuan'
import { Presensi } from '~/models/Presensi'
import { PaginationData } from '~/repository/types'

export interface CreatePertemuanBody {
	indexPertemuan: number
	judul: string
	startDate: string
}

export interface PertemuanData {
	data: Pertemuan
	presensi: PaginationData<Presensi>
}

export interface PertemuanByKelasData extends Pertemuan {
	presensi: Presensi[]
}
