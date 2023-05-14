import { BuatAttachment } from './BuatAttachment'

export interface BuatPengumuman {
	judul: string
	deskripsi: string
	date: Date
	attachments: BuatAttachment[]
}
