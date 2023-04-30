import { AsistenPraktikum } from './AsistenPraktikum'
import { Broadcast } from './Broadcast'
import { Pertemuan } from './Pertemuan'

export interface Kelas {
	id: string
	judul: string
	deskripsi: string
	kode: string
	asisten: AsistenPraktikum[]
	broadcasts: Broadcast[]
	pertemuan: Pertemuan[]
}
