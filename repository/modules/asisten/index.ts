import { AsistenPraktikum } from '~/models/AsistenPraktikum'
import HttpFactory from '~/repository/factory'
import { ApiResponse, PaginationData } from '~/repository/types'

class AsistenModule extends HttpFactory {
	async fetchAsisten(
		token: string,
		q = '',
		offset = 0,
		limit = 10
	): Promise<ApiResponse<PaginationData<AsistenPraktikum>>> {
		return await this.call('GET', '/asisten', undefined, {
			query: { q, limit, offset },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default AsistenModule
