import { AsistenPraktikum } from '~/models/AsistenPraktikum'
import { User } from '~/models/User'

export interface LoginBody {
	email: string
	password: string
}

export interface RegisterBody {
	email: string
	name: string
	npm: string
	noTelp: string
	password: string
	confirmPassword: string
	isAsisten: boolean
}

export interface LoginData {
	access_token: string
	user: User
	asisten: AsistenPraktikum | null
}

export interface RegisterData {
	success: boolean
}
