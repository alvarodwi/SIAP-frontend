import { User } from '~/models/User'
import { UserKelas } from '~/models/UserKelas'
import HttpFactory from '~/repository/factory'
import { ApiResponse, PaginationData, StatusData } from '~/repository/types'

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

	async fetchUsersByKelas(
		token: string,
		idKelas: string
	): Promise<ApiResponse<PaginationData<UserKelas>>> {
		return await this.call('GET', `/kelas/${idKelas}/praktikan`, undefined, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async deleteUserFromKelasById(
		token: string,
		idKelas: string,
		idUser: string
	): Promise<ApiResponse<StatusData>> {
		return await this.call(
			'DELETE',
			`/kelas/${idKelas}/praktikan/${idUser}/delete`,
			undefined,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export default UserModule
