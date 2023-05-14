import HttpFactory from '~/repository/factory'
import { AdminLoginData } from './types'
import { LoginBody } from '../auth/types'
import { ApiResponse, PaginationData } from '~/repository/types'
import { RoleApproval } from '~/models/RoleApproval'

class AdminModule extends HttpFactory {
	async login(body: LoginBody): Promise<ApiResponse<AdminLoginData>> {
		return await this.call('POST', `/admin/login`, body)
	}

	async fetchApprovals(
		token: string,
		offset = 0,
		limit = 10
	): Promise<ApiResponse<PaginationData<RoleApproval>>> {
		return await this.call('GET', '/admin/approvals', undefined, {
			query: { limit, offset },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async acceptApproval(
		token: string,
		id: string
	): Promise<ApiResponse<boolean>> {
		return await this.call('PUT', `/admin/approval/${id}/accept`, undefined, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async rejectApproval(
		token: string,
		id: string
	): Promise<ApiResponse<boolean>> {
		return await this.call('PUT', `/admin/approval/${id}/reject`, undefined, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default AdminModule
