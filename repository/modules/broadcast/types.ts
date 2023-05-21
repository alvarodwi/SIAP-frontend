export interface CreateBroadcastBody {
	judul: string
	deskripsi: string
	date: string
	attachments: CreateAttachmentBody[]
}

export interface CreateAttachmentBody {
	judul: string
	url: string
}
