import HttpFactory from '~/repository/factory'
import { LoginBody, LoginData, RegisterBody } from './types'
import { ApiResponse, StatusData } from '~/repository/types'

class AuthModule extends HttpFactory {
	async login(body: LoginBody): Promise<ApiResponse<LoginData>> {
		return await this.call<ApiResponse<LoginData>>('POST', `/login`, body)
	}

	async register(body: RegisterBody): Promise<ApiResponse<StatusData>> {
		return await this.call<ApiResponse<StatusData>>('POST', `/register`, body)
	}
}

export default AuthModule
