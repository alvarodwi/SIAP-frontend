import { Attachment } from './Attachment'

export interface Broadcast {
	id: string
	judul: string
	deskripsi: string
	date: string
	attachment: Attachment[]
}
