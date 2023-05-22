import HttpFactory from '~/repository/factory'
import { ApiResponse, StatusData } from '~/repository/types'
import {
	CreatePertemuanBody,
	PertemuanByKelasData,
	PertemuanData,
} from './types'

class PertemuanModule extends HttpFactory {
	async createPertemuan(
		token: string,
		idKelas: string,
		body: CreatePertemuanBody
	): Promise<ApiResponse<StatusData>> {
		return await this.call<ApiResponse<StatusData>>(
			'POST',
			`/kelas/${idKelas}/pertemuan`,
			body,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	async fetchPertemuanByKelas(
		token: string,
		idKelas: string
	): Promise<ApiResponse<PertemuanByKelasData[]>> {
		return await this.call('GET', `/kelas/${idKelas}/pertemuan`, undefined, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async fetchPertemuanById(
		token: string,
		idKelas: string,
		idPertemuan: string,
		offset = 0,
		limit = 10
	): Promise<ApiResponse<PertemuanData>> {
		return await this.call(
			'GET',
			`/kelas/${idKelas}/pertemuan/${idPertemuan}`,
			undefined,
			{
				query: { limit, offset },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	async deletePertemuanById(
		token: string,
		idKelas: string,
		idPertemuan: string
	): Promise<ApiResponse<StatusData>> {
		return await this.call(
			'DELETE',
			`/kelas/${idKelas}/pertemuan/${idPertemuan}/delete`,
			undefined,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export default PertemuanModule
