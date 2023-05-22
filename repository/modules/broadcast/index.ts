import HttpFactory from '~/repository/factory'
import { ApiResponse, StatusData } from '~/repository/types'
import { CreateBroadcastBody } from './types'
import { Broadcast } from '~/models/Broadcast'

class BroadcastModule extends HttpFactory {
	async createBroadcast(
		token: string,
		idKelas: string,
		body: CreateBroadcastBody
	): Promise<ApiResponse<StatusData>> {
		return await this.call<ApiResponse<StatusData>>(
			'POST',
			`/kelas/${idKelas}/broadcast`,
			body,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	async fetchBroadcastByKelas(
		token: string,
		idKelas: string
	): Promise<ApiResponse<Broadcast[]>> {
		return await this.call('GET', `/kelas/${idKelas}/broadcast`, undefined, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async deleteBroadcastById(
		token: string,
		idKelas: string,
		idPengumuman: string
	): Promise<ApiResponse<StatusData>> {
		return await this.call(
			'DELETE',
			`/kelas/${idKelas}/broadcast/${idPengumuman}`,
			undefined,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export default BroadcastModule
