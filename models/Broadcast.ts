import { AsistenPraktikum } from './AsistenPraktikum'
import { Attachment } from './Attachment'

export interface Broadcast {
	id: string
	judul: string
	deskripsi: string
	date: Date
	owner: AsistenPraktikum
	attachments: Attachment[]
}
