import HttpFactory from '~/repository/factory'
import { ApiResponse, StatusData } from '~/repository/types'
import { AllKelasData, CreateKelasBody, JoinKelasBody } from './types'

class KelasModule extends HttpFactory {
	async fetchAllKelas(token: string): Promise<ApiResponse<AllKelasData>> {
		return await this.call('GET', '/kelas', undefined, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async createKelas(
		token: string,
		body: CreateKelasBody
	): Promise<ApiResponse<StatusData>> {
		return await this.call<ApiResponse<StatusData>>('POST', `/kelas`, body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async joinKelas(
		token: string,
		body: JoinKelasBody
	): Promise<ApiResponse<StatusData>> {
		return await this.call<ApiResponse<StatusData>>(
			'POST',
			`/kelas/join`,
			body,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export default KelasModule
