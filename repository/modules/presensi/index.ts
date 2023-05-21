import { Presensi } from '~/models/Presensi'
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
				},
			}
		)
	}

	async fetchPresensiByKelas(
		token: string,
		idKelas: string
	): Promise<ApiResponse<Presensi[]>> {
		return await this.call(
			'GET',
			`/kelas/${idKelas}/presensi/all`,
			undefined,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	async fetchPresensiById(
		token: string,
		idKelas: string,
		idPertemuan: string,
		idPresensi: string
	): Promise<ApiResponse<Presensi>> {
		return await this.call(
			'GET',
			`/kelas/${idKelas}/pertemuan/${idPertemuan}/presensi/${idPresensi}`,
			undefined,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	async validatePresensi(
		token: string,
		idKelas: string,
		idPertemuan: string,
		idPresensi: string
	): Promise<ApiResponse<StatusData>> {
		return await this.call<ApiResponse<StatusData>>(
			'PUT',
			`/kelas/${idKelas}/pertemuan/${idPertemuan}/presensi/${idPresensi}`,
			undefined,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export default PresensiModule
