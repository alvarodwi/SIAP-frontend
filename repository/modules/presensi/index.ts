import HttpFactory from '~/repository/factory'
import { ApiResponse, StatusData } from '~/repository/types'

class PresensiModule extends HttpFactory {
	async submitPresensi(
		token: string,
		idKelas: string,
		idPertemuan: string,
		image: File
	): Promise<ApiResponse<StatusData>> {
		const body = new FormData()
		body.append('image', image)

		return await this.call<ApiResponse<StatusData>>(
			'POST',
			`/kelas/${idKelas}/pertemuan/${idPertemuan}/presensi`,
			body,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			}
		)
	}
}

export default PresensiModule
