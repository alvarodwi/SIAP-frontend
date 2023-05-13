import { Broadcast } from './Broadcast'
import { KelasAsisten } from './KelasAsisten'
import { Pertemuan } from './Pertemuan'

export interface Kelas {
	id: string
	judul: string
	deskripsi?: string
	kode?: string
	asistenKelas?: KelasAsisten[]
	broadcasts?: Broadcast[]
	pertemuan?: Pertemuan[]
	owned: boolean
}
