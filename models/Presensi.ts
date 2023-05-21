import { StatusKehadiran } from './StatusKehadiran'
import { User } from './User'

export interface Presensi {
	id: string
	bukti?: string
	date?: Date
	status?: StatusKehadiran
	isValidate?: boolean
	user: User
}
