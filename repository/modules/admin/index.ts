import HttpFactory from '~/repository/factory'
import { AdminLoginData } from './types'
import { LoginBody } from '../auth/types'

class AdminModule extends HttpFactory {
	async login(body: LoginBody): Promise<ApiResponse<AdminLoginData>> {
		return await this.call<ApiResponse<AdminLoginData>>(
			'POST',
			`/admin/login`,
			body
		)
	}
}

export default AdminModule
