import HttpFactory from '~/repository/factory'
import { LoginBody, LoginData, RegisterBody, RegisterData } from './types'

class AuthModule extends HttpFactory {
	async login(body: LoginBody): Promise<ApiResponse<LoginData>> {
		return await this.call<ApiResponse<LoginData>>('POST', `/login`, body)
	}

	async register(body: RegisterBody): Promise<ApiResponse<RegisterData>> {
		return await this.call<ApiResponse<RegisterData>>(
			'POST',
			`/register`,
			body
		)
	}
}

export default AuthModule
