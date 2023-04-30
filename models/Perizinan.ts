import { StatusKehadiran } from './StatusKehadiran'
import { User } from './User'

export interface Perizinan {
	id: string
	date: Date
	status: StatusKehadiran
	bukti: string
	user: User
}
