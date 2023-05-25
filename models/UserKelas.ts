import { Kelas } from '~/models/Kelas'
import { User } from '~/models/User'

export interface UserKelas {
	id: string
	user: User
	kelas: Kelas
}
