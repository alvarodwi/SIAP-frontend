import { $fetch, FetchOptions } from 'ofetch'
import AdminModule from '~/repository/modules/admin'
import AsistenModule from '~/repository/modules/asisten'
import AuthModule from '~/repository/modules/auth'
import BroadcastModule from '~/repository/modules/broadcast'
import KelasModule from '~/repository/modules/kelas'
import PerizinanModule from '~/repository/modules/perizinan'
import PertemuanModule from '~/repository/modules/pertemuan'
import PresensiModule from '~/repository/modules/presensi'
import UserModule from '~/repository/modules/user'

interface ApiInstance {
	auth: AuthModule
	admin: AdminModule
	kelas: KelasModule
	asisten: AsistenModule
	user: UserModule
	pertemuan: PertemuanModule
	broadcast: BroadcastModule
	perizinan: PerizinanModule
	presensi: PresensiModule
}

export default function () {
	const nuxtApp = useNuxtApp()

	const fetchOptions: FetchOptions = {
		baseURL: nuxtApp.$config.public.API_BASE_URL,
	}

	const apiFetcher = $fetch.create(fetchOptions)

	const modules: ApiInstance = {
		auth: new AuthModule(apiFetcher),
		admin: new AdminModule(apiFetcher),
		kelas: new KelasModule(apiFetcher),
		asisten: new AsistenModule(apiFetcher),
		user: new UserModule(apiFetcher),
		pertemuan: new PertemuanModule(apiFetcher),
		broadcast: new BroadcastModule(apiFetcher),
		perizinan: new PerizinanModule(apiFetcher),
		presensi: new PresensiModule(apiFetcher),
	}

	return modules
}
