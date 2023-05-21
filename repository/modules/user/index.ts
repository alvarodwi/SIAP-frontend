import { User } from '~/models/User'
import HttpFactory from '~/repository/factory'
import { ApiResponse, PaginationData } from '~/repository/types'

class UserModule extends HttpFactory {
	async fetchUsers(
		token: string,
		q = '',
		offset = 0,
		limit = 10
	): Promise<ApiResponse<PaginationData<User>>> {
		return await this.call('GET', '/user', undefined, {
			query: { q, limit, offset },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async fetchUserById(token: string, id: string): Promise<ApiResponse<User>> {
		return await this.call('GET', `/user/${id}`, undefined, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default UserModule
