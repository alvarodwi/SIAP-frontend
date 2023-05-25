import HttpFactory from '~/repository/factory'
import { ApiResponse, StatusData } from '~/repository/types'

class PerizinanModule extends HttpFactory {
	async submitPerizinan(
		token: string,
		idKelas: string,
		idPertemuan: string,
		status: string,
		image: File
	): Promise<ApiResponse<StatusData>> {
		const body = new FormData()
		body.append('status', status)
		body.append('image', image)

		return await this.call<ApiResponse<StatusData>>(
			'POST',
			`/kelas/${idKelas}/pertemuan/${idPertemuan}/perizinan`,
			body,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export default PerizinanModule
