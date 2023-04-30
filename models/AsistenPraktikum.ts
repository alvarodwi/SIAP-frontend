import { Kelas } from './Kelas'
import { User } from './User'

export interface AsistenPraktikum {
	id: string
	instansi: string
	kelas: Kelas[]
	user: User
}
