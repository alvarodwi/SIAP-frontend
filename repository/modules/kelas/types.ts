import { AsistenPraktikum } from '~/models/AsistenPraktikum'
import { Kelas } from '~/models/Kelas'

export interface AllKelasData {
	kelas: Kelas[]
	owned?: Kelas[]
}

export interface CreateKelasBody {
	judul: string
	deskripsi: string
	otherAsisten: { id: string }[]
}

export interface JoinKelasBody {
	kode: string
}

export interface KelasByIdData {
	kelas: Kelas
	isAsisten: boolean
}
