import { AsistenPraktikum } from '~/models/AsistenPraktikum'
import { Kelas } from '~/models/Kelas'

export interface AllKelasData {
	kelas: Kelas[]
	owned: Kelas[]
}

export interface CreateKelasBody {
	judul: string
	deskripsi: string
	otherAsisten: AsistenPraktikum[]
}

export interface JoinKelasBody {
	kode: string
}